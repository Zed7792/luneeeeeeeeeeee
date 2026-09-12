export interface Chemical {
  id: string
  name: string
  casNumber: string
  hazardClasses: string[] // GHS hazard classes
  storageGroup:
    | "Acid"
    | "Base"
    | "Oxidizer"
    | "Flammable"
    | "Corrosive"
    | "Toxic"
    | "Water-Reactive"
    | "Organic Peroxide"
    | "Other"
  pH?: number
  flashPoint?: number | null // in Celsius
  reactiveIncompatibilities: string[] // from SDS Section 10
  temperatureRequirements?: { min: number; max: number } // in Celsius
  sdsUrl: string
  healthHazard: boolean
  environmentalHazard: boolean
}

export const CHEMICAL_DATABASE: Chemical[] = [
  {
    id: "cenospheres-all-grades",
    name: "Cenospheres, All Grades",
    casNumber: "66402-68-4",
    hazardClasses: ["GHS07"],
    storageGroup: "Other",
    pH: 7,
    flashPoint: null,
    reactiveIncompatibilities: ["Strong oxidizers", "Strong acids"],
    temperatureRequirements: { min: 10, max: 40 },
    sdsUrl: "/sds-library/cenospheres-all-grades",
    healthHazard: true,
    environmentalHazard: false,
  },
  {
    id: "norcem-portland-cements",
    name: "Norcem Portland Cements",
    casNumber: "65997-15-1",
    hazardClasses: ["GHS05", "GHS07"],
    storageGroup: "Base",
    pH: 12,
    flashPoint: null,
    reactiveIncompatibilities: ["Strong acids", "Aluminum", "Ammonium salts"],
    temperatureRequirements: { min: 5, max: 35 },
    sdsUrl: "/sds-library/norcem-portland-cements",
    healthHazard: true,
    environmentalHazard: false,
  },
  {
    id: "silica-gel-grade-60",
    name: "Silica gel, grade 60",
    casNumber: "7631-86-9",
    hazardClasses: ["GHS07"],
    storageGroup: "Other",
    pH: 7,
    flashPoint: null,
    reactiveIncompatibilities: ["Strong bases", "Hydrofluoric acid"],
    temperatureRequirements: { min: 10, max: 30 },
    sdsUrl: "/sds-library/silica-gel-grade-60",
    healthHazard: true,
    environmentalHazard: false,
  },
  {
    id: "liquid-nitrogen-ln2",
    name: "Liquid Nitrogen (LN2)",
    casNumber: "7727-37-9",
    hazardClasses: ["GHS04"],
    storageGroup: "Other",
    pH: undefined,
    flashPoint: null,
    reactiveIncompatibilities: ["None under normal conditions"],
    temperatureRequirements: { min: -210, max: -196 },
    sdsUrl: "/sds-library/liquid-nitrogen-ln2",
    healthHazard: false,
    environmentalHazard: false,
  },
  {
    id: "xylenes",
    name: "Xylenes",
    casNumber: "1330-20-7",
    hazardClasses: ["GHS02", "GHS07", "GHS08"],
    storageGroup: "Flammable",
    pH: 7,
    flashPoint: 25,
    reactiveIncompatibilities: ["Strong oxidizers", "Strong acids"],
    temperatureRequirements: { min: 0, max: 25 },
    sdsUrl: "/sds-library/xylenes",
    healthHazard: true,
    environmentalHazard: true,
  },
  {
    id: "ammonium-chloride-nh4cl",
    name: "Ammonium chloride (NH4CL)",
    casNumber: "12125-02-9",
    hazardClasses: ["GHS07"],
    storageGroup: "Other",
    pH: 5,
    flashPoint: null,
    reactiveIncompatibilities: ["Strong bases", "Strong oxidizers", "Silver salts"],
    temperatureRequirements: { min: 10, max: 30 },
    sdsUrl: "/sds-library/ammonium-chloride-nh4cl",
    healthHazard: true,
    environmentalHazard: false,
  },
  {
    id: "potassium-chloride-kcl",
    name: "Potassium chloride (KCL)",
    casNumber: "7447-40-7",
    hazardClasses: [],
    storageGroup: "Other",
    pH: 7,
    flashPoint: null,
    reactiveIncompatibilities: ["Strong oxidizers", "Strong acids"],
    temperatureRequirements: { min: 10, max: 30 },
    sdsUrl: "/sds-library/potassium-chloride-kcl",
    healthHazard: false,
    environmentalHazard: false,
  },
  {
    id: "biocide",
    name: "Biocide (Glutaraldehyde)",
    casNumber: "111-30-8",
    hazardClasses: ["GHS05", "GHS06", "GHS08", "GHS09"],
    storageGroup: "Toxic",
    pH: 4,
    flashPoint: null,
    reactiveIncompatibilities: ["Strong oxidizers", "Strong bases", "Amines"],
    temperatureRequirements: { min: 5, max: 25 },
    sdsUrl: "/sds-library/biocide",
    healthHazard: true,
    environmentalHazard: true,
  },
  {
    id: "sodium-chloride-nacl",
    name: "Sodium chloride (NaCl)",
    casNumber: "7647-14-5",
    hazardClasses: [],
    storageGroup: "Other",
    pH: 7,
    flashPoint: null,
    reactiveIncompatibilities: ["Strong acids", "Strong oxidizers"],
    temperatureRequirements: { min: 10, max: 35 },
    sdsUrl: "/sds-library/sodium-chloride-nacl",
    healthHazard: false,
    environmentalHazard: false,
  },
  {
    id: "hydrochloric-acid",
    name: "Hydrochloric acid",
    casNumber: "7647-01-0",
    hazardClasses: ["GHS05", "GHS06"],
    storageGroup: "Acid",
    pH: 0.5,
    flashPoint: null,
    reactiveIncompatibilities: ["Bases", "Cyanides", "Sulfides", "Metals", "Oxidizers"],
    temperatureRequirements: { min: 15, max: 30 },
    sdsUrl: "/sds-library/hydrochloric-acid",
    healthHazard: true,
    environmentalHazard: true,
  },
]

export function getChemicalById(id: string): Chemical | undefined {
  return CHEMICAL_DATABASE.find((chem) => chem.id === id)
}

export function searchChemicals(query: string): Chemical[] {
  const lowerQuery = query.toLowerCase()
  return CHEMICAL_DATABASE.filter(
    (chem) => chem.name.toLowerCase().includes(lowerQuery) || chem.casNumber.includes(lowerQuery),
  )
}
