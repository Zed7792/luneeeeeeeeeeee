"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, ArrowLeft, AlertCircle, Tag } from "lucide-react"
import Image from "next/image"

// GHS Hazard images
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

// Static SDS documents for reference
const staticSdsDocuments = [
  { id: "cenospheres-all-grades", productName: "Cenospheres, All Grades", casNumber: "66402-68-4", hazards: ["GHS07"] },
  {
    id: "norcem-portland-cements",
    productName: "Norcem Portland Cements",
    casNumber: "65997-15-1",
    hazards: ["GHS05", "GHS07"],
  },
  { id: "silica-gel-grade-60", productName: "Silica gel, grade 60", casNumber: "7631-86-9", hazards: ["GHS07"] },
  { id: "liquid-nitrogen-ln2", productName: "Liquid Nitrogen (LN2)", casNumber: "7727-37-9", hazards: ["GHS04"] },
  { id: "xylenes", productName: "Xylenes", casNumber: "1330-20-7", hazards: ["GHS02", "GHS07", "GHS08"] },
  {
    id: "ammonium-chloride-nh4cl",
    productName: "Ammonium chloride (NH4CL)",
    casNumber: "12125-02-9",
    hazards: ["GHS07"],
  },
  { id: "potassium-chloride-kcl", productName: "Potassium chloride (KCL)", casNumber: "7447-40-7", hazards: [] },
  { id: "biocide", productName: "Biocide", casNumber: "111-30-8", hazards: ["GHS05", "GHS06", "GHS08", "GHS09"] },
  { id: "sodium-chloride-nacl", productName: "Sodium chloride (Nacl)", casNumber: "7647-14-5", hazards: [] },
  { id: "hydrochloric-acid", productName: "Hydrochloric acid", casNumber: "7647-01-0", hazards: ["GHS05", "GHS07"] },
]

export default function QRLandingPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const findProduct = () => {
      const id = params.id as string

      // First check static documents
      let foundDoc = staticSdsDocuments.find((doc) => doc.id === id)

      if (!foundDoc) {
        // Check user entries from localStorage
        try {
          const userEntries = JSON.parse(localStorage.getItem("sdsEntries") || "[]")
          foundDoc = userEntries.find((doc: any) => doc.id === id)
        } catch (e) {
          console.error("Error loading user entries:", e)
        }
      }

      if (foundDoc) {
        setProduct(foundDoc)
      }
      setIsLoading(false)
    }

    findProduct()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product information...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h2>
            <p className="text-gray-600 mb-4">The requested product information could not be found.</p>
            <Button onClick={() => router.push("/sds-library")} className="bg-orange-600 hover:bg-orange-700">
              Go to SDS Library
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-orange-500 font-extrabold text-2xl">OILSERV</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600 font-medium">Chemical Safety Portal</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Product Header Card */}
        <Card className="mb-6 border-l-4 border-l-orange-500">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">{product.productName}</CardTitle>
                <p className="text-gray-600 mt-1">CAS Number: {product.casNumber || "N/A"}</p>
              </div>
              {product.hazards?.length > 0 && (
                <div className="flex gap-2">
                  {product.hazards.slice(0, 4).map((code: string) => (
                    <Image
                      key={code}
                      src={ghsImages[code] || "/placeholder.svg"}
                      alt={code}
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                  ))}
                </div>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* View Label Card */}
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => router.push(`/labels`)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Tag className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">View Chemical Label</h3>
                  <p className="text-sm text-gray-600">GHS compliant label with hazard information</p>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Tag className="h-4 w-4 mr-2" />
                Open Label
              </Button>
            </CardContent>
          </Card>

          {/* Open SDS Card */}
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => router.push(`/sds-library/${product.id}`)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <FileText className="h-7 w-7 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Open SDS PDF</h3>
                  <p className="text-sm text-gray-600">Full Safety Data Sheet with all 16 sections</p>
                </div>
              </div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                <Download className="h-4 w-4 mr-2" />
                View SDS Document
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Safety Notice */}
        <Card className="mt-6 bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">Safety Notice</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Always refer to the complete Safety Data Sheet (SDS) before handling this chemical. Ensure proper
                  personal protective equipment (PPE) is used as specified in Section 8 of the SDS.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>OILSERV Chemical Safety Management System</p>
          <p className="mt-1">For emergencies, contact: +234-1-234-5678</p>
        </div>
      </main>
    </div>
  )
}
