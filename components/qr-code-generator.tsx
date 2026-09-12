"use client"

import { useEffect, useRef } from "react"
import { Download, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

interface QRCodeGeneratorProps {
  id: string
  type: "SDS" | "LABEL"
  productName: string
  size?: number
}

export function QRCodeGenerator({ id, type, productName, size = 256 }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    generateQRCode()
  }, [id, type])

  const generateQRCode = async () => {
    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
          `${window.location.origin}/${type.toLowerCase()}-library/${id}?qr=true`,
        )}`,
      )

      if (!canvasRef.current) return

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const img = new Image()

      img.onload = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = size
        canvas.height = size
        ctx.drawImage(img, 0, 0)
      }

      img.src = url
    } catch (error) {
      console.error("[v0] QR Code generation error:", error)
    }
  }

  const downloadQRCode = () => {
    if (!canvasRef.current) return

    const link = document.createElement("a")
    link.href = canvasRef.current.toDataURL("image/png")
    link.download = `${productName}-${type.toLowerCase()}-qr.png`
    link.click()

    toast({
      title: "Downloaded",
      description: `QR code for ${productName} downloaded successfully`,
    })
  }

  const copyQRCode = () => {
    if (!canvasRef.current) return

    canvasRef.current.toBlob((blob) => {
      if (!blob) return

      const item = new ClipboardItem({ "image/png": blob })
      navigator.clipboard.write([item])

      toast({
        title: "Copied",
        description: "QR code copied to clipboard",
      })
    })
  }

  return (
    <Card className="border-slate-700 bg-slate-800">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-slate-300">QR Code - {productName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center p-4 bg-white rounded-lg">
          <canvas ref={canvasRef} width={size} height={size} className="border border-slate-300" />
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={downloadQRCode} className="flex-1 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button size="sm" variant="outline" onClick={copyQRCode} className="flex-1 bg-transparent">
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
