"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import Link from "next/link"

interface ModificationRecord {
  id: string
  itemId: string
  itemType: "sds" | "label"
  modificationDate: string
  modifiedBy: string
  reasonForModification: string
  status: "pending" | "approved" | "rejected"
  version: number
}

interface ModificationHistoryPanelProps {
  itemId?: string
  itemType?: "sds" | "label"
}

export default function ModificationHistoryPanel({
  itemId,
  itemType,
}: ModificationHistoryPanelProps) {
  const [modifications, setModifications] = useState<ModificationRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadModifications = () => {
      try {
        const history = JSON.parse(localStorage.getItem("modification-history") || "[]")
        let filtered = history

        if (itemId && itemType) {
          filtered = history.filter(
            (mod: ModificationRecord) => mod.itemId === itemId && mod.itemType === itemType
          )
        }

        setModifications(filtered.slice(0, 5)) // Show last 5
      } catch (error) {
        console.error("Error loading modifications:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadModifications()
  }, [itemId, itemType])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  if (isLoading) {
    return <div className="text-sm text-gray-600">Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-base">Modification History</CardTitle>
          </div>
          <Link href="/modifications">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {modifications.length === 0 ? (
          <div className="text-sm text-gray-600 text-center py-4">
            No modifications found
          </div>
        ) : (
          <div className="space-y-3">
            {modifications.map((mod) => (
              <div
                key={mod.id}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(mod.status)}
                      <Badge variant="outline" className="capitalize text-xs">
                        {mod.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-900 font-medium truncate">
                      {mod.reasonForModification}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {new Date(mod.modificationDate).toLocaleDateString()} • {mod.modifiedBy}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
