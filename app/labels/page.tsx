"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Eye, Printer, Download, Search, Home, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import Image from "next/image"
import GHSLabelPreview from "@/components/ghs-label-preview"
import ModificationReasonDialog from "@/components/modification-reason-dialog"

const defaultLabelData = [
  {
    id: 1,
    productName: "Cenospheres, All Grades",
    chemicalName: "Ceramic Microspheres",
    identifierNumber: "CAS No. 66402-68-4",
    contributingSubstances: "Ceramic Microspheres 100%",
    nominalQuantity: "25 kg",
    supplier: "OILSERV Energy Ltd",
    supplierAddress: "123 Industrial Zone, Port Harcourt, Nigeria",
    emergencyPhone: "+234-1-234-5678",
    hazards: ["GHS07"],
    signalWord: "WARNING",
    hazardStatements: ["H335: May cause respiratory irritation"],
    precautionaryStatements: [
      "P261: Avoid breathing dust",
      "P271: Use only outdoors or in a well-ventilated area",
      "P304+P340: IF INHALED: Remove person to fresh air and keep comfortable for breathing",
    ],
    selectedPpe: ["RESPIRATORY_PROTECTION", "EYE_PROTECTION"],
    additionalInfo: "Store in dry place. Avoid dust generation.",
    lastUpdated: "2024-07-28",
    status: "Approved",
    notification: "From SDS Library",
  },
  {
    id: 2,
    productName: "Norcem Portland Cements",
    chemicalName: "Portland Cement",
    identifierNumber: "CAS No. 65997-15-1",
    contributingSubstances: "Portland Cement 95-100%",
    nominalQuantity: "50 kg",
    supplier: "OILSERV Energy Ltd",
    supplierAddress: "123 Industrial Zone, Port Harcourt, Nigeria",
    emergencyPhone: "+234-1-234-5678",
    hazards: ["GHS05", "GHS07"],
    signalWord: "DANGER",
    hazardStatements: [
      "H315: Causes skin irritation",
      "H318: Causes serious eye damage",
      "H335: May cause respiratory irritation",
    ],
    precautionaryStatements: [
      "P280: Wear protective gloves/protective clothing/eye protection/face protection",
      "P305+P351+P338: IF IN EYES: Rinse cautiously with water for several minutes",
      "P310: Immediately call a POISON CENTER or doctor/physician",
    ],
    selectedPpe: ["EYE_PROTECTION", "HAND_PROTECTION", "RESPIRATORY_PROTECTION"],
    additionalInfo: "Keep away from moisture. Handle with care.",
    lastUpdated: "2024-07-28",
    status: "Approved",
    notification: "From SDS Library",
  },
  {
    id: 3,
    productName: "Silica gel, grade 60",
    chemicalName: "Silicon Dioxide",
    identifierNumber: "CAS No. 7631-86-9",
    contributingSubstances: "Silicon Dioxide 99%",
    nominalQuantity: "1 kg",
    supplier: "OILSERV Energy Ltd",
    supplierAddress: "123 Industrial Zone, Port Harcourt, Nigeria",
    emergencyPhone: "+234-1-234-5678",
    hazards: ["GHS07"],
    signalWord: "WARNING",
    hazardStatements: ["H319: Causes serious eye irritation", "H335: May cause respiratory irritation"],
    precautionaryStatements: [
      "P261: Avoid breathing dust",
      "P280: Wear protective gloves/eye protection",
      "P305+P351+P338: IF IN EYES: Rinse cautiously with water for several minutes",
    ],
    selectedPpe: ["EYE_PROTECTION", "RESPIRATORY_PROTECTION"],
    additionalInfo: "Store in dry place. Non-toxic desiccant.",
    lastUpdated: "2024-07-28",
    status: "Approved",
    notification: "From SDS Library",
  },
  {
    id: 4,
    productName: "Liquid Nitrogen (LN2)",
    chemicalName: "Nitrogen",
    identifierNumber: "CAS No. 7727-37-9",
    contributingSubstances: "Nitrogen 99.9%",
    nominalQuantity: "180 L",
    supplier: "OILSERV Energy Ltd",
    supplierAddress: "123 Industrial Zone, Port Harcourt, Nigeria",
    emergencyPhone: "+234-1-234-5678",
    hazards: ["GHS04"],
    signalWord: "WARNING",
    hazardStatements: ["H281: Contains refrigerated gas; may cause cryogenic burns or injury"],
    precautionaryStatements: [
      "P282: Wear cold insulating gloves/face shield/eye protection",
      "P336+P315: Thaw frosted parts with lukewarm water. Get immediate medical advice/attention",
      "P403: Store in a well-ventilated place",
    ],
    selectedPpe: ["EYE_PROTECTION", "HAND_PROTECTION", "FACE_PROTECTION"],
    additionalInfo: "Cryogenic liquid. Handle with extreme care. Use in well-ventilated areas.",
    lastUpdated: "2024-07-28",
    status: "Approved",
    notification: "From SDS Library",
  },
  {
    id: 5,
    productName: "Xylenes",
    chemicalName: "Dimethylbenzene",
    identifierNumber: "CAS No. 1330-20-7",
    contributingSubstances: "Xylene isomers mixture 99%",
    nominalQuantity: "20 L",
    supplier: "OILSERV Energy Ltd",
    supplierAddress: "123 Industrial Zone, Port Harcourt, Nigeria",
    emergencyPhone: "+234-1-234-5678",
    hazards: ["GHS02", "GHS07", "GHS08"],
    signalWord: "DANGER",
    hazardStatements: [
      "H226: Flammable liquid and vapour",
      "H304: May be fatal if swallowed and enters airways",
      "H312: Harmful in contact with skin",
      "H315: Causes skin irritation",
      "H332: Harmful if inhaled",
    ],
    precautionaryStatements: [
      "P210: Keep away from heat/sparks/open flames/hot surfaces",
      "P280: Wear protective gloves/protective clothing/eye protection",
      "P301+P310: IF SWALLOWED: Immediately call a POISON CENTER",
      "P331: Do NOT induce vomiting",
    ],
    selectedPpe: ["EYE_PROTECTION", "HAND_PROTECTION", "RESPIRATORY_PROTECTION"],
    additionalInfo: "Flammable solvent. Use in well-ventilated areas only.",
    lastUpdated: "2024-07-28",
    status: "Approved",
    notification: "From SDS Library",
  },
  {
    id: 6,
    productName: "Ammonium chloride (NH4CL)",
    chemicalName: "Ammonium Chloride",
    identifierNumber: "CAS No. 12125-02-9",
    contributingSubstances: "Ammonium Chloride 99.5%",
    nominalQuantity: "25 kg",
    supplier: "OILSERV Energy Ltd",
    supplierAddress: "123 Industrial Zone, Port Harcourt, Nigeria",
    emergencyPhone: "+234-1-234-5678",
    hazards: ["GHS07"],
    signalWord: "WARNING",
    hazardStatements: ["H302: Harmful if swallowed", "H319: Causes serious eye irritation"],
    precautionaryStatements: [
      "P264: Wash hands thoroughly after handling",
      "P270: Do not eat, drink or smoke when using this product",
      "P305+P351+P338: IF IN EYES: Rinse cautiously with water for several minutes",
    ],
    selectedPpe: ["EYE_PROTECTION", "HAND_PROTECTION"],
    additionalInfo: "Hygroscopic material. Store in dry conditions.",
    lastUpdated: "2024-07-28",
    status: "Approved",
    notification: "From SDS Library",
  },
  {
    id: 7,
    productName: "Potassium chloride (KCL)",
    chemicalName: "Potassium Chloride",
    identifierNumber: "CAS No. 7447-40-7",
    contributingSubstances: "Potassium Chloride 99%",
    nominalQuantity: "25 kg",
    supplier: "OILSERV Energy Ltd",
    supplierAddress: "123 Industrial Zone, Port Harcourt, Nigeria",
    emergencyPhone: "+234-1-234-5678",
    hazards: [],
    signalWord: "NONE",
    hazardStatements: ["Not classified as hazardous under GHS criteria"],
    precautionaryStatements: [
      "P264: Wash hands thoroughly after handling",
      "P280: Wear protective gloves/eye protection",
    ],
    selectedPpe: ["EYE_PROTECTION", "HAND_PROTECTION"],
    additionalInfo: "Low hazard material. Standard precautions apply.",
    lastUpdated: "2024-07-28",
    status: "Approved",
    notification: "From SDS Library",
  },
  {
    id: 8,
    productName: "Biocide",
    chemicalName: "Glutaraldehyde solution",
    identifierNumber: "CAS No. 111-30-8",
    contributingSubstances: "Glutaraldehyde 25% in water",
    nominalQuantity: "25 L",
    supplier: "OILSERV Energy Ltd",
    supplierAddress: "123 Industrial Zone, Port Harcourt, Nigeria",
    emergencyPhone: "+234-1-234-5678",
    hazards: ["GHS05", "GHS06", "GHS08", "GHS09"],
    signalWord: "DANGER",
    hazardStatements: [
      "H301: Toxic if swallowed",
      "H314: Causes severe skin burns and eye damage",
      "H317: May cause an allergic skin reaction",
      "H331: Toxic if inhaled",
      "H334: May cause allergy or asthma symptoms or breathing difficulties if inhaled",
      "H400: Very toxic to aquatic life",
    ],
    precautionaryStatements: [
      "P260: Do not breathe mist/vapours/spray",
      "P280: Wear protective gloves/protective clothing/eye protection/face protection",
      "P301+P330+P331: IF SWALLOWED: Rinse mouth. Do NOT induce vomiting",
      "P304+P340: IF INHALED: Remove person to fresh air",
      "P305+P351+P338: IF IN EYES: Rinse cautiously with water for several minutes",
    ],
    selectedPpe: ["EYE_PROTECTION", "HAND_PROTECTION", "RESPIRATORY_PROTECTION", "FULL_BODY_PROTECTION"],
    additionalInfo: "Highly toxic biocide. Handle with extreme care. Environmental hazard.",
    lastUpdated: "2024-07-28",
    status: "Approved",
    notification: "From SDS Library",
  },
  {
    id: 9,
    productName: "Sodium chloride (NaCl)",
    chemicalName: "Sodium Chloride",
    identifierNumber: "CAS No. 7647-14-5",
    contributingSubstances: "Sodium Chloride 99%",
    nominalQuantity: "25 kg",
    supplier: "OILSERV Energy Ltd",
    supplierAddress: "123 Industrial Zone, Port Harcourt, Nigeria",
    emergencyPhone: "+234-1-234-5678",
    hazards: [],
    signalWord: "NONE",
    hazardStatements: ["Not classified as hazardous under GHS criteria"],
    precautionaryStatements: ["P264: Wash hands thoroughly after handling"],
    selectedPpe: ["EYE_PROTECTION"],
    additionalInfo: "Low hazard material. Common salt.",
    lastUpdated: "2024-07-28",
    status: "Approved",
    notification: "From SDS Library",
  },
  {
    id: 10,
    productName: "Hydrochloric acid",
    chemicalName: "Hydrogen Chloride",
    identifierNumber: "CAS No. 7647-01-0",
    contributingSubstances: "Hydrochloric Acid 37%",
    nominalQuantity: "25 L",
    supplier: "OILSERV Energy Ltd",
    supplierAddress: "123 Industrial Zone, Port Harcourt, Nigeria",
    emergencyPhone: "+234-1-234-5678",
    hazards: ["GHS05", "GHS07"],
    signalWord: "DANGER",
    hazardStatements: [
      "H290: May be corrosive to metals",
      "H314: Causes severe skin burns and eye damage",
      "H335: May cause respiratory irritation",
    ],
    precautionaryStatements: [
      "P260: Do not breathe mist/vapours/spray",
      "P280: Wear protective gloves/protective clothing/eye protection/face protection",
      "P301+P330+P331: IF SWALLOWED: Rinse mouth. Do NOT induce vomiting",
      "P305+P351+P338: IF IN EYES: Rinse cautiously with water for several minutes",
      "P310: Immediately call a POISON CENTER or doctor/physician",
    ],
    selectedPpe: ["EYE_PROTECTION", "HAND_PROTECTION", "RESPIRATORY_PROTECTION", "FACE_PROTECTION"],
    additionalInfo: "Strong acid. Highly corrosive. Handle with extreme care.",
    lastUpdated: "2024-07-28",
    status: "Approved",
    notification: "From SDS Library",
  },
]

export default function LabelsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [allLabels, setAllLabels] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModificationDialog, setShowModificationDialog] = useState(false)
  const [selectedLabelForModification, setSelectedLabelForModification] = useState<any>(null)
  const [viewingLabel, setViewingLabel] = useState<any>(null)
  const labelPrintRef = useRef<HTMLDivElement>(null)

  const ghsHazards = [
    {
      code: "GHS03",
      name: "Oxidizing",
      image: "/images/image.png",
    },
    {
      code: "GHS02",
      name: "Flammable",
      image: "/images/image.png",
    },
    {
      code: "GHS06",
      name: "Toxic",
      image: "/images/image.png",
    },
    {
      code: "GHS04",
      name: "Compressed Gas",
      image: "/images/image.png",
    },
    {
      code: "GHS07",
      name: "Harmful",
      image: "/images/image.png",
    },
    {
      code: "GHS09",
      name: "Environmental",
      image: "/images/image.png",
    },
    {
      code: "GHS08",
      name: "Health Hazard",
      image: "/images/image.png",
    },
    {
      code: "GHS01",
      name: "Explosive",
      image: "/images/image.png",
    },
    {
      code: "GHS05",
      name: "Corrosive",
      image: "/images/image.png",
    },
  ]

  useEffect(() => {
    const loadLabels = () => {
      try {
        const savedLabels = JSON.parse(localStorage.getItem("ghsLabels") || "[]")
        const sdsEntries = JSON.parse(localStorage.getItem("sdsEntries") || "[]")

        const labelMap = new Map()

        defaultLabelData.forEach((label) => {
          const key = `${label.productName}-${label.identifierNumber}`
          labelMap.set(key, label)
        })

        sdsEntries.forEach((sdsEntry: any, index: number) => {
          const key = `${sdsEntry.productName}-${sdsEntry.casNumber}`
          if (!labelMap.has(key)) {
            const labelFromSDS = {
              id: 1000 + index,
              productName: sdsEntry.productName,
              chemicalName: sdsEntry.chemicalName || sdsEntry.productName,
              identifierNumber: `CAS No. ${sdsEntry.casNumber}`,
              contributingSubstances: "",
              nominalQuantity: "To be determined",
              supplier: "OILSERV Energy Ltd",
              supplierAddress: "123 Industrial Zone, Port Harcourt, Nigeria",
              emergencyPhone: "+234-1-234-5678",
              hazards: ["GHS07"],
              signalWord: "WARNING",
              hazardStatements: ["H315: Causes skin irritation", "H319: Causes serious eye irritation"],
              precautionaryStatements: [
                "P280: Wear protective gloves/protective clothing/eye protection",
                "P305+P351+P338: IF IN EYES: Rinse cautiously with water for several minutes",
              ],
              selectedPpe: ["EYE_PROTECTION", "HAND_PROTECTION"],
              additionalInfo: `Batch: ${sdsEntry.batchNumber}, Location: ${sdsEntry.location}`,
              lastUpdated: sdsEntry.sdsAddedDate,
              status: "Approved",
              notification: "Generated from SDS Library",
            }
            labelMap.set(key, labelFromSDS)
          }
        })

        savedLabels.forEach((savedLabel: any, index: number) => {
          const key = `${savedLabel.productName}-${savedLabel.identifierNumber}`
          if (!labelMap.has(key)) {
            const maxId = Math.max(...Array.from(labelMap.values()).map((l: any) => l.id), 0)
            labelMap.set(key, {
              ...savedLabel,
              id: savedLabel.id || maxId + index + 1,
            })
          }
        })

        const mergedLabels = Array.from(labelMap.values())
        const approvedLabels = mergedLabels.filter((label: any) => label.status === "Approved")
        setAllLabels(approvedLabels)
      } catch (error) {
        console.error("Error loading labels:", error)
        const approvedDefaults = defaultLabelData.filter((label) => label.status === "Approved")
        setAllLabels(approvedDefaults)
      } finally {
        setIsLoading(false)
      }
    }

    loadLabels()
  }, [])

  const generateLabelPDF = (label: any) => {
    const ghsImages: { [key: string]: string } = {
      GHS01: "/images/image.png",
      GHS02: "/images/image.png",
      GHS03: "/images/image.png",
      GHS04: "/images/image.png",
      GHS05: "/images/image.png",
      GHS06: "/images/image.png",
      GHS07: "/images/image.png",
      GHS08: "/images/image.png",
      GHS09: "/images/image.png",
    }

    const ppeImages: { [key: string]: string } = {
      EYE_PROTECTION: "/images/screenshot-202025-08-01-20172652.jpeg",
      SAFETY_FOOTWEAR: "/images/screenshot-202025-08-01-20172733.jpeg",
      HAND_PROTECTION: "/images/screenshot-202025-08-01-20172803.jpeg",
      NO_SMOKING: "/images/screenshot-202025-08-01-20174557.jpeg",
      FACE_SHIELD: "/images/screenshot-202025-08-01-20172917.jpeg",
      RESPIRATOR: "/images/screenshot-202025-08-01-20173614.jpeg",
      RESPIRATORY_PROTECTION: "/images/screenshot-202025-08-01-20173614.jpeg",
      PROTECTIVE_CLOTHING: "/images/screenshot-202025-08-01-20173812.jpeg",
      FULL_BODY_PROTECTION: "/images/screenshot-202025-08-01-20173812.jpeg",
      SCBA: "/images/screenshot-202025-08-01-20173213.jpeg",
      DUST_MASK: "/images/screenshot-202025-08-01-20172938.jpeg",
      PROTECTIVE_APRON: "/images/screenshot-202025-08-01-20173740.jpeg",
      FACE_PROTECTION: "/images/screenshot-202025-08-01-20172917.jpeg",
    }

    const hazardsHTML =
      label.hazards
        ?.slice(0, 4)
        .map(
          (code: string) => `
      <img src="${ghsImages[code] || ""}" alt="${code}" style="width: 60px; height: 60px; object-fit: contain;" />
    `,
        )
        .join("") || ""

    const ppeHTML =
      (label.selectedPpe || [])
        .slice(0, 5)
        .map(
          (code: string) => `
      <div style="width: 40px; height: 40px; border: 2px solid #666; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: white;">
        <img src="${ppeImages[code] || ""}" alt="${code}" style="width: 32px; height: 32px; object-fit: contain;" />
      </div>
    `,
        )
        .join("") || ""

    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const pdfContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>GHS Label - ${label.productName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
            
            * { margin: 0; padding: 0; box-sizing: border-box; }
            
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
              background: #f5f5f5;
              padding: 20px;
            }
            
            .label-container {
              width: 30cm;
              height: 15cm;
              background: white;
              border: 4px solid black;
              padding: 16px;
              display: flex;
              flex-direction: column;
              margin: 0 auto;
            }
            
            .header {
              border-bottom: 2px solid black;
              padding-bottom: 8px;
              margin-bottom: 12px;
            }
            
            .header-row {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
            }
            
            .logo {
              font-size: 32px;
              font-weight: 800;
              color: #f97316;
            }
            
            .product-info {
              text-align: center;
              flex: 1;
            }
            
            .product-name {
              font-size: 24px;
              font-weight: 900;
              color: #111;
              text-transform: uppercase;
            }
            
            .chemical-name {
              font-size: 18px;
              font-weight: 700;
              color: #333;
              margin-top: 4px;
            }
            
            .info-boxes {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 4px;
              min-width: 280px;
              font-size: 11px;
            }
            
            .info-row {
              display: flex;
              gap: 4px;
            }
            
            .info-label {
              font-weight: 700;
              min-width: 90px;
            }
            
            .signal-word {
              display: inline-block;
              padding: 4px 24px;
              color: white;
              font-weight: 900;
              font-size: 20px;
              text-transform: uppercase;
              margin-top: 8px;
            }
            
            .signal-danger { background: #dc2626; }
            .signal-warning { background: #f97316; }
            
            .main-content {
              display: flex;
              flex: 1;
              gap: 16px;
            }
            
            .hazard-symbols {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
              align-items: flex-start;
              min-width: 140px;
            }
            
            .statements {
              flex: 1;
            }
            
            .statements h3 {
              font-size: 14px;
              font-weight: 700;
              margin-bottom: 4px;
            }
            
            .statements ul {
              font-size: 11px;
              margin-left: 16px;
              margin-bottom: 12px;
            }
            
            .statements li {
              margin-bottom: 2px;
            }
            
            .footer {
              border-top: 2px solid black;
              padding-top: 8px;
              margin-top: auto;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
            }
            
            .ppe-section h4 {
              font-size: 12px;
              font-weight: 700;
              margin-bottom: 8px;
            }
            
            .ppe-icons {
              display: flex;
              gap: 8px;
            }
            
            .company-info {
              text-align: right;
              font-size: 11px;
            }
            
            .company-info p:first-child {
              font-weight: 700;
              font-size: 13px;
            }
            
            @media print {
              body { background: white; padding: 0; }
              .label-container { 
                border: 4px solid black;
                page-break-inside: avoid;
              }
              @page { size: landscape; margin: 10mm; }
            }
          </style>
        </head>
        <body>
          <div class="label-container">
            <div class="header">
              <div class="header-row">
                <div class="logo">OILSERV</div>
                <div class="product-info">
                  <div class="product-name">${label.productName || "PRODUCT NAME"}</div>
                  <div class="chemical-name">(${label.chemicalName || "CHEMICAL NAME"})</div>
                </div>
                <div class="info-boxes">
                  <div class="info-row"><span class="info-label">Batch Number:</span><span>${label.batchNumber || "-"}</span></div>
                  <div class="info-row"><span class="info-label">Mfg Date:</span><span>${label.manufacturingDate || "-"}</span></div>
                  <div class="info-row"><span class="info-label">CAS Number:</span><span>${label.identifierNumber || "-"}</span></div>
                  <div class="info-row"><span class="info-label">Expiry Date:</span><span>${label.expiryDate || "-"}</span></div>
                  <div class="info-row"><span class="info-label">OS Number:</span><span>${label.osCode || "-"}</span></div>
                  <div class="info-row"><span class="info-label">Quantity:</span><span>${label.nominalQuantity || "-"}</span></div>
                </div>
              </div>
              <div style="text-align: center;">
                <span class="signal-word ${label.signalWord === "DANGER" ? "signal-danger" : "signal-warning"}">
                  ${label.signalWord || "WARNING"}
                </span>
              </div>
            </div>
            
            <div class="main-content">
              <div class="hazard-symbols">
                ${hazardsHTML}
              </div>
              
              <div class="statements">
                ${
                  label.hazardStatements?.length > 0
                    ? `
                  <h3>HAZARD STATEMENTS:</h3>
                  <ul>
                    ${label.hazardStatements
                      .slice(0, 5)
                      .map((s: string) => `<li>${s}</li>`)
                      .join("")}
                  </ul>
                `
                    : ""
                }
                
                ${
                  label.precautionaryStatements?.length > 0
                    ? `
                  <h3>PRECAUTIONARY STATEMENTS:</h3>
                  <ul>
                    ${label.precautionaryStatements
                      .slice(0, 5)
                      .map((s: string) => `<li>${s}</li>`)
                      .join("")}
                  </ul>
                `
                    : ""
                }
              </div>
            </div>
            
            <div class="footer">
              <div class="ppe-section">
                <h4>PERSONAL PROTECTIVE EQUIPMENT:</h4>
                <div class="ppe-icons">${ppeHTML}</div>
              </div>
              
              <div class="company-info">
                <p>${label.supplier || "OILSERV ENERGY LTD"}</p>
                <p>${label.supplierAddress || "123 Industrial Zone, Port Harcourt, Nigeria"}</p>
                <p>Emergency: ${label.emergencyPhone || "+234-1-234-5678"}</p>
                <p>Date: ${new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `

    printWindow.document.write(pdfContent)
    printWindow.document.close()
  }

  const printLabel = (label: any) => {
    // Placeholder for the old print function, now superseded by generateLabelPDF
    // In a real application, you might want to keep this or remove it based on need.
    console.log("Old print function called for label:", label.productName)
  }

  const handleLabelModifyClick = (label: any) => {
    setSelectedLabelForModification(label)
    setShowModificationDialog(true)
  }

  const handleModificationConfirm = (reason: string) => {
    if (selectedLabelForModification) {
      sessionStorage.setItem("labelModificationReason", reason)
      router.push(`/add-product/label?edit=${selectedLabelForModification.id}`)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading labels...</p>
        </div>
      </div>
    )
  }

  const filteredLabels = allLabels.filter((label) => {
    const matchesSearch =
      label.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      label.chemicalName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All Status" || label.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string, notification?: string) => {
    if (status === "Approved") {
      return (
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            Approved
          </Badge>
          {notification && (
            <Badge variant="outline" className="text-xs text-green-600 border-green-300">
              {notification}
            </Badge>
          )}
        </div>
      )
    }

    return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {viewingLabel ? (
        <div className="min-h-screen bg-gray-100">
          <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewingLabel(null)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">GHS Label: {viewingLabel.productName}</h1>
                  <p className="text-sm text-gray-600">Chemical: {viewingLabel.chemicalName}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => generateLabelPDF(viewingLabel)} className="bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button onClick={() => generateLabelPDF(viewingLabel)} variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Label
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6 flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 overflow-auto">
              <div ref={labelPrintRef} style={{ transform: "scale(0.85)", transformOrigin: "top center" }}>
                <GHSLabelPreview formData={viewingLabel} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/")}
                className="text-gray-600 hover:text-gray-900"
              >
                <Home className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white text-sm font-bold">
                  ⚠️
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Labels Library</h1>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Labels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{allLabels.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Approved Labels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {allLabels.filter((label) => label.status === "Approved").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">From SDS Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {allLabels.filter((label) => label.notification === "Generated from SDS Library").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">GHS Compliant</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">100%</div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">Search & Filter Labels</CardTitle>
                  <p className="text-sm text-gray-500">Labels automatically generated from SDS Library products</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search by product name or chemical..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Status">All Status</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Labels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLabels.map((label) => (
                <Card key={`${label.id}-${label.productName}`} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-bold">{label.productName}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{label.chemicalName}</p>
                      </div>
                      {getStatusColor(label.status, label.notification)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Hazard Symbols Preview */}
                    <div className="flex gap-1 mb-4">
                      {label.hazards.map((hazardCode) => {
                        const hazard = ghsHazards.find((h) => h.code === hazardCode)
                        return (
                          <div key={hazardCode} className="w-8 h-8 flex items-center justify-center">
                            <Image
                              src={hazard?.image || "/placeholder.svg"}
                              alt={hazard?.name || "GHS Pictogram"}
                              width={32}
                              height={32}
                            />
                          </div>
                        )
                      })}
                    </div>

                    {/* Signal Word */}
                    <div className="mb-4">
                      <span
                        className={`inline-block px-2 py-1 text-white font-bold text-sm ${
                          label.signalWord === "DANGER" ? "bg-red-600" : "bg-orange-500"
                        }`}
                      >
                        {label.signalWord}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-blue-50 hover:bg-blue-100 border-blue-200"
                        onClick={() => setViewingLabel(label)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLabelModifyClick(label)}
                        className="flex-1"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Modify
                      </Button>
                    </div>

                    <div className="text-xs text-gray-500 mt-2">Last updated: {label.lastUpdated}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Modification Reason Dialog */}
            <ModificationReasonDialog
              isOpen={showModificationDialog}
              itemName={selectedLabelForModification?.productName || ""}
              onConfirm={handleModificationConfirm}
              onCancel={() => {
                setShowModificationDialog(false)
                setSelectedLabelForModification(null)
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}
