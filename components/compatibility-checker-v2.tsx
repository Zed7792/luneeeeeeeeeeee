"use client"

import { useState } from "react"
import { ExternalLink, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { CHEMICAL_DATABASE, type Chemical, searchChemicals } from "@/lib/chemical-database"
import { checkCompatibility, type CompatibilityResult } from "@/lib/compatibility-logic"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CompatibilityCheckerV2() {
  const [chemicalA, setChemicalA] = useState<Chemical | null>(null)
  const [chemicalB, setChemicalB] = useState<Chemical | null>(null)
  const [searchA, setSearchA] = useState("")
  const [searchB, setSearchB] = useState("")
  const [showDropdownA, setShowDropdownA] = useState(false)
  const [showDropdownB, setShowDropdownB] = useState(false)
  const [result, setResult] = useState<CompatibilityResult | null>(null)
  const [comparisonHistory, setComparisonHistory] = useState<
    Array<{ chemA: Chemical; chemB: Chemical; result: CompatibilityResult }>
  >([])

  const filteredChemicalsA = searchA ? searchChemicals(searchA) : CHEMICAL_DATABASE
  const filteredChemicalsB = searchB ? searchChemicals(searchB) : CHEMICAL_DATABASE

  const handleSelectChemical = (chem: Chemical, position: "A" | "B") => {
    if (position === "A") {
      setChemicalA(chem)
      setSearchA("")
      setShowDropdownA(false)
    } else {
      setChemicalB(chem)
      setSearchB("")
      setShowDropdownB(false)
    }
  }

  const handleCheckCompatibility = () => {
    if (chemicalA && chemicalB) {
      if (chemicalA.id === chemicalB.id) {
        alert("Please select two different chemicals")
        return
      }
      const compatResult = checkCompatibility(chemicalA, chemicalB)
      setResult(compatResult)
      setComparisonHistory([{ chemA: chemicalA, chemB: chemicalB, result: compatResult }, ...comparisonHistory])
    }
  }

  const getResultColor = (level: string) => {
    switch (level) {
      case "compatible":
        return "bg-green-50 border-green-300"
      case "limited":
        return "bg-yellow-50 border-yellow-300"
      case "incompatible":
        return "bg-red-50 border-red-300"
      default:
        return "bg-gray-50 border-gray-300"
    }
  }

  const getResultIcon = (level: string) => {
    switch (level) {
      case "compatible":
        return <CheckCircle className="w-6 h-6 text-green-600" />
      case "limited":
        return <AlertTriangle className="w-6 h-6 text-yellow-600" />
      case "incompatible":
        return <XCircle className="w-6 h-6 text-red-600" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Chemical Selection Panel */}
      <Card className="border-2 border-gray-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-lg font-semibold text-gray-800">Select Chemicals to Compare</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chemical A Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Chemical A</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or CAS number..."
                  value={searchA}
                  onChange={(e) => {
                    setSearchA(e.target.value)
                    setShowDropdownA(true)
                  }}
                  onFocus={() => setShowDropdownA(true)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {chemicalA && (
                  <button
                    onClick={() => {
                      setChemicalA(null)
                      setSearchA("")
                    }}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
                {showDropdownA && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {filteredChemicalsA.length > 0 ? (
                      filteredChemicalsA.map((chem) => (
                        <button
                          key={chem.id}
                          onClick={() => handleSelectChemical(chem, "A")}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-semibold text-gray-900">{chem.name}</div>
                          <div className="text-xs text-gray-600">CAS: {chem.casNumber}</div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500">No chemicals found</div>
                    )}
                  </div>
                )}
              </div>
              {chemicalA && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200 space-y-1">
                  <div className="font-semibold text-sm text-blue-900">{chemicalA.name}</div>
                  <div className="text-xs text-blue-700">CAS: {chemicalA.casNumber}</div>
                  <div className="text-xs text-blue-700">Storage: {chemicalA.storageGroup}</div>
                  <div className="text-xs text-blue-700">GHS: {chemicalA.hazardClasses.join(", ")}</div>
                </div>
              )}
            </div>

            {/* Chemical B Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Chemical B</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or CAS number..."
                  value={searchB}
                  onChange={(e) => {
                    setSearchB(e.target.value)
                    setShowDropdownB(true)
                  }}
                  onFocus={() => setShowDropdownB(true)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {chemicalB && (
                  <button
                    onClick={() => {
                      setChemicalB(null)
                      setSearchB("")
                    }}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
                {showDropdownB && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {filteredChemicalsB.length > 0 ? (
                      filteredChemicalsB.map((chem) => (
                        <button
                          key={chem.id}
                          onClick={() => handleSelectChemical(chem, "B")}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-semibold text-gray-900">{chem.name}</div>
                          <div className="text-xs text-gray-600">CAS: {chem.casNumber}</div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500">No chemicals found</div>
                    )}
                  </div>
                )}
              </div>
              {chemicalB && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200 space-y-1">
                  <div className="font-semibold text-sm text-blue-900">{chemicalB.name}</div>
                  <div className="text-xs text-blue-700">CAS: {chemicalB.casNumber}</div>
                  <div className="text-xs text-blue-700">Storage: {chemicalB.storageGroup}</div>
                  <div className="text-xs text-blue-700">GHS: {chemicalB.hazardClasses.join(", ")}</div>
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={handleCheckCompatibility}
            disabled={!chemicalA || !chemicalB}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
          >
            Check Compatibility
          </Button>
        </CardContent>
      </Card>

      {/* Compatibility Result */}
      {result && chemicalA && chemicalB && (
        <Card className={`border-2 ${getResultColor(result.level)}`}>
          <CardHeader className="bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getResultIcon(result.level)}
                <div>
                  <CardTitle className="text-xl">{result.badge}</CardTitle>
                  <p className="text-sm text-gray-600">
                    {chemicalA.name} + {chemicalB.name}
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(result.riskLevel)}`}>
                {result.riskLevel.toUpperCase()} RISK
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Reason Explanation */}
            {result.reasons.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Reason Explanation</h3>
                <ul className="space-y-2">
                  {result.reasons.map((reason, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {result.recommendations.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Storage Recommendations</h3>
                <ul className="space-y-2 bg-gray-50 p-4 rounded-lg">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-gray-700">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Chemical Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">{chemicalA.name}</h4>
                <div className="space-y-1 text-xs text-gray-700">
                  <div>CAS: {chemicalA.casNumber}</div>
                  <div>Storage: {chemicalA.storageGroup}</div>
                  {chemicalA.pH !== undefined && <div>pH: {chemicalA.pH}</div>}
                  {chemicalA.flashPoint !== undefined && chemicalA.flashPoint !== null && (
                    <div>Flash Point: {chemicalA.flashPoint}°C</div>
                  )}
                  <a href={chemicalA.sdsUrl} className="text-blue-600 hover:underline flex items-center gap-1 mt-2">
                    View SDS <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">{chemicalB.name}</h4>
                <div className="space-y-1 text-xs text-gray-700">
                  <div>CAS: {chemicalB.casNumber}</div>
                  <div>Storage: {chemicalB.storageGroup}</div>
                  {chemicalB.pH !== undefined && <div>pH: {chemicalB.pH}</div>}
                  {chemicalB.flashPoint !== undefined && chemicalB.flashPoint !== null && (
                    <div>Flash Point: {chemicalB.flashPoint}°C</div>
                  )}
                  <a href={chemicalB.sdsUrl} className="text-blue-600 hover:underline flex items-center gap-1 mt-2">
                    View SDS <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison History */}
      {comparisonHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Comparisons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {comparisonHistory.slice(0, 5).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setChemicalA(item.chemA)
                    setChemicalB(item.chemB)
                    setResult(item.result)
                  }}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-gray-800">
                      {item.chemA.name} + {item.chemB.name}
                    </div>
                    <span
                      className="text-xs font-semibold"
                      style={{
                        color:
                          item.result.level === "compatible"
                            ? "#16a34a"
                            : item.result.level === "limited"
                              ? "#ca8a04"
                              : "#dc2626",
                      }}
                    >
                      {item.result.badge}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
