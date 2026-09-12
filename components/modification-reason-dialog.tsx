"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ModificationReasonDialogProps {
  isOpen: boolean
  itemName: string
  onConfirm: (reason: string) => void
  onCancel: () => void
}

export function ModificationReasonDialog({
  isOpen,
  itemName,
  onConfirm,
  onCancel,
}: ModificationReasonDialogProps) {
  const [reason, setReason] = useState("")

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason)
      setReason("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modification Reason</DialogTitle>
          <DialogDescription>
            Please provide a reason for modifying <strong>{itemName}</strong>. This will be recorded in the approval workflow.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Modification</Label>
            <Textarea
              id="reason"
              placeholder="Explain why you are modifying this item (e.g., updated supplier information, new safety data, correcting errors, etc.)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-24 resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Continue with Modification
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ModificationReasonDialog
