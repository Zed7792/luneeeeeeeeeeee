"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { CHEMICALS, getCompatibilityInfo, type CompatibilityLevel } from "@/lib/compatibility-matrix"

const compatibilityColors: Record<CompatibilityLevel, { bg: string; text: string; border: string; icon: string }> = {
  safe: { bg: "bg-green-50", text: "text-green-900", border: "border-green-300", icon: "🟢" },
  caution: { bg: "bg-yellow-50", text: "text-yellow-900", border: "border-yellow-300", icon: "🟡" },
  incompatible: { bg: "bg-red-50", text: "text-red-900", border: "border-red-300", icon: "🔴" },
  unknown: { bg: "bg-gray-50", text: "text-gray-900", border: "border-gray-300", icon: "⚪" },
}

export function CompatibilityChecker() {
  const [selectedChemical1, setSelectedChemical1] = useState<string>("")
  const [selectedChemical2, setSelectedChemical2] = useState<string>("")
  const [showResult, setShowResult] = useState(false)

  const compatibilityInfo = useMemo(() => {
    if (!selectedChemical1 || !selectedChemical2) return null
    return getCompatibilityInfo(selectedChemical1, selectedChemical2)
  }, [selectedChemical1, selectedChemical2])

  const handleCheck = () => {
    if (selectedChemical1 && selectedChemical2) {
      setShowResult(true)
    }
  }

  const colors = compatibilityInfo ? compatibilityColors[compatibilityInfo.level] : compatibilityColors.unknown

  return (
    <div className="space-y-6">
      <Card className="border-2 border-gray-200 bg-gradient-to-r from-white to-gray-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-gray-900">Compatibility Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🟢</span>
              <div>
                <p className="font-semibold text-green-900">Safe</p>
                <p className="text-xs text-green-700">Can store together</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🟡</span>
              <div>
                <p className="font-semibold text-yellow-900">Caution</p>
                <p className="text-xs text-yellow-700">Special conditions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔴</span>
              <div>
                <p className="font-semibold text-red-900">Incompatible</p>
                <p className="text-xs text-red-700">Never store together</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚪</span>
              <div>
                <p className="font-semibold text-gray-900">Unknown</p>
                <p className="text-xs text-gray-700">Data unavailable</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-gray-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900">Check Compatibility</CardTitle>
          <p className="text-sm text-gray-600 mt-1">Select two chemicals to check their compatibility</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Product A</label>
              <Select value={selectedChemical1} onValueChange={setSelectedChemical1}>
                <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                  <SelectValue placeholder="Select chemical" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  {CHEMICALS.map((chem) => (
                    <SelectItem key={chem} value={chem} className="text-gray-900">
                      {chem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Product B</label>
              <Select value={selectedChemical2} onValueChange={setSelectedChemical2}>
                <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                  <SelectValue placeholder="Select chemical" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  {CHEMICALS.map((chem) => (
                    <SelectItem key={chem} value={chem} className="text-gray-900">
                      {chem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleCheck}
            disabled={!selectedChemical1 || !selectedChemical2}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
          >
            Check Compatibility
          </Button>
        </CardContent>
      </Card>

      {showResult && compatibilityInfo && (
        <Card className={`border-2 ${colors.border} ${colors.bg}`}>
          <CardHeader className="pb-3">
            <div className="flex items-start gap-3">
              <span className="text-3xl">{colors.icon}</span>
              <div className="flex-1">
                <h3 className={`text-2xl font-bold ${colors.text}`}>
                  {compatibilityInfo.level === "safe"
                    ? `✓ Safe to Store Together`
                    : compatibilityInfo.level === "caution"
                      ? `⚠ Caution Required`
                      : compatibilityInfo.level === "incompatible"
                        ? `✗ Do Not Store Together`
                        : `? Unknown Compatibility`}
                </h3>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white bg-opacity-60 rounded-lg p-4">
              <p className={`text-sm font-semibold ${colors.text} mb-2`}>Compatibility Status</p>
              <p className="text-gray-800">
                {selectedChemical1} <span className="font-bold">×</span> {selectedChemical2}
              </p>
            </div>

            <div className="bg-white bg-opacity-60 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">Details</p>
              <p className="text-gray-800 leading-relaxed">{compatibilityInfo.reason}</p>
            </div>

            <div className="bg-white bg-opacity-60 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Storage Recommendations
              </p>
              <ul className="space-y-2">
                {compatibilityInfo.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm text-gray-800 flex items-start gap-2">
                    <span className="font-bold text-blue-600">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
