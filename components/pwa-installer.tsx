"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function PWAInstaller() {
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setInstallPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", handler)

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return

    installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice

    if (outcome === "accepted") {
      toast({
        title: "Success",
        description: "OILSERV CSMS installed to your device",
      })
    }

    setInstallPrompt(null)
  }

  if (isInstalled || !installPrompt) return null

  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-sm z-50">
      <Download className="h-5 w-5" />
      <div className="flex-1">
        <p className="font-semibold text-sm">Install OILSERV CSMS</p>
        <p className="text-xs opacity-90">Get instant access to safety data on your device</p>
      </div>
      <Button size="sm" onClick={handleInstall} className="bg-white text-blue-600 hover:bg-gray-100">
        Install
      </Button>
      <button onClick={() => setInstallPrompt(null)} className="p-1 hover:bg-blue-700 rounded">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
