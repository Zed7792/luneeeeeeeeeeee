"use client"

import { useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Camera, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface BarcodeScannerProps {
  onScanComplete: (url: string) => void
}

export function BarcodeScanner({ onScanComplete }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const startScanning = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsScanning(true)
      }
    } catch (err) {
      setError("Camera access denied. Please check permissions.")
      console.error("[v0] Camera error:", err)
    }
  }

  const stopScanning = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      setIsScanning(false)
    }
  }

  return (
    <Card className="border-slate-700 bg-slate-800">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Camera className="h-4 w-4" />
          Barcode Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-400 text-sm">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {isScanning ? (
          <div className="space-y-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg bg-black"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
            <Button onClick={stopScanning} variant="destructive" className="w-full">
              <X className="h-4 w-4 mr-2" />
              Stop Scanning
            </Button>
          </div>
        ) : (
          <Button onClick={startScanning} className="w-full bg-blue-600 hover:bg-blue-700">
            <Camera className="h-4 w-4 mr-2" />
            Start Camera
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
