import type { Chemical } from "./chemical-database"

export type CompatibilityLevel = "compatible" | "limited" | "incompatible"

export interface CompatibilityResult {
  level: CompatibilityLevel
  badge: string
  reasons: string[]
  recommendations: string[]
  riskLevel: "low" | "medium" | "high"
}

export function checkCompatibility(chemA: Chemical, chemB: Chemical): CompatibilityResult {
  const reasons: string[] = []
  let incompatibilityCount = 0

  // Rule 1: Hazard Group Segregation
  const hazardGroupResult = checkHazardGroupSegregation(chemA, chemB)
  if (hazardGroupResult.incompatible) {
    reasons.push(...hazardGroupResult.reasons)
    incompatibilityCount += hazardGroupResult.severity
  }

  // Rule 2: SDS Section 10 Incompatibilities
  const sdsResult = checkSdsIncompatibilities(chemA, chemB)
  if (sdsResult.incompatible) {
    reasons.push(...sdsResult.reasons)
    incompatibilityCount += 2
  }

  // Rule 3: pH Reactivity
  const phResult = checkPhReactivity(chemA, chemB)
  if (phResult.incompatible) {
    reasons.push(...phResult.reasons)
    incompatibilityCount += phResult.severity
  }

  // Rule 4: Temperature Requirements
  const tempResult = checkTemperatureRequirements(chemA, chemB)
  if (tempResult.incompatible) {
    reasons.push(...tempResult.reasons)
    incompatibilityCount += 1
  }

  // Rule 5: Chemical Storage Classes
  const storageResult = checkStorageClassConflicts(chemA, chemB)
  if (storageResult.incompatible) {
    reasons.push(...storageResult.reasons)
    incompatibilityCount += storageResult.severity
  }

  // Determine compatibility level
  let level: CompatibilityLevel = "compatible"
  let riskLevel: "low" | "medium" | "high" = "low"

  if (incompatibilityCount >= 2) {
    level = "incompatible"
    riskLevel = "high"
  } else if (incompatibilityCount === 1) {
    level = "limited"
    riskLevel = "medium"
  }

  const recommendations = generateRecommendations(level, chemA, chemB, reasons)

  return {
    level,
    badge: getBadge(level),
    reasons,
    recommendations,
    riskLevel,
  }
}

function checkHazardGroupSegregation(
  chemA: Chemical,
  chemB: Chemical,
): { incompatible: boolean; reasons: string[]; severity: number } {
  const reasons: string[] = []
  let severity = 0

  const groupA = chemA.storageGroup
  const groupB = chemB.storageGroup

  // Acid + Base
  if ((groupA === "Acid" && groupB === "Base") || (groupA === "Base" && groupB === "Acid")) {
    reasons.push("Acid-base reaction: Strong exothermic reaction can occur")
    severity = 2
  }

  // Acid + Cyanides
  if ((groupA === "Acid" && groupB === "Toxic") || (groupA === "Toxic" && groupB === "Acid")) {
    if (chemA.reactiveIncompatibilities.includes("Cyanides") || chemB.reactiveIncompatibilities.includes("Cyanides")) {
      reasons.push("Toxic gas generation: Acid + cyanides produces highly toxic HCN gas")
      severity = 3
    }
  }

  // Acid + Sulfides
  if (chemA.reactiveIncompatibilities.includes("Sulfides") || chemB.reactiveIncompatibilities.includes("Sulfides")) {
    if ((groupA === "Acid" && groupB === "Toxic") || (groupA === "Toxic" && groupB === "Acid")) {
      reasons.push("Toxic gas generation: Acid + sulfides produces H₂S gas (toxic)")
      severity = 3
    }
  }

  // Oxidizer + Flammables
  if ((groupA === "Oxidizer" && groupB === "Flammable") || (groupA === "Flammable" && groupB === "Oxidizer")) {
    reasons.push("Fire/explosion risk: Oxidizer-flammable mixture can ignite spontaneously")
    severity = 3
  }

  // Water Reactives + Water
  if (groupA === "Water-Reactive" || groupB === "Water-Reactive") {
    reasons.push("Violent reaction: Water-reactive compound reacts violently with water or moisture")
    severity = 3
  }

  // Peroxides + Organics
  if ((groupA === "Organic Peroxide" && groupB === "Other") || (groupA === "Other" && groupB === "Organic Peroxide")) {
    reasons.push("Strong reaction: Organic peroxides can decompose violently with organic compounds")
    severity = 2
  }

  // Corrosives + Flammables
  if ((groupA === "Corrosive" && groupB === "Flammable") || (groupA === "Flammable" && groupB === "Corrosive")) {
    reasons.push("Incompatible combination: Corrosive-flammable interaction risk")
    severity = 2
  }

  return {
    incompatible: severity > 0,
    reasons,
    severity,
  }
}

function checkSdsIncompatibilities(chemA: Chemical, chemB: Chemical): { incompatible: boolean; reasons: string[] } {
  const reasons: string[] = []

  // Check if A lists B or B lists A as incompatible
  const aListsB = chemA.reactiveIncompatibilities.some(
    (incomp) =>
      chemB.name.toLowerCase().includes(incomp.toLowerCase()) ||
      chemB.storageGroup.toLowerCase().includes(incomp.toLowerCase()),
  )

  const bListsA = chemB.reactiveIncompatibilities.some(
    (incomp) =>
      chemA.name.toLowerCase().includes(incomp.toLowerCase()) ||
      chemA.storageGroup.toLowerCase().includes(incomp.toLowerCase()),
  )

  if (aListsB || bListsA) {
    reasons.push("SDS Section 10 incompatibility: One or both chemicals list the other as incompatible")
  }

  return {
    incompatible: aListsB || bListsA,
    reasons,
  }
}

function checkPhReactivity(
  chemA: Chemical,
  chemB: Chemical,
): { incompatible: boolean; reasons: string[]; severity: number } {
  const reasons: string[] = []
  let severity = 0

  const phA = chemA.pH ?? 7
  const phB = chemB.pH ?? 7

  // Strong acid + strong base
  if (phA < 3 && phB > 10) {
    reasons.push("Strong acid-base reaction: Extreme pH values indicate violent reaction potential")
    severity = 3
  } else if (phA > 10 && phB < 3) {
    reasons.push("Strong acid-base reaction: Extreme pH values indicate violent reaction potential")
    severity = 3
  }

  // Acid + hypochlorite = chlorine gas
  if (
    (chemA.name.includes("Acid") && chemB.name.includes("Hypochlorite")) ||
    (chemB.name.includes("Acid") && chemA.name.includes("Hypochlorite"))
  ) {
    reasons.push("Toxic gas generation: Acid + hypochlorite produces chlorine gas")
    severity = 3
  }

  // Acid + oxidizer
  if ((phA < 5 && chemB.storageGroup === "Oxidizer") || (phB < 5 && chemA.storageGroup === "Oxidizer")) {
    reasons.push("Violent reaction: Acid + oxidizer can cause violent exothermic reaction")
    severity = 2
  }

  return {
    incompatible: severity > 0,
    reasons,
    severity,
  }
}

function checkTemperatureRequirements(chemA: Chemical, chemB: Chemical): { incompatible: boolean; reasons: string[] } {
  const reasons: string[] = []

  const tempA = chemA.temperatureRequirements
  const tempB = chemB.temperatureRequirements

  if (tempA && tempB) {
    // Check if storage ranges don't overlap
    if (tempA.max < tempB.min || tempB.max < tempA.min) {
      reasons.push(
        `Temperature conflict: ${chemA.name} requires ${tempA.min}°C-${tempA.max}°C, ${chemB.name} requires ${tempB.min}°C-${tempB.max}°C`,
      )
    }
  }

  return {
    incompatible: reasons.length > 0,
    reasons,
  }
}

function checkStorageClassConflicts(
  chemA: Chemical,
  chemB: Chemical,
): { incompatible: boolean; reasons: string[]; severity: number } {
  const reasons: string[] = []
  let severity = 0

  const conflictingGroups = [
    ["Acid", "Base"],
    ["Oxidizer", "Flammable"],
    ["Water-Reactive", "Other"],
    ["Organic Peroxide", "Other"],
  ]

  for (const [group1, group2] of conflictingGroups) {
    if (
      (chemA.storageGroup === group1 && chemB.storageGroup === group2) ||
      (chemA.storageGroup === group2 && chemB.storageGroup === group1)
    ) {
      reasons.push(`Storage class conflict: ${group1} and ${group2} storage classes should not be mixed`)
      severity = 1
    }
  }

  return {
    incompatible: severity > 0,
    reasons,
    severity,
  }
}

function generateRecommendations(
  level: CompatibilityLevel,
  chemA: Chemical,
  chemB: Chemical,
  reasons: string[],
): string[] {
  const recommendations: string[] = []

  if (level === "incompatible") {
    recommendations.push("Store in completely separate cabinets or rooms")
    recommendations.push("Use separate ventilation systems if possible")
    recommendations.push("Implement strict access controls to prevent mixing")
  } else if (level === "limited") {
    recommendations.push("Store in separate compartments within the same cabinet")
    recommendations.push("Use physical barriers or shelving separation")
    recommendations.push("Ensure adequate ventilation")
  }

  if (chemA.temperatureRequirements || chemB.temperatureRequirements) {
    recommendations.push("Use temperature-controlled storage if temperature ranges differ")
  }

  if (chemA.healthHazard || chemB.healthHazard) {
    recommendations.push("Use appropriate PPE when handling nearby chemicals")
  }

  if (chemA.environmentalHazard || chemB.environmentalHazard) {
    recommendations.push("Use secondary containment trays to prevent spill interaction")
  }

  return recommendations
}

function getBadge(level: CompatibilityLevel): string {
  switch (level) {
    case "compatible":
      return "✔ Compatible"
    case "limited":
      return "⚠ Limited Compatibility"
    case "incompatible":
      return "❌ Not Compatible"
  }
}
