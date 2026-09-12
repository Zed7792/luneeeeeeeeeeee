"use client"

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, X } from 'lucide-react'
import { getModificationDraft, saveModificationDraft, clearModificationDraft } from "@/lib/modification-utils"

export default function LabelModifyPage() {
  const params = useParams()
  const router = useRouter()
  const labelId = String(params.id)

  const [modificationContext, setModificationContext] = useState<any>(null)
  const [formData, setFormData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const context = localStorage.getItem(`label-modification-context-${labelId}`)
    const draft = getModificationDraft('label', labelId)

    if (!context) {
      router.back()
      return
    }

    setModificationContext(JSON.parse(context))
    setFormData(draft || JSON.parse(context).originalData)
    setIsLoading(false)
  }, [labelId, router])

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveDraft = () => {
    saveModificationDraft('label', labelId, formData)
    alert("Draft saved successfully!")
  }

  const handleSubmitModification = async () => {
    setIsSaving(true)

    try {
      const modificationRecord = {
        itemId: labelId,
        itemType: 'label' as const,
        modificationDate: new Date().toISOString(),
        modifiedBy: "Current User",
        reasonForModification: modificationContext.reasonForModification,
        previousValues: modificationContext.originalData,
        newValues: formData,
        status: 'pending' as const,
        version: 1,
      }

      const history = JSON.parse(localStorage.getItem('modification-history') || '[]')
      history.push({
        ...modificationRecord,
        id: `mod-${Date.now()}`,
      })
      localStorage.setItem('modification-history', JSON.stringify(history))

      clearModificationDraft('label', labelId)
      localStorage.removeItem(`label-modification-context-${labelId}`)

      alert("Label modification submitted for approval!")
      router.push("/labels")
    } catch (error) {
      console.error("Error submitting modification:", error)
      alert("Error submitting modification")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading || !formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading label for modification...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Modify Label Details</h1>
            <p className="text-sm text-gray-600">Product: {formData.productName}</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Modification Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-900 mb-2">Reason for Modification:</h3>
              <p className="text-sm text-amber-800">{modificationContext?.reasonForModification}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Edit Label Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Product Name</Label>
                <Input
                  value={formData.productName || ""}
                  onChange={(e) => handleFieldChange("productName", e.target.value)}
                />
              </div>
              <div>
                <Label>Chemical Name</Label>
                <Input
                  value={formData.chemicalName || ""}
                  onChange={(e) => handleFieldChange("chemicalName", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>CAS Number</Label>
                <Input
                  value={formData.identifierNumber || ""}
                  onChange={(e) => handleFieldChange("identifierNumber", e.target.value)}
                />
              </div>
              <div>
                <Label>Signal Word</Label>
                <Input
                  value={formData.signalWord || ""}
                  onChange={(e) => handleFieldChange("signalWord", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Supplier</Label>
              <Input
                value={formData.supplier || ""}
                onChange={(e) => handleFieldChange("supplier", e.target.value)}
              />
            </div>

            <div>
              <Label>Additional Info</Label>
              <Textarea
                value={formData.additionalInfo || ""}
                onChange={(e) => handleFieldChange("additionalInfo", e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Discard Changes
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button
            onClick={handleSubmitModification}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Submitting..." : "Submit for Approval"}
          </Button>
        </div>
      </div>
    </div>
  )
}
