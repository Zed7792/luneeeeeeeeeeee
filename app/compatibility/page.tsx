"use client"

import { CompatibilityCheckerV2 } from "@/components/compatibility-checker-v2"

export default function CompatibilityPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">Chemical Compatibility Checker</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Compare two chemical products and verify safe storage compatibility. Our intelligent system analyzes
            chemical properties, hazard classes, and reactive incompatibilities to provide comprehensive safety
            recommendations.
          </p>
        </div>

        {/* Main Checker */}
        <CompatibilityCheckerV2 />

        {/* Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🟢</span>
              <h3 className="font-semibold text-green-900">Compatible</h3>
            </div>
            <p className="text-sm text-green-800">
              Safe to store together under normal conditions with standard precautions.
            </p>
          </div>

          <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🟡</span>
              <h3 className="font-semibold text-yellow-900">Limited Compatibility</h3>
            </div>
            <p className="text-sm text-yellow-800">
              Can be stored in the same area with special conditions, physical separation, or enhanced controls.
            </p>
          </div>

          <div className="p-6 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🔴</span>
              <h3 className="font-semibold text-red-900">Not Compatible</h3>
            </div>
            <p className="text-sm text-red-800">
              Must be stored in completely separate locations to prevent dangerous interactions.
            </p>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded">
          <h3 className="font-semibold text-blue-900 mb-2">Safety Notice</h3>
          <p className="text-sm text-blue-800">
            Always consult the Safety Data Sheet (SDS) for each chemical before storage. This tool provides guidance
            based on hazard classifications, but professional judgment and local regulations must always take
            precedence. When in doubt, store chemicals separately.
          </p>
        </div>
      </div>
    </div>
  )
}
