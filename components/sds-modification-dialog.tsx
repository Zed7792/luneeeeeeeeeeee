"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Edit2, AlertCircle } from 'lucide-react'
import { saveModificationHistory, saveModificationDraft, getModificationDraft, clearModificationDraft } from "@/lib/modification-utils"
import { useRouter } from 'next/navigation'

interface SDSModificationDialogProps {
  sdsId: string
  sdsData: any
  onModificationStart?: () => void
}

export default function SDSModificationDialog({ sdsId, sdsData, onModificationStart }: SDSModificationDialogProps) {
  const [open, setOpen] = useState(false)
  const [reasonForModification, setReasonForModification] = useState("")
  const router = useRouter()

  const handleStartModification = () => {
    if (!reasonForModification.trim()) {
      alert("Please provide a reason for modification")
      return
    }

    const modificationContext = {
      sdsId,
      originalData: sdsData,
      reasonForModification,
      startTime: new Date().toISOString(),
    }
    
    localStorage.setItem(`sds-modification-context-${sdsId}`, JSON.stringify(modificationContext))
    saveModificationDraft('sds', sdsId, { ...sdsData })
    
    setOpen(false)
    onModificationStart?.()
    
    // Redirect to modification page
    router.push(`/sds-library/${sdsId}/modify`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Edit2 className="h-4 w-4" />
          Modify SDS
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Modify SDS Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Important</p>
              <p>Modified SDS details will go through the same approval process as new submissions. All changes will be tracked for audit purposes.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Modification *</Label>
            <Textarea
              id="reason"
              placeholder="Explain why you are modifying this SDS (e.g., updated hazard information, supplier change, regulatory update)"
              value={reasonForModification}
              onChange={(e) => setReasonForModification(e.target.value)}
              className="min-h-24"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-900">
              <span className="font-medium">SDS ID:</span> {sdsId}
            </p>
            <p className="text-sm text-blue-900">
              <span className="font-medium">Product:</span> {sdsData?.productName || "Unknown"}
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleStartModification} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Continue to Edit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
