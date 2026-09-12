import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function CompatibilityLoading() {
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-2">
          <div className="h-10 bg-slate-700 rounded w-1/2 animate-pulse" />
          <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse" />
        </div>

        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <div className="h-6 bg-slate-700 rounded w-1/3 animate-pulse" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-10 bg-slate-700 rounded animate-pulse" />
            <div className="h-10 bg-slate-700 rounded animate-pulse" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
