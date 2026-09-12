"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/context/language-context"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  FileText,
  AlertTriangle,
  Truck,
  List,
  Shield,
  Activity,
  BookOpen,
  Globe,
  ChevronRight,
  X,
  Maximize2,
} from "lucide-react"

// Import the content components
import SDSOverviewPage from "@/app/general-information/sds-overview/page"
import GHSPage from "@/app/general-information/ghs-pictograms/page"
import TransportationPage from "@/app/general-information/transportation/page"
import SDS16ElementsPage from "@/app/general-information/sds-16-elements/page"
import ChemicalSafetyDosDontsPage from "@/app/general-information/chemical-safety-dos-donts/page"
import NFPAHazardAwarenessPage from "@/app/general-information/nfpa-hazard-awareness/page"
import HazardsPrecautionaryStatementsPage from "@/app/general-information/hazards-precautionary-statements/page"
import PPERequirementsPage from "@/app/general-information/ppe-requirements/page"

const tabConfig = {
  en: {
    "sds-overview": {
      title: "SDS Overview",
      description: "Safety Data Sheet fundamentals",
      icon: FileText,
      color: "safety-blue",
    },
    "ghs-pictograms": {
      title: "GHS Pictograms",
      description: "Hazard communication symbols",
      icon: AlertTriangle,
      color: "safety-red",
    },
    transportation: {
      title: "Transportation",
      description: "Safe transport guidelines",
      icon: Truck,
      color: "safety-green",
    },
    "sds-16-elements": {
      title: "SDS 16 Elements",
      description: "Complete SDS structure",
      icon: List,
      color: "safety-blue",
    },
    "chemical-safety-dos-donts": {
      title: "Safety Guidelines",
      description: "Best practices & precautions",
      icon: Shield,
      color: "safety-green",
    },
    "nfpa-hazard-awareness": {
      title: "NFPA Hazard Chart",
      description: "Fire protection standards",
      icon: Activity,
      color: "safety-red",
    },
    "hazards-precautionary-statements": {
      title: "Hazard Statements",
      description: "Risk & safety phrases",
      icon: BookOpen,
      color: "safety-orange",
    },
    "chemicals-compatibility-chart": {
      title: "Compatibility Chart",
      description: "Chemical storage compatibility",
      icon: Shield,
      color: "safety-blue",
    },
    "ppe-requirements": {
      title: "PPE Requirements",
      description: "Personal protective equipment standards",
      icon: Shield,
      color: "safety-orange",
    },
  },
  ar: {
    "sds-overview": {
      title: "نظرة عامة على صحائف بيانات السلامة",
      description: "أساسيات صحيفة بيانات السلامة",
      icon: FileText,
      color: "safety-blue",
    },
    "ghs-pictograms": {
      title: "رموز GHS التوضيحية",
      description: "رموز توصيل المخاطر",
      icon: AlertTriangle,
      color: "safety-red",
    },
    transportation: {
      title: "النقل",
      description: "إرشادات النقل الآمن",
      icon: Truck,
      color: "safety-green",
    },
    "sds-16-elements": {
      title: "عناصر صحيفة بيانات السلامة الـ 16",
      description: "هيكل صحيفة بيانات السلامة الكامل",
      icon: List,
      color: "safety-blue",
    },
    "chemical-safety-dos-donts": {
      title: "إرشادات السلامة",
      description: "أفضل الممارسات والاحتياطات",
      icon: Shield,
      color: "safety-green",
    },
    "nfpa-hazard-awareness": {
      title: "مخطط مخاطر NFPA",
      description: "معايير الحماية من الحرائق",
      icon: Activity,
      color: "safety-red",
    },
    "hazards-precautionary-statements": {
      title: "بيانات المخاطر",
      description: "عبارات المخاطر والسلامة",
      icon: BookOpen,
      color: "safety-orange",
    },
    "ppe-requirements": {
      title: "متطلبات معدات الحماية الشخصية",
      description: "معايير معدات الحماية الشخصية",
      icon: Shield,
      color: "safety-orange",
    },
  },
}

// Define a type for the active tab
type ActiveTab =
  | "sds-overview"
  | "ghs-pictograms"
  | "transportation"
  | "sds-16-elements"
  | "chemical-safety-dos-donts"
  | "nfpa-hazard-awareness"
  | "hazards-precautionary-statements"
  | "chemicals-compatibility-chart"
  | "ppe-requirements" // Added PPE Requirements to type

export default function GeneralInformationDisplay() {
  const { currentLanguage, setLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState<ActiveTab>("sds-overview")
  const [isChartFullscreen, setIsChartFullscreen] = useState(false)

  const renderSelectedPage = () => {
    switch (activeTab) {
      case "sds-overview":
        return <SDSOverviewPage />
      case "ghs-pictograms":
        return <GHSPage />
      case "transportation":
        return <TransportationPage />
      case "sds-16-elements":
        return <SDS16ElementsPage />
      case "chemical-safety-dos-donts":
        return <ChemicalSafetyDosDontsPage />
      case "nfpa-hazard-awareness":
        return <NFPAHazardAwarenessPage />
      case "hazards-precautionary-statements":
        return <HazardsPrecautionaryStatementsPage />
      case "chemicals-compatibility-chart":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Chemicals Compatibility Chart</h2>
              <p className="text-muted-foreground mb-6">Chemical storage compatibility matrix and safety guidelines</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg border">
              <div className="relative group">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FqgfuS1hSV3UsogBZK9k7nXJgr4xjP.png"
                  alt="Chemicals Compatibility Chart - High Resolution Matrix"
                  className="w-full h-auto rounded-lg shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
                  style={{ maxHeight: "none", objectFit: "contain" }}
                  onClick={() => setIsChartFullscreen(true)}
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/70 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                    <Maximize2 className="w-4 h-4" />
                    Click to expand
                  </div>
                </div>
              </div>
            </div>

            {isChartFullscreen && (
              <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                <div className="relative max-w-full max-h-full">
                  <button
                    onClick={() => setIsChartFullscreen(false)}
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors z-10"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FqgfuS1hSV3UsogBZK9k7nXJgr4xjP.png"
                    alt="Chemicals Compatibility Chart - Fullscreen View"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        )
      case "ppe-requirements":
        return <PPERequirementsPage />
      default:
        return <SDSOverviewPage />
    }
  }

  const tabKeys = Object.keys(tabConfig[currentLanguage]) as ActiveTab[]

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-safety-blue/10 border border-safety-blue/20">
                  <Globe className="w-6 h-6 text-safety-blue" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {currentLanguage === "en" ? "Chemical Safety Information" : "معلومات السلامة الكيميائية"}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {currentLanguage === "en"
                      ? "Comprehensive safety guidelines and standards"
                      : "إرشادات ومعايير السلامة الشاملة"}
                  </p>
                </div>
              </div>

              <Select value={currentLanguage} onValueChange={(value) => setLanguage(value as "en" | "ar")}>
                <SelectTrigger className="w-[140px] bg-card border-border hover:bg-accent transition-colors">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="en" className="hover:bg-accent">
                    🇺🇸 English
                  </SelectItem>
                  <SelectItem value="ar" className="hover:bg-accent">
                    🇸🇦 العربية
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
              {tabKeys.map((tabKey) => {
                const tab = tabConfig[currentLanguage][tabKey]
                const Icon = tab.icon
                const isActive = activeTab === tabKey

                return (
                  <Card
                    key={tabKey}
                    className={`
                      cursor-pointer transition-all duration-300 hover-lift modern-tab
                      ${
                        isActive
                          ? `bg-${tab.color}/10 border-${tab.color}/30 shadow-lg`
                          : "bg-card hover:bg-accent/50 border-border"
                      }
                    `}
                    onClick={() => setActiveTab(tabKey)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`
                          flex items-center justify-center w-10 h-10 rounded-lg
                          ${isActive ? `bg-${tab.color}/20 text-${tab.color}` : "bg-muted text-muted-foreground"}
                          transition-colors duration-300
                        `}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`
                            font-semibold text-sm leading-tight mb-1
                            ${isActive ? `text-${tab.color}` : "text-foreground"}
                            transition-colors duration-300
                          `}
                          >
                            {tab.title}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">{tab.description}</p>
                        </div>
                        {isActive && <ChevronRight className={`w-4 h-4 text-${tab.color} flex-shrink-0`} />}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-12">
        <Card className="bg-card border-border shadow-xl fade-in">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Active tab indicator */}
              <div className="flex items-center gap-3 pb-6 border-b border-border">
                {(() => {
                  const activeTabConfig = tabConfig[currentLanguage][activeTab]
                  const Icon = activeTabConfig.icon
                  return (
                    <>
                      <div
                        className={`
                        flex items-center justify-center w-8 h-8 rounded-lg
                        bg-${activeTabConfig.color}/20 text-${activeTabConfig.color}
                      `}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground">{activeTabConfig.title}</h2>
                        <p className="text-sm text-muted-foreground">{activeTabConfig.description}</p>
                      </div>
                    </>
                  )
                })()}
              </div>

              {/* Content area */}
              <div className="prose prose-slate dark:prose-invert max-w-none">{renderSelectedPage()}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
