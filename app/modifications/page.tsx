"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Clock, ArrowLeft, Eye, History } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ModificationRecord {
  id: string
  itemId: string
  itemType: "sds" | "label"
  modificationDate: string
  modifiedBy: string
  reasonForModification: string
  previousValues: Record<string, any>
  newValues: Record<string, any>
  status: "pending" | "approved" | "rejected"
  version: number
  rejectionReason?: string
}

export default function ModificationsPage() {
  const router = useRouter()
  const [modifications, setModifications] = useState<ModificationRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const [selectedMod, setSelectedMod] = useState<ModificationRecord | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  useEffect(() => {
    const loadModifications = () => {
      try {
        const history = JSON.parse(localStorage.getItem("modification-history") || "[]")
        setModifications(history)
      } catch (error) {
        console.error("Error loading modifications:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadModifications()
  }, [])

  const handleApproveModification = (modId: string) => {
    const updated = modifications.map((mod) =>
      mod.id === modId ? { ...mod, status: "approved" as const } : mod
    )
    setModifications(updated)
    localStorage.setItem("modification-history", JSON.stringify(updated))

    const mod = modifications.find((m) => m.id === modId)
    if (mod) {
      if (mod.itemType === "sds") {
        const sdsEntries = JSON.parse(localStorage.getItem("sdsEntries") || "[]")
        const updatedEntries = sdsEntries.map((entry: any) =>
          entry.id === mod.itemId ? { ...entry, ...mod.newValues } : entry
        )
        localStorage.setItem("sdsEntries", JSON.stringify(updatedEntries))
      } else if (mod.itemType === "label") {
        const allLabels = JSON.parse(localStorage.getItem("ghsLabels") || "[]")
        const updatedLabels = allLabels.map((label: any) =>
          label.id === mod.itemId ? { ...label, ...mod.newValues } : label
        )
        localStorage.setItem("ghsLabels", JSON.stringify(updatedLabels))
      }
    }

    alert("Modification approved successfully!")
    setSelectedMod(null)
  }

  const handleRejectModification = (modId: string) => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection")
      return
    }

    const updated = modifications.map((mod) =>
      mod.id === modId
        ? { ...mod, status: "rejected" as const, rejectionReason }
        : mod
    )
    setModifications(updated)
    localStorage.setItem("modification-history", JSON.stringify(updated))

    alert("Modification rejected successfully!")
    setSelectedMod(null)
    setRejectionReason("")
  }

  const filteredMods = modifications.filter((mod) =>
    filterStatus === "all" ? true : mod.status === filterStatus
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading modifications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
          <div className="flex items-center gap-2">
            <History className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Modification Approvals</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Modifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{modifications.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {modifications.filter((m) => m.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {modifications.filter((m) => m.status === "approved").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {modifications.filter((m) => m.status === "rejected").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
            className={filterStatus === "all" ? "bg-blue-600" : ""}
          >
            All
          </Button>
          <Button
            variant={filterStatus === "pending" ? "default" : "outline"}
            onClick={() => setFilterStatus("pending")}
            className={filterStatus === "pending" ? "bg-yellow-600" : ""}
          >
            Pending
          </Button>
          <Button
            variant={filterStatus === "approved" ? "default" : "outline"}
            onClick={() => setFilterStatus("approved")}
            className={filterStatus === "approved" ? "bg-green-600" : ""}
          >
            Approved
          </Button>
          <Button
            variant={filterStatus === "rejected" ? "default" : "outline"}
            onClick={() => setFilterStatus("rejected")}
            className={filterStatus === "rejected" ? "bg-red-600" : ""}
          >
            Rejected
          </Button>
        </div>

        {/* Modifications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Modifications History</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredMods.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No modifications to display</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Item</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Reason</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Modified By</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Date</th>
                      <th className="text-center py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMods.map((mod) => (
                      <tr key={mod.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{mod.itemId}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          <Badge variant="outline" className="capitalize">
                            {mod.itemType}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">
                          {mod.reasonForModification}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{mod.modifiedBy}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(mod.modificationDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {getStatusIcon(mod.status)}
                            <Badge className={getStatusColor(mod.status)} variant="outline">
                              {mod.status.charAt(0).toUpperCase() + mod.status.slice(1)}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Dialog open={selectedMod?.id === mod.id} onOpenChange={(open) => !open && setSelectedMod(null)}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedMod(mod)}
                                className="flex items-center gap-2"
                              >
                                <Eye className="h-4 w-4" />
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Review Modification</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                {/* Modification Details */}
                                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <span className="text-sm font-semibold text-gray-700">Item ID:</span>
                                      <p className="text-sm text-gray-600">{mod.itemId}</p>
                                    </div>
                                    <div>
                                      <span className="text-sm font-semibold text-gray-700">Type:</span>
                                      <p className="text-sm text-gray-600 capitalize">{mod.itemType}</p>
                                    </div>
                                    <div>
                                      <span className="text-sm font-semibold text-gray-700">Modified By:</span>
                                      <p className="text-sm text-gray-600">{mod.modifiedBy}</p>
                                    </div>
                                    <div>
                                      <span className="text-sm font-semibold text-gray-700">Date:</span>
                                      <p className="text-sm text-gray-600">
                                        {new Date(mod.modificationDate).toLocaleString()}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <span className="text-sm font-semibold text-gray-700">Reason for Modification:</span>
                                    <p className="text-sm text-gray-600 mt-1 p-2 bg-white rounded border border-gray-200">
                                      {mod.reasonForModification}
                                    </p>
                                  </div>
                                </div>

                                {/* Changes Preview */}
                                <div className="space-y-3">
                                  <h4 className="font-semibold text-gray-900">Changes Made:</h4>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="border border-red-200 rounded-lg p-3 bg-red-50">
                                      <h5 className="text-xs font-semibold text-red-900 mb-2">Previous Values:</h5>
                                      <div className="text-xs text-red-800 space-y-1 max-h-32 overflow-y-auto">
                                        {Object.entries(mod.previousValues).map(([key, value]) => (
                                          <div key={key}>
                                            <span className="font-medium">{key}:</span> {String(value)}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="border border-green-200 rounded-lg p-3 bg-green-50">
                                      <h5 className="text-xs font-semibold text-green-900 mb-2">New Values:</h5>
                                      <div className="text-xs text-green-800 space-y-1 max-h-32 overflow-y-auto">
                                        {Object.entries(mod.newValues).map(([key, value]) => (
                                          <div key={key}>
                                            <span className="font-medium">{key}:</span> {String(value)}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Rejection Reason (if rejected) */}
                                {mod.status === "rejected" && mod.rejectionReason && (
                                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                    <h5 className="text-sm font-semibold text-red-900 mb-2">Rejection Reason:</h5>
                                    <p className="text-sm text-red-800">{mod.rejectionReason}</p>
                                  </div>
                                )}

                                {/* Action Buttons */}
                                {mod.status === "pending" && (
                                  <div className="space-y-3">
                                    <div>
                                      <label className="text-sm font-semibold text-gray-700 block mb-2">
                                        Rejection Reason (if rejecting)
                                      </label>
                                      <Textarea
                                        placeholder="Enter reason for rejection (optional)"
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                        rows={3}
                                      />
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                      <Button
                                        variant="outline"
                                        onClick={() => handleRejectModification(mod.id)}
                                        className="border-red-300 text-red-600 hover:bg-red-50"
                                      >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Reject
                                      </Button>
                                      <Button
                                        onClick={() => handleApproveModification(mod.id)}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Approve
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
