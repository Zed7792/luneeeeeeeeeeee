export const CHEMICALS = [
  "Acetone",
  "Sodium Hydroxide",
  "Benzene",
  "Ammonia Solution",
  "Hydrogen Peroxide",
  "Methanol",
  "Ethanol",
  "Sulfuric Acid",
  "Hydrochloric Acid",
  "Chlorine Gas",
  "Potassium Permanganate",
  "Calcium Hypochlorite",
]

// Compatibility levels: 'safe' (green), 'caution' (yellow), 'incompatible' (red), 'unknown' (gray)
export type CompatibilityLevel = "safe" | "caution" | "incompatible" | "unknown"

export interface CompatibilityInfo {
  level: CompatibilityLevel
  reason: string
  recommendations: string[]
}

export const COMPATIBILITY_DATA: Record<string, Record<string, CompatibilityInfo>> = {
  Acetone: {
    "Sodium Hydroxide": {
      level: "safe",
      reason: "Different chemical classes with no reactive hazards",
      recommendations: ["Store in separate cabinets", "Ensure proper ventilation"],
    },
    Benzene: {
      level: "caution",
      reason: "Both flammable liquids, requires special conditions",
      recommendations: [
        "Use fire-rated cabinets",
        "Maintain temperature control below 25°C",
        "Separate by at least 2 meters",
      ],
    },
    "Ammonia Solution": {
      level: "safe",
      reason: "No reactive hazards between these chemicals",
      recommendations: ["Standard storage practices apply"],
    },
    "Hydrogen Peroxide": {
      level: "safe",
      reason: "Compatible when stored properly",
      recommendations: ["Keep in cool, dry location"],
    },
    Methanol: {
      level: "caution",
      reason: "Both flammable solvents, requires monitoring",
      recommendations: ["Use explosion-proof cabinets", "Implement continuous monitoring"],
    },
    Ethanol: {
      level: "caution",
      reason: "Both flammable, similar storage requirements",
      recommendations: ["Co-locate in flammables cabinet", "Ensure fire suppression nearby"],
    },
    "Sulfuric Acid": {
      level: "incompatible",
      reason: "Highly exothermic reaction risk. Acetone is flammable and Sulfuric Acid is a strong oxidizer",
      recommendations: [
        "Store in separate fire-rated cabinets at least 10 meters apart",
        "Install secondary containment",
        "Refer to NFPA 400 guidelines",
      ],
    },
    "Hydrochloric Acid": {
      level: "incompatible",
      reason: "Risk of violent exothermic reaction and toxic fume generation",
      recommendations: [
        "Maintain minimum 15-meter separation",
        "Use dedicated acid storage area",
        "Install emergency eyewash station nearby",
      ],
    },
    "Chlorine Gas": {
      level: "incompatible",
      reason: "Acetone reacts violently with chlorine, extreme fire/explosion hazard",
      recommendations: ["Never store together", "Use isolated storage locations", "Install pressure relief systems"],
    },
    "Potassium Permanganate": {
      level: "incompatible",
      reason: "Strong oxidizer reacts dangerously with flammable liquid",
      recommendations: ["Separate storage required", "Use inert atmosphere storage if possible"],
    },
    "Calcium Hypochlorite": {
      level: "incompatible",
      reason: "Oxidizer causes spontaneous combustion with flammable solvents",
      recommendations: ["Complete isolation required", "Fireproof cabinet mandatory"],
    },
  },
  "Sodium Hydroxide": {
    Acetone: {
      level: "safe",
      reason: "Different chemical classes with no reactive hazards",
      recommendations: ["Store in separate cabinets", "Ensure proper ventilation"],
    },
    Benzene: {
      level: "safe",
      reason: "No reaction between base and aromatic hydrocarbon",
      recommendations: ["Standard storage practices"],
    },
    "Ammonia Solution": {
      level: "caution",
      reason: "Both alkaline, hygroscopic; requires moisture control",
      recommendations: ["Use desiccant storage", "Keep containers sealed"],
    },
    "Hydrogen Peroxide": {
      level: "safe",
      reason: "Alkaline environment stabilizes peroxide",
      recommendations: ["Compatible storage arrangement"],
    },
    Methanol: { level: "safe", reason: "No reactive hazards", recommendations: ["Standard storage"] },
    Ethanol: { level: "safe", reason: "Compatible alcohols and bases", recommendations: ["Standard storage"] },
    "Sulfuric Acid": {
      level: "incompatible",
      reason: "Violent exothermic neutralization reaction, heat generation, explosive vaporization",
      recommendations: [
        "Separate storage in different buildings",
        "Minimum 20-meter distance",
        "Install automatic suppression",
        "Refer to NFPA 400",
      ],
    },
    "Hydrochloric Acid": {
      level: "incompatible",
      reason: "Strong exothermic reaction, toxic chlorine gas generation possible",
      recommendations: [
        "Complete isolation required",
        "Use separate acid storage area",
        "Maintain emergency response capability",
      ],
    },
    "Chlorine Gas": {
      level: "incompatible",
      reason: "Alkaline base reacts with chlorine gas forming hazardous products",
      recommendations: ["Never co-locate", "Use pressurized containers for chlorine", "Install gas detection systems"],
    },
    "Potassium Permanganate": {
      level: "caution",
      reason: "Strong oxidizer with base requires careful handling",
      recommendations: ["Separate containers", "No direct contact", "Moisture prevention critical"],
    },
    "Calcium Hypochlorite": {
      level: "caution",
      reason: "Oxidizer interaction with base requires segregation",
      recommendations: ["Use separate storage areas", "Install fire protection"],
    },
  },
  Benzene: {
    Acetone: {
      level: "caution",
      reason: "Both flammable liquids",
      recommendations: ["Fire-rated cabinet", "Temperature control below 25°C"],
    },
    "Sodium Hydroxide": {
      level: "safe",
      reason: "No reaction between base and aromatic hydrocarbon",
      recommendations: ["Standard storage practices"],
    },
    "Ammonia Solution": {
      level: "safe",
      reason: "Different classes, no reactive hazard",
      recommendations: ["Standard storage"],
    },
    "Hydrogen Peroxide": {
      level: "safe",
      reason: "Oxidizer does not react with aromatic at normal conditions",
      recommendations: ["Standard storage"],
    },
    Methanol: {
      level: "caution",
      reason: "Both flammable solvents with similar properties",
      recommendations: ["Combined flammables storage"],
    },
    Ethanol: {
      level: "caution",
      reason: "Both flammable, require consolidated safety measures",
      recommendations: ["Flammables cabinet", "Continuous monitoring"],
    },
    "Sulfuric Acid": {
      level: "incompatible",
      reason: "Aromatic hydrocarbon is flammable; strong oxidizer causes fire hazard",
      recommendations: ["Separate fire-rated storage", "10+ meter distance", "NFPA 400 compliance"],
    },
    "Hydrochloric Acid": {
      level: "incompatible",
      reason: "Flammable organic with strong acid presents fire/explosion risk",
      recommendations: ["Isolated storage", "Emergency response ready"],
    },
    "Chlorine Gas": {
      level: "incompatible",
      reason: "Violent oxidation reaction, potential explosion",
      recommendations: ["Never store together", "Pressurized isolation required"],
    },
    "Potassium Permanganate": {
      level: "incompatible",
      reason: "Strong oxidizer causes spontaneous ignition with organic compound",
      recommendations: ["Complete separation", "Inert storage conditions"],
    },
    "Calcium Hypochlorite": {
      level: "incompatible",
      reason: "Oxidizer reacts violently with flammable organic",
      recommendations: ["Isolated storage", "Fire suppression system nearby"],
    },
  },
}

// Default compatibility for all pairs (will be overridden by COMPATIBILITY_DATA)
const defaultCompatibility: CompatibilityInfo = {
  level: "unknown",
  reason: "Compatibility data not available",
  recommendations: ["Consult material safety data sheets", "Contact chemical supplier"],
}

export const getCompatibilityInfo = (chemical1: string, chemical2: string): CompatibilityInfo => {
  if (chemical1 === chemical2) {
    return {
      level: "safe",
      reason: "Same chemical - naturally compatible",
      recommendations: ["Store together normally"],
    }
  }

  if (COMPATIBILITY_DATA[chemical1]?.[chemical2]) {
    return COMPATIBILITY_DATA[chemical1][chemical2]
  }

  if (COMPATIBILITY_DATA[chemical2]?.[chemical1]) {
    return COMPATIBILITY_DATA[chemical2][chemical1]
  }

  return defaultCompatibility
}

export const checkCompatibility = (chemical1: string, chemical2: string): boolean => {
  const info = getCompatibilityInfo(chemical1, chemical2)
  return info.level !== "incompatible"
}

export const getIncompatibleChemicals = (chemical: string): string[] => {
  const incompatible: string[] = []
  CHEMICALS.forEach((otherChem) => {
    if (otherChem !== chemical) {
      const info = getCompatibilityInfo(chemical, otherChem)
      if (info.level === "incompatible") {
        incompatible.push(otherChem)
      }
    }
  })
  return incompatible
}

export const getStorageRequirements = (chemical: string): string[] => {
  const requirements: string[] = []
  CHEMICALS.forEach((otherChem) => {
    if (otherChem !== chemical) {
      const info = getCompatibilityInfo(chemical, otherChem)
      if (info.recommendations) {
        requirements.push(...info.recommendations)
      }
    }
  })
  return [...new Set(requirements)]
}
