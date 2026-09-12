import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function QRScannerLoading() {
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="h-10 bg-slate-700 rounded animate-pulse" />
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <div className="h-6 bg-slate-700 rounded w-1/3 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-slate-700 rounded animate-pulse" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
