export interface QRCodeData {
  id: string
  type: "SDS" | "LABEL"
  productName: string
  url: string
  timestamp: number
  scans: number
}

export const generateQRData = (id: string, type: "SDS" | "LABEL", productName: string): QRCodeData => {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
  const url = type === "SDS" ? `${baseUrl}/sds-library/${id}` : `${baseUrl}/labels`

  return {
    id,
    type,
    productName,
    url,
    timestamp: Date.now(),
    scans: 0,
  }
}

export const trackQRScan = (qrId: string, qrType: "SDS" | "LABEL") => {
  const scanKey = `qr-scans-${qrType.toLowerCase()}`
  const scans = JSON.parse(localStorage.getItem(scanKey) || "{}")

  if (!scans[qrId]) {
    scans[qrId] = { count: 0, lastScanned: null, scans: [] }
  }

  scans[qrId].count += 1
  scans[qrId].lastScanned = new Date().toISOString()
  scans[qrId].scans.push({
    timestamp: Date.now(),
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
  })

  localStorage.setItem(scanKey, JSON.stringify(scans))
  return scans[qrId]
}

export const getQRScanAnalytics = (qrType: "SDS" | "LABEL") => {
  const scanKey = `qr-scans-${qrType.toLowerCase()}`
  return JSON.parse(localStorage.getItem(scanKey) || "{}")
}
