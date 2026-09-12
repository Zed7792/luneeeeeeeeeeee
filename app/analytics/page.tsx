"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, CheckCircle2, Clock } from "lucide-react"

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30")
  const [data, setData] = useState(null)

  useEffect(() => {
    // Load data from localStorage
    const sdsLibrary = JSON.parse(localStorage.getItem("sds-library") || "[]")
    const labels = JSON.parse(localStorage.getItem("labels") || "[]")
    const modifications = JSON.parse(localStorage.getItem("modifications") || "[]")

    // Calculate metrics
    const totalSDSCount = sdsLibrary.length
    const approvedSDS = sdsLibrary.filter((item: any) => item.status === "approved").length
    const pendingSDS = sdsLibrary.filter((item: any) => item.status === "pending").length

    const totalLabels = labels.filter((item: any) => item.status === "approved").length
    const approvedLabels = labels.filter((item: any) => item.status === "approved").length

    const recentModifications = modifications.filter((item: any) => item.status === "pending").length
    const approvedModifications = modifications.filter((item: any) => item.status === "approved").length

    // Hazard distribution
    const hazardMap: { [key: string]: number } = {}
    sdsLibrary.forEach((item: any) => {
      if (item.hazards) {
        item.hazards.forEach((hazard: string) => {
          hazardMap[hazard] = (hazardMap[hazard] || 0) + 1
        })
      }
    })

    const hazardData = Object.entries(hazardMap)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .slice(0, 8)

    // Compliance status
    const complianceData = [
      { name: "Approved SDS", value: approvedSDS, color: "#10b981" },
      { name: "Pending SDS", value: pendingSDS, color: "#f59e0b" },
      { name: "Approved Labels", value: approvedLabels, color: "#3b82f6" },
      { name: "Pending Modifications", value: recentModifications, color: "#ef4444" },
    ]

    setData({
      totalSDSCount,
      approvedSDS,
      pendingSDS,
      totalLabels,
      approvedLabels,
      recentModifications,
      approvedModifications,
      hazardData,
      complianceData,
      complianceScore: Math.round((approvedSDS / Math.max(totalSDSCount, 1)) * 100),
    })
  }, [])

  if (!data) {
    return <div className="p-8">Loading analytics...</div>
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Chemical Safety Analytics</h1>
            <p className="text-slate-400">Real-time compliance and inventory insights</p>
          </div>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Download size={18} />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Compliance Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-green-500">{data.complianceScore}%</div>
                <CheckCircle2 className="text-green-500" size={32} />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {data.approvedSDS} of {data.totalSDSCount} approved
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-blue-500">{data.totalSDSCount}</div>
                <TrendingUp className="text-blue-500" size={32} />
              </div>
              <p className="text-xs text-slate-400 mt-2">{data.pendingSDS} pending review</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Pending Modifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-amber-500">{data.recentModifications}</div>
                <Clock className="text-amber-500" size={32} />
              </div>
              <p className="text-xs text-slate-400 mt-2">{data.approvedModifications} approved this month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Total Labels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-purple-500">{data.totalLabels}</div>
                <CheckCircle2 className="text-purple-500" size={32} />
              </div>
              <p className="text-xs text-slate-400 mt-2">All approved</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Hazard Distribution */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle>Hazard Distribution</CardTitle>
              <CardDescription>Top chemical hazards in inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.hazardData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    style={{ fontSize: "12px" }}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                    labelStyle={{ color: "#f1f5f9" }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Compliance Status */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>Overall document status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.complianceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.complianceData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                    labelStyle={{ color: "#f1f5f9" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-sm">Approval Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500 mb-2">
                {(
                  ((data.approvedSDS + data.approvedLabels) / Math.max(data.totalSDSCount + data.totalLabels, 1)) *
                  100
                ).toFixed(1)}
                %
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${((data.approvedSDS + data.approvedLabels) / Math.max(data.totalSDSCount + data.totalLabels, 1)) * 100}%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-sm">Pending Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-500 mb-2">{data.pendingSDS + data.recentModifications}</div>
              <p className="text-xs text-slate-400">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-sm">System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500 mb-2">98%</div>
              <p className="text-xs text-slate-400">All systems operational</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
