"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarcodeScanner } from "@/components/barcode-scanner"
import { Badge } from "@/components/ui/badge"

export default function QRScannerPage() {
  const router = useRouter()
  const [scannedData, setScannedData] = useState<any>(null)

  const handleScanComplete = (url: string) => {
    setScannedData({ url, timestamp: new Date().toISOString() })
    setTimeout(() => {
      router.push(url)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">QR Code Scanner</h1>
          <p className="text-slate-400">Scan QR codes to access SDS sheets and labels instantly</p>
        </div>

        <BarcodeScanner onScanComplete={handleScanComplete} />

        {scannedData && (
          <Card className="border-green-700 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400">Last Scanned</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 break-all">{scannedData.url}</p>
              <p className="text-slate-500 text-sm mt-2">{scannedData.timestamp}</p>
            </CardContent>
          </Card>
        )}

        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-300">Popular Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-slate-400 text-sm">
              <p>Recent SDS sheets and labels with QR codes will appear here</p>
              <Badge variant="secondary">Coming Soon</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
