"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  Download,
  Hash,
  AlertCircle,
  Package,
  Plus,
  Flame,
  AlertTriangle,
  Shield,
  Beaker,
  Zap,
  Skull,
  Leaf,
  Trash2,
  Truck,
  FileText,
  Info,
  Calendar,
  MapPin,
  Edit,
} from "lucide-react"
import { ModificationReasonDialog } from "@/components/modification-reason-dialog"

const sections = [
  {
    key: "identification",
    title: "1. Identification of the substance/mixture and of the company/undertaking",
    icon: <Hash className="h-5 w-5" />,
    subsections: [
      "Product Identifier",
      "Relevant identified uses of the substance or mixture and uses advised against",
      "Details of the supplier of the safety data sheet",
      "Emergency telephone number",
    ],
  },
  {
    key: "hazards",
    title: "2. Hazards identification",
    icon: <AlertCircle className="h-5 w-5" />,
    subsections: ["Classification of the substance or mixture", "Label elements", "Other hazards"],
  },
  {
    key: "composition",
    title: "3. Composition/information on ingredients",
    icon: <Package className="h-5 w-5" />,
    subsections: ["Substances", "Mixtures"],
  },
  {
    key: "firstaid",
    title: "4. First-aid measures",
    icon: <Plus className="h-5 w-5" />,
    subsections: [
      "Description of first-aid measures",
      "Most important symptoms and effects, both acute and delayed",
      "Indication of any immediate medical attention and special treatment needed",
    ],
  },
  {
    key: "firefighting",
    title: "5. Firefighting measures",
    icon: <Flame className="h-5 w-5" />,
    subsections: [
      "Extinguishing media",
      "Special hazards arising from the substance or mixture",
      "Advice for firefighters",
    ],
  },
  {
    key: "accidental",
    title: "6. Accidental release measures",
    icon: <AlertTriangle className="h-5 w-5" />,
    subsections: [
      "Personal precautions, protective equipment and emergency procedures",
      "Environmental precautions",
      "Methods and material for containment and cleaning up",
      "Reference to other sections",
    ],
  },
  {
    key: "handling",
    title: "7. Handling and storage",
    icon: <Package className="h-5 w-5" />,
    subsections: [
      "Precautions for safe handling",
      "Conditions for safe storage, including any incompatibilities",
      "Specific end use(s)",
    ],
  },
  {
    key: "exposure",
    title: "8. Exposure controls/personal protection",
    icon: <Shield className="h-5 w-5" />,
    subsections: ["Control parameters", "Exposure controls"],
  },
  {
    key: "physical",
    title: "9. Physical and chemical properties",
    icon: <Beaker className="h-5 w-5" />,
    subsections: ["Information on basic physical and chemical properties", "Other information"],
  },
  {
    key: "stability",
    title: "10. Stability and reactivity",
    icon: <Zap className="h-5 w-5" />,
    subsections: [
      "Reactivity",
      "Chemical stability",
      "Possibility of hazardous reactions",
      "Conditions to avoid",
      "Incompatible materials",
      "Hazardous decomposition products",
    ],
  },
  {
    key: "toxicological",
    title: "11. Toxicological information",
    icon: <Skull className="h-5 w-5" />,
    subsections: ["Information on toxicological effects"],
  },
  {
    key: "ecological",
    title: "12. Ecological information",
    icon: <Leaf className="h-5 w-5" />,
    subsections: [
      "Toxicity",
      "Persistence and degradability",
      "Bio-accumulative potential",
      "Mobility in soil",
      "Results of PBT and vPvB assessment",
      "Other adverse effects",
    ],
  },
  {
    key: "disposal",
    title: "13. Disposal considerations",
    icon: <Trash2 className="h-5 w-5" />,
    subsections: ["Waste treatment methods"],
  },
  {
    key: "transport",
    title: "14. Transport information",
    icon: <Truck className="h-5 w-5" />,
    subsections: [
      "UN number",
      "UN proper shipping name",
      "Transport hazard class(es)",
      "Packing group",
      "Environmental hazards",
      "Special precautions for the user",
      "Transport in bulk according to Annex II of MARPOL73/78 and the IBC Code",
    ],
  },
  {
    key: "regulatory",
    title: "15. Regulatory information",
    icon: <FileText className="h-5 w-5" />,
    subsections: [
      "Safety, health and environmental regulations/legislation specific for the substance or mixture",
      "Chemical safety assessment",
    ],
  },
  {
    key: "other",
    title: "16. Other information",
    icon: <Info className="h-5 w-5" />,
    subsections: [
      "Date of preparation or last revision",
      "Sources of key data used to compile the data sheet",
      "Other information",
    ],
  },
]

const ghsPictogramSVGs = {
  GHS07: "<svg>...</svg>",
  GHS02: "<svg>...</svg>",
}

const ghsPictogramLabels = {
  GHS07: "Exclamation Triangle",
  GHS02: "Flame",
}

export default function SDSDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("identification")
  const [showModificationDialog, setShowModificationDialog] = useState(false)
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Mock SDS document data
  const sdsDocument = {
    id: params.id,
    productName: "Ceramic Microspheres",
    chemicalName: "Hollow Glass Microspheres",
    casNumber: "65997-17-3",
    oilservCode: "OIL-CMS-001",
    batchNumber: "B2024-001",
    location: "Port Harcourt Facility",
    manufacturingDate: "2024-01-15",
    sdsAddedDate: "2024-01-20",
    sdsReviewDate: "2027-01-01",
    status: "Active",
    size: "2.4 MB",
    pdfUrl: "/sds-documents/ceramic-microspheres.pdf",
    ghsPictograms: ["GHS07", "GHS02"],
  }

  const scrollToSection = (sectionKey: string) => {
    setActiveSection(sectionKey)
    const element = sectionRefs.current[sectionKey]
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const getSampleContent = (sectionKey: string, subsectionTitle: string) => {
    const sampleData: { [key: string]: { [key: string]: string } } = {
      identification: {
        "Product Identifier": `Product Name: ${sdsDocument.productName}\nChemical Name: ${sdsDocument.chemicalName}\nCAS Number: ${sdsDocument.casNumber}\nProduct Code: ${sdsDocument.oilservCode}\nBatch Number: ${sdsDocument.batchNumber}`,
        "Relevant identified uses of the substance or mixture and uses advised against":
          "Recommended Use: Industrial filler, lightweight aggregate, construction applications\nRestrictions: Not for food contact applications",
        "Details of the supplier of the safety data sheet":
          "Company: OILSERV Energy Ltd.\nAddress: 123 Oilserv Road, Port Harcourt, Nigeria\nPhone: +234-1-234-5679\nEmail: safety@oilserv.com",
        "Emergency telephone number": "Emergency Phone: +234-1-234-5678\n24/7 Emergency Response: Available",
      },
      hazards: {
        "Classification of the substance or mixture":
          "GHS Classification: Not classified as hazardous under GHS criteria\nPhysical Hazards: None identified\nHealth Hazards: May cause mechanical irritation to eyes and respiratory system",
        "Label elements":
          "Signal Word: Warning\nHazard Statements: H315 - Causes skin irritation, H319 - Causes serious eye irritation\nPrecautionary Statements: P102: Keep out of reach of children, P264: Wash hands thoroughly after handling",
        "Other hazards":
          "PBT/vPvB Assessment: Not applicable - inorganic substance\nOther Hazards: Dust may cause mechanical irritation to eyes and respiratory tract",
      },
      composition: {
        Substances: "Main Component: Ceramic Microspheres (≥95%)\nCAS Number: " + sdsDocument.casNumber,
        Mixtures: "Crystalline Silica (trace): <5%\nCAS Number: 14808-60-7\nClassification: H315, H319, H335",
      },
      firstaid: {
        "Description of first-aid measures":
          "Inhalation: Move to fresh air. If symptoms persist, seek medical attention.\nSkin Contact: Wash with soap and water. Remove contaminated clothing.\nEye Contact: Rinse cautiously with water for several minutes. Remove contact lenses if present.\nIngestion: Rinse mouth with water. Do not induce vomiting. Seek medical attention if symptoms occur.",
        "Most important symptoms and effects, both acute and delayed":
          "Eye irritation, skin irritation, respiratory tract irritation from dust inhalation.",
        "Indication of any immediate medical attention and special treatment needed":
          "Treat symptomatically. No specific antidote.",
      },
      firefighting: {
        "Extinguishing media": "Suitable: Water spray, foam, dry chemical, carbon dioxide.\nUnsuitable: None known.",
        "Special hazards arising from the substance or mixture":
          "Product is not flammable. In case of fire, material may produce irritating fumes.",
        "Advice for firefighters": "Wear self-contained breathing apparatus. Use water spray to cool containers.",
      },
      accidental: {
        "Personal precautions, protective equipment and emergency procedures":
          "Avoid dust generation. Use appropriate personal protective equipment. Ensure adequate ventilation.",
        "Environmental precautions": "Prevent entry into drains, sewers, and waterways.",
        "Methods and material for containment and cleaning up":
          "Collect spilled material using a vacuum cleaner with HEPA filter. Place in suitable containers for disposal.",
        "Reference to other sections": "See Section 8 for exposure controls. See Section 13 for disposal.",
      },
      handling: {
        "Precautions for safe handling":
          "Avoid dust generation. Use only in well-ventilated areas. Wear appropriate PPE.",
        "Conditions for safe storage, including any incompatibilities":
          "Store in a dry place. Keep containers tightly closed. Protect from moisture.",
        "Specific end use(s)": "Industrial applications only.",
      },
      exposure: {
        "Control parameters":
          "OSHA PEL: 15 mg/m³ (total dust), 5 mg/m³ (respirable)\nACGIH TLV: 10 mg/m³ (inhalable), 3 mg/m³ (respirable)",
        "Exposure controls":
          "Engineering Controls: Use local exhaust ventilation.\nPersonal Protective Equipment:\n- Eye Protection: Safety glasses with side shields\n- Skin Protection: Protective gloves\n- Respiratory Protection: N95 dust mask when handling generates dust",
      },
      physical: {
        "Information on basic physical and chemical properties":
          "Appearance: White to gray powder\nOdor: Odorless\npH: 6-8 (aqueous suspension)\nMelting Point: >1000°C\nBoiling Point: Not applicable\nFlash Point: Not applicable\nDensity: 0.6-0.8 g/cm³\nSolubility: Insoluble in water",
        "Other information": "Particle size: 10-300 microns",
      },
      stability: {
        Reactivity: "Stable under normal conditions.",
        "Chemical stability": "Stable under recommended storage conditions.",
        "Possibility of hazardous reactions": "None known under normal conditions.",
        "Conditions to avoid": "Excessive heat, moisture.",
        "Incompatible materials": "Strong acids, strong bases.",
        "Hazardous decomposition products": "None known under normal conditions.",
      },
      toxicological: {
        "Information on toxicological effects":
          "Acute Toxicity: Low toxicity potential.\nSkin Corrosion/Irritation: May cause mild irritation.\nSerious Eye Damage/Irritation: May cause mechanical irritation.\nRespiratory Sensitization: Not a respiratory sensitizer.\nGerm Cell Mutagenicity: Not mutagenic.\nCarcinogenicity: Not classified as carcinogenic.",
      },
      ecological: {
        Toxicity: "Low toxicity to aquatic organisms.",
        "Persistence and degradability": "Inorganic substance - not biodegradable.",
        "Bio-accumulative potential": "Not expected to bioaccumulate.",
        "Mobility in soil": "Low mobility due to particle size.",
        "Results of PBT and vPvB assessment": "Not applicable.",
        "Other adverse effects": "None known.",
      },
      disposal: {
        "Waste treatment methods":
          "Dispose of in accordance with local, state, and federal regulations. May be disposed of in a licensed landfill.",
      },
      transport: {
        "UN number": "Not regulated for transport.",
        "UN proper shipping name": "Not applicable.",
        "Transport hazard class(es)": "Not applicable.",
        "Packing group": "Not applicable.",
        "Environmental hazards": "Not an environmental hazard for transport.",
        "Special precautions for the user": "Ensure proper packaging to prevent dust generation.",
        "Transport in bulk according to Annex II of MARPOL73/78 and the IBC Code": "Not applicable.",
      },
      regulatory: {
        "Safety, health and environmental regulations/legislation specific for the substance or mixture":
          "OSHA Hazard Communication Standard (29 CFR 1910.1200)\nTSCA Inventory: Listed\nEU REACH: Pre-registered",
        "Chemical safety assessment": "A chemical safety assessment has not been carried out.",
      },
      other: {
        "Date of preparation or last revision": `Revision Date: ${sdsDocument.sdsReviewDate}\nPrepared by: OILSERV HSE Department`,
        "Sources of key data used to compile the data sheet":
          "Internal testing data, supplier information, regulatory databases.",
        "Other information": "This SDS is prepared in accordance with OSHA HazCom 2012 and GHS Rev. 7.",
      },
    }
    return sampleData[sectionKey]?.[subsectionTitle] || `Information for ${subsectionTitle}`
  }

  const renderSectionContent = (section: (typeof sections)[0]) => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {section.subsections.map((subsection, index) => (
          <div key={index} className={index > 0 ? "border-t border-gray-200" : ""}>
            <div className="px-6 py-4 bg-gray-50">
              <h4 className="text-sm font-semibold text-gray-700">{subsection}</h4>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-600 whitespace-pre-line">{getSampleContent(section.key, subsection)}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const generateProfessionalPDF = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    const qrLandingUrl = `${baseUrl}/qr-landing/${params.id}`
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrLandingUrl)}`

    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const pdfSections = sections.map((s) => ({
      key: s.key,
      title: s.title,
      subsections: s.subsections,
    }))

    const sectionsHTML = pdfSections
      .map((section, index) => {
        const subsectionsHTML = section.subsections
          .map((subsection, subIndex) => {
            const content = getSampleContent(section.key, subsection)
            return `
            <div class="subsection">
              <h4>${index + 1}.${subIndex + 1} ${subsection}</h4>
              <p>${content.replace(/\n/g, "<br/>")}</p>
            </div>
          `
          })
          .join("")

        return `
          <div class="section">
            <h3>${section.title}</h3>
            ${subsectionsHTML}
          </div>
        `
      })
      .join("")

    const pictogramCodes = sdsDocument.ghsPictograms || []
    const pictogramsHTML = pictogramCodes
      .map(
        (code) => `
        <div class="pictogram">
          <img src="https://www.mysds.co.za/images/ghs/${code.toLowerCase()}.png" alt="${code}" />
          <span>${code}</span>
        </div>
      `,
      )
      .join("")

    const pdfContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>SDS - ${sdsDocument.productName}</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Inter', sans-serif; font-size: 11px; line-height: 1.5; color: #1f2937; padding: 20px; }
            .container { max-width: 800px; margin: 0 auto; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 15px; border-bottom: 3px solid #f97316; margin-bottom: 20px; }
            .header-left { display: flex; align-items: center; gap: 15px; }
            .logo { font-size: 28px; font-weight: 700; color: #f97316; }
            .header-info h1 { font-size: 20px; font-weight: 700; color: #111827; }
            .header-info p { font-size: 10px; color: #6b7280; margin-top: 2px; }
            .header-right { text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 5px; }
            .qr-code { width: 80px; height: 80px; }
            .qr-label { font-size: 8px; color: #6b7280; }
            .pictograms { display: flex; gap: 10px; margin: 15px 0; flex-wrap: wrap; }
            .pictogram { display: flex; flex-direction: column; align-items: center; }
            .pictogram img { width: 50px; height: 50px; }
            .pictogram span { font-size: 8px; color: #6b7280; margin-top: 2px; }
            .product-info { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px; padding: 15px; background: #fff7ed; border-radius: 6px; border: 1px solid #fed7aa; }
            .info-item { }
            .info-label { font-size: 9px; color: #6b7280; display: block; }
            .info-value { font-size: 11px; font-weight: 700; color: #111827; }
            .section { margin-bottom: 15px; page-break-inside: avoid; }
            .section h3 { font-size: 13px; font-weight: 700; color: #c2410c; padding: 8px 12px; background: #fff7ed; border-left: 4px solid #f97316; margin-bottom: 10px; }
            .subsection { margin-bottom: 10px; padding-left: 12px; }
            .subsection h4 { font-size: 10px; font-weight: 600; color: #374151; margin-bottom: 4px; }
            .subsection p { font-size: 10px; color: #4b5563; }
            .footer { margin-top: 30px; padding-top: 15px; border-top: 2px solid #f97316; display: flex; justify-content: space-between; font-size: 9px; color: #6b7280; }
            @media print { body { padding: 10px; } .section { page-break-inside: avoid; } }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="header-left">
                <div class="logo">OILSERV</div>
                <div class="header-info">
                  <h1 style="font-weight: 700;">${sdsDocument.productName}</h1>
                  <p>Safety Data Sheet - OSHA HazCom 2012 / GHS Rev. 7 Compliant</p>
                </div>
              </div>
              <div class="header-right">
                <img src="${qrCodeUrl}" class="qr-code" alt="QR Code" />
                <span class="qr-label">Scan for Label & SDS</span>
              </div>
            </div>
            
            ${pictogramCodes.length > 0 ? `<div class="pictograms">${pictogramsHTML}</div>` : ""}
            
            <div class="product-info">
              <div class="info-item">
                <span class="info-label">Product Name</span>
                <span class="info-value">${sdsDocument.productName}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Chemical Name</span>
                <span class="info-value">${sdsDocument.chemicalName}</span>
              </div>
              <div class="info-item">
                <span class="info-label">CAS Number</span>
                <span class="info-value">${sdsDocument.casNumber}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Product Code</span>
                <span class="info-value">${sdsDocument.oilservCode}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Batch Number</span>
                <span class="info-value">${sdsDocument.batchNumber}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Location</span>
                <span class="info-value">${sdsDocument.location}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Manufacturing Date</span>
                <span class="info-value">${sdsDocument.manufacturingDate}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Review Date</span>
                <span class="info-value">${sdsDocument.sdsReviewDate}</span>
              </div>
            </div>
            
            ${sectionsHTML}
            
            <footer class="footer">
              <div class="footer-left">Generated by SDS Management System</div>
              <div class="footer-right">Page 1</div>
            </footer>
          </div>
          
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `

    printWindow.document.write(pdfContent)
    printWindow.document.close()
  }

  const handleModifyClick = (reason: string) => {
    sessionStorage.setItem("sdsModificationReason", reason)
    router.push(`/add-product/form?edit=${params.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="w-80 bg-white border-r border-gray-200 h-screen sticky top-0">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">SDS Details</h1>
                <p className="text-sm text-gray-600">{sdsDocument.productName}</p>
              </div>
            </div>

            {/* Status and Actions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    sdsDocument.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : sdsDocument.status === "Under Review"
                        ? "bg-yellow-100 text-yellow-800"
                        : sdsDocument.status === "Expired"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {sdsDocument.status}
                </span>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={generateProfessionalPDF}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>

              <Button
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => setShowModificationDialog(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Modify SDS
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">SDS Sections</h3>
              <div className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.key}
                    onClick={() => scrollToSection(section.key)}
                    className={`w-full text-left px-3 py-3 rounded-lg text-sm transition-colors ${
                      activeSection === section.key
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-blue-600">{section.icon}</div>
                      <div>
                        <div className="font-medium text-gray-900 leading-tight">{section.title.split(".")[0]}.</div>
                        <div className="text-xs text-gray-500 mt-1 leading-tight">
                          {section.title.split(".")[1]?.trim()}
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          {section.subsections.length} subsection{section.subsections.length > 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>

        <div className="flex-1">
          {/* Product Header */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="max-w-4xl">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{sdsDocument.productName}</h1>
              <p className="text-lg text-gray-600 mb-4">{sdsDocument.chemicalName}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="text-gray-500">CAS Number:</span>
                    <p className="font-mono font-medium">{sdsDocument.casNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="text-gray-500">Product Code:</span>
                    <p className="font-mono font-medium">{sdsDocument.oilservCode}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="text-gray-500">Location:</span>
                    <p className="font-medium">{sdsDocument.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="text-gray-500">Review Date:</span>
                    <p className="font-medium">{sdsDocument.sdsReviewDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="p-6 max-w-4xl">
              <div className="space-y-8">
                {sections.map((section) => (
                  <div
                    key={section.key}
                    id={section.key}
                    ref={(el) => {
                      sectionRefs.current[section.key] = el
                    }}
                    className="scroll-mt-4"
                  >
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{section.icon}</div>
                        <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                      </div>
                    </div>
                    {renderSectionContent(section)}
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      <ModificationReasonDialog
        isOpen={showModificationDialog}
        itemName={sdsDocument.productName}
        onConfirm={handleModifyClick}
        onCancel={() => setShowModificationDialog(false)}
      />
    </div>
  )
}
