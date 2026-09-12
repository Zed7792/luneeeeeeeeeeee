"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/context/language-context"
import {
  Shield,
  HardHat,
  Eye,
  Hand,
  Footprints,
  Shirt,
  AlertTriangle,
  Info,
  CheckCircle,
  Users,
  BookOpen,
  Target,
  Zap,
  Droplets,
  Wind,
  Biohazard,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"

export default function PPERequirementsPage() {
  const { currentLanguage } = useLanguage()
  const [selectedHierarchyLevel, setSelectedHierarchyLevel] = useState<number | null>(null)

  const hierarchyLevels = {
    en: [
      {
        level: 1,
        title: "ELIMINATION",
        subtitle: "Most Effective",
        description: "Remove the hazard completely",
        examples: ["Substitute dangerous chemicals", "Eliminate toxic processes", "Remove hazardous equipment"],
        color: "safety-green",
      },
      {
        level: 2,
        title: "SUBSTITUTION",
        subtitle: "Replace with safer alternatives",
        description: "Replace with less dangerous alternatives",
        examples: [
          "Use water-based instead of solvent-based products",
          "Replace toxic materials",
          "Use safer equipment",
        ],
        color: "safety-blue",
      },
      {
        level: 3,
        title: "ENGINEERING CONTROLS",
        subtitle: "Isolate people from hazards",
        description: "Isolate people from hazards",
        examples: ["Ventilation systems", "Machine guards", "Containment systems", "Noise barriers"],
        color: "safety-orange",
      },
      {
        level: 4,
        title: "ADMINISTRATIVE CONTROLS",
        subtitle: "Change work practices",
        description: "Change work practices and policies",
        examples: ["Training programs", "Job rotation", "Warning signs", "Safety procedures"],
        color: "safety-yellow",
      },
      {
        level: 5,
        title: "PPE (Last Line of Defense)",
        subtitle: "Protect individual workers",
        description: "Protect individual workers",
        examples: ["Gloves", "Respirators", "Safety glasses", "Hard hats", "Safety boots"],
        color: "safety-red",
      },
    ],
    ar: [
      {
        level: 1,
        title: "الإزالة",
        subtitle: "الأكثر فعالية",
        description: "إزالة الخطر بالكامل",
        examples: ["استبدال المواد الكيميائية الخطرة", "إزالة العمليات السامة", "إزالة المعدات الخطرة"],
        color: "safety-green",
      },
      {
        level: 2,
        title: "الاستبدال",
        subtitle: "استبدال بالبدائل الأكثر أماناً",
        description: "استبدال بالبدائل الأقل خطورة",
        examples: ["استخدام المنتجات المائية بدلاً من المذيبات", "استبدال المواد السامة", "استخدام معدات أكثر أماناً"],
        color: "safety-blue",
      },
      {
        level: 3,
        title: "الضوابط الهندسية",
        subtitle: "عزل الأشخاص عن المخاطر",
        description: "عزل الأشخاص عن المخاطر",
        examples: ["أنظمة التهوية", "واقيات الآلات", "أنظمة الاحتواء", "حواجز الضوضاء"],
        color: "safety-orange",
      },
      {
        level: 4,
        title: "الضوابط الإدارية",
        subtitle: "تغيير ممارسات العمل",
        description: "تغيير ممارسات العمل والسياسات",
        examples: ["برامج التدريب", "تناوب الوظائف", "علامات التحذير", "إجراءات السلامة"],
        color: "safety-yellow",
      },
      {
        level: 5,
        title: "معدات الحماية الشخصية (خط الدفاع الأخير)",
        subtitle: "حماية العمال الأفراد",
        description: "حماية العمال الأفراد",
        examples: ["القفازات", "أجهزة التنفس", "نظارات السلامة", "الخوذات الصلبة", "أحذية السلامة"],
        color: "safety-red",
      },
    ],
  }

  const hazardTypes = {
    en: [
      {
        title: "Chemical Hazards",
        icon: Droplets,
        color: "safety-red",
        items: ["Corrosive substances", "Toxic materials", "Carcinogenic compounds", "Skin sensitizers"],
      },
      {
        title: "Physical Hazards",
        icon: Zap,
        color: "safety-orange",
        items: [
          "Flying particles and debris",
          "Sharp objects and tools",
          "Extreme temperatures",
          "Noise exposure",
          "Radiation",
        ],
      },
      {
        title: "Biological Hazards",
        icon: Biohazard,
        color: "safety-green",
        items: ["Infectious materials", "Contaminated surfaces", "Bloodborne pathogens"],
      },
      {
        title: "Environmental Factors",
        icon: Wind,
        color: "safety-blue",
        items: ["Weather conditions", "Poor visibility", "Slippery surfaces", "Confined spaces"],
      },
    ],
    ar: [
      {
        title: "المخاطر الكيميائية",
        icon: Droplets,
        color: "safety-red",
        items: ["المواد المسببة للتآكل", "المواد السامة", "المركبات المسرطنة", "محسسات الجلد"],
      },
      {
        title: "المخاطر الفيزيائية",
        icon: Zap,
        color: "safety-orange",
        items: [
          "الجسيمات والحطام المتطاير",
          "الأشياء الحادة والأدوات",
          "درجات الحرارة القصوى",
          "التعرض للضوضاء",
          "الإشعاع",
        ],
      },
      {
        title: "المخاطر البيولوجية",
        icon: Biohazard,
        color: "safety-green",
        items: ["المواد المعدية", "الأسطح الملوثة", "مسببات الأمراض المنقولة بالدم"],
      },
      {
        title: "العوامل البيئية",
        icon: Wind,
        color: "safety-blue",
        items: ["الظروف الجوية", "ضعف الرؤية", "الأسطح الزلقة", "الأماكن المحصورة"],
      },
    ],
  }

  const ppeCategories = {
    en: [
      {
        title: "Head Protection",
        icon: HardHat,
        symbol: "M014",
        color: "safety-blue",
        when: "Construction, falling objects, electrical work",
        types: "Hard hats, bump caps, helmets",
      },
      {
        title: "Eye & Face Protection",
        icon: Eye,
        symbol: "M004",
        color: "safety-green",
        when: "Chemical splash, flying particles, welding",
        types: "Safety glasses, goggles, face shields",
      },
      {
        title: "Respiratory Protection",
        icon: Shield,
        symbol: "M017",
        color: "safety-red",
        when: "Dust, vapors, insufficient oxygen",
        types: "Disposable masks, half-face, full-face respirators",
      },
      {
        title: "Hand Protection",
        icon: Hand,
        symbol: "M009",
        color: "safety-orange",
        when: "Chemical contact, cuts, temperature extremes",
        types: "Chemical-resistant, cut-resistant, insulated gloves",
      },
      {
        title: "Foot Protection",
        icon: Footprints,
        symbol: "M008",
        color: "safety-yellow",
        when: "Heavy objects, puncture hazards, chemicals",
        types: "Steel toe, puncture-resistant, chemical-resistant boots",
      },
      {
        title: "Body Protection",
        icon: Shirt,
        symbol: "M010",
        color: "safety-purple",
        when: "Chemical splash, heat, cold, cuts",
        types: "Coveralls, aprons, high-visibility clothing",
      },
    ],
    ar: [
      {
        title: "حماية الرأس",
        icon: HardHat,
        symbol: "M014",
        color: "safety-blue",
        when: "البناء، الأشياء المتساقطة، العمل الكهربائي",
        types: "الخوذات الصلبة، قبعات الحماية، الخوذات",
      },
      {
        title: "حماية العين والوجه",
        icon: Eye,
        symbol: "M004",
        color: "safety-green",
        when: "رذاذ المواد الكيميائية، الجسيمات المتطايرة، اللحام",
        types: "نظارات السلامة، النظارات الواقية، واقيات الوجه",
      },
      {
        title: "حماية الجهاز التنفسي",
        icon: Shield,
        symbol: "M017",
        color: "safety-red",
        when: "الغبار، الأبخرة، نقص الأكسجين",
        types: "الأقنعة المتاحة، نصف الوجه، أجهزة التنفس كاملة الوجه",
      },
      {
        title: "حماية اليدين",
        icon: Hand,
        symbol: "M009",
        color: "safety-orange",
        when: "ملامسة المواد الكيميائية، الجروح، درجات الحرارة القصوى",
        types: "قفازات مقاومة للمواد الكيميائية، مقاومة للقطع، معزولة",
      },
      {
        title: "حماية القدمين",
        icon: Footprints,
        symbol: "M008",
        color: "safety-yellow",
        when: "الأشياء الثقيلة، مخاطر الثقب، المواد الكيميائية",
        types: "مقدمة فولاذية، مقاومة للثقب، أحذية مقاومة للمواد الكيميائية",
      },
      {
        title: "حماية الجسم",
        icon: Shirt,
        symbol: "M010",
        color: "safety-purple",
        when: "رذاذ المواد الكيميائية، الحرارة، البرد، الجروح",
        types: "البدلات الواقية، المآزر، الملابس عالية الوضوح",
      },
    ],
  }

  const currentHierarchy = hierarchyLevels[currentLanguage]
  const currentHazards = hazardTypes[currentLanguage]
  const currentPPE = ppeCategories[currentLanguage]

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-safety-blue/20 border border-safety-blue/30">
            <Shield className="w-8 h-8 text-safety-blue" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              {currentLanguage === "en" ? "PPE Information Hub" : "مركز معلومات معدات الحماية الشخصية"}
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              {currentLanguage === "en"
                ? "Comprehensive Personal Protective Equipment Guidelines"
                : "إرشادات شاملة لمعدات الحماية الشخصية"}
            </p>
          </div>
        </div>
      </div>

      {/* PPE Definition & Overview */}
      <Card className="ppe-category-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Info className="w-6 h-6 text-safety-blue" />
            <CardTitle className="text-2xl text-safety-blue">
              {currentLanguage === "en" ? "What is PPE?" : "ما هي معدات الحماية الشخصية؟"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                {currentLanguage === "en" ? "Definition" : "التعريف"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {currentLanguage === "en"
                  ? "Personal Protective Equipment (PPE) refers to protective clothing, helmets, goggles, or other garments or equipment designed to protect the wearer's body from injury or infection."
                  : "معدات الحماية الشخصية (PPE) تشير إلى الملابس الواقية والخوذات والنظارات الواقية أو الملابس أو المعدات الأخرى المصممة لحماية جسم مرتديها من الإصابة أو العدوى."}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                {currentLanguage === "en" ? "Key Principles" : "المبادئ الأساسية"}
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-safety-green mt-1 flex-shrink-0" />
                  {currentLanguage === "en" ? "Last line of defense" : "خط الدفاع الأخير"}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-safety-green mt-1 flex-shrink-0" />
                  {currentLanguage === "en" ? "Protects individual workers" : "يحمي العمال الأفراد"}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-safety-green mt-1 flex-shrink-0" />
                  {currentLanguage === "en"
                    ? "Must be properly selected and maintained"
                    : "يجب اختياره وصيانته بشكل صحيح"}
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hierarchy of Controls */}
      <Card className="ppe-category-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-safety-orange" />
            <CardTitle className="text-2xl text-safety-orange">
              {currentLanguage === "en" ? "Hierarchy of Controls" : "تسلسل الضوابط"}
            </CardTitle>
          </div>
          <p className="text-muted-foreground">
            {currentLanguage === "en"
              ? "PPE is the LAST resort when other controls are not feasible or sufficient"
              : "معدات الحماية الشخصية هي الملاذ الأخير عندما تكون الضوابط الأخرى غير ممكنة أو كافية"}
          </p>
        </CardHeader>
        <CardContent>
          <div className="hierarchy-pyramid">
            {currentHierarchy.map((level, index) => (
              <div
                key={level.level}
                className={`hierarchy-level hierarchy-level-${level.level} ${
                  selectedHierarchyLevel === level.level ? "ring-2 ring-white" : ""
                }`}
                onClick={() => setSelectedHierarchyLevel(selectedHierarchyLevel === level.level ? null : level.level)}
              >
                <div className="text-center">
                  <div className="font-bold text-lg">{level.title}</div>
                  <div className="text-sm opacity-90">{level.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          {selectedHierarchyLevel && (
            <Card className="mt-6 bg-accent/50 border-accent">
              <CardContent className="p-4">
                {(() => {
                  const selectedLevel = currentHierarchy.find((l) => l.level === selectedHierarchyLevel)
                  return selectedLevel ? (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">{selectedLevel.title}</h4>
                      <p className="text-muted-foreground">{selectedLevel.description}</p>
                      <div>
                        <h5 className="font-medium text-foreground mb-2">
                          {currentLanguage === "en" ? "Examples:" : "أمثلة:"}
                        </h5>
                        <ul className="space-y-1">
                          {selectedLevel.examples.map((example, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <ChevronRight className="w-3 h-3" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null
                })()}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Hazard Types */}
      <Card className="ppe-category-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-safety-red" />
            <CardTitle className="text-2xl text-safety-red">
              {currentLanguage === "en"
                ? "Causes & Circumstances Requiring PPE"
                : "الأسباب والظروف التي تتطلب معدات الحماية الشخصية"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentHazards.map((hazard, index) => {
              const Icon = hazard.icon
              return (
                <Card key={index} className="interactive-element bg-card/50 border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-lg bg-${hazard.color}/20 text-${hazard.color}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold text-${hazard.color} mb-2`}>{hazard.title}</h3>
                        <ul className="space-y-1">
                          {hazard.items.map((item, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* PPE Categories */}
      <Card className="ppe-category-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-safety-blue" />
            <CardTitle className="text-2xl text-safety-blue">
              {currentLanguage === "en"
                ? "PPE Categories & ISO 7010 Symbols"
                : "فئات معدات الحماية الشخصية ورموز ISO 7010"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPPE.map((category, index) => {
              const Icon = category.icon
              return (
                <Card key={index} className="interactive-element bg-card/50 border-border">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center w-12 h-12 rounded-xl bg-${category.color}/20 text-${category.color}`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className={`font-semibold text-${category.color}`}>{category.title}</h3>
                          <Badge variant="outline" className="text-xs mt-1">
                            {category.symbol}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-1">
                            {currentLanguage === "en" ? "When Required:" : "متى مطلوب:"}
                          </h4>
                          <p className="text-xs text-muted-foreground">{category.when}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-1">
                            {currentLanguage === "en" ? "Types:" : "الأنواع:"}
                          </h4>
                          <p className="text-xs text-muted-foreground">{category.types}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Requirements */}
      <Card className="ppe-category-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-safety-green" />
            <CardTitle className="text-2xl text-safety-green">
              {currentLanguage === "en" ? "PPE Implementation Requirements" : "متطلبات تنفيذ معدات الحماية الشخصية"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-safety-blue" />
                  {currentLanguage === "en" ? "Training Requirements" : "متطلبات التدريب"}
                </h3>
                <ul className="space-y-2">
                  {(currentLanguage === "en"
                    ? [
                        "When to use PPE",
                        "How to properly don, doff, adjust, and wear PPE",
                        "Limitations of PPE",
                        "Proper care, maintenance, and disposal",
                      ]
                    : [
                        "متى تستخدم معدات الحماية الشخصية",
                        "كيفية ارتداء وخلع وضبط وارتداء معدات الحماية الشخصية بشكل صحيح",
                        "قيود معدات الحماية الشخصية",
                        "الرعاية والصيانة والتخلص المناسب",
                      ]
                  ).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-safety-green mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-safety-orange" />
                  {currentLanguage === "en" ? "Program Elements" : "عناصر البرنامج"}
                </h3>
                <ul className="space-y-2">
                  {(currentLanguage === "en"
                    ? [
                        "Written PPE program",
                        "Regular assessments",
                        "Employee training records",
                        "PPE inspection schedules",
                        "Replacement protocols",
                      ]
                    : [
                        "برنامج مكتوب لمعدات الحماية الشخصية",
                        "تقييمات منتظمة",
                        "سجلات تدريب الموظفين",
                        "جداول فحص معدات الحماية الشخصية",
                        "بروتوكولات الاستبدال",
                      ]
                  ).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-safety-orange mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Message */}
      <Card className="bg-gradient-to-r from-safety-red/10 to-safety-orange/10 border-safety-red/20">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <AlertTriangle className="w-8 h-8 text-safety-red" />
            <h2 className="text-2xl font-bold text-safety-red">{currentLanguage === "en" ? "Remember" : "تذكر"}</h2>
          </div>
          <p className="text-lg text-foreground font-medium">
            {currentLanguage === "en"
              ? "PPE is the LAST resort when other controls are not feasible or sufficient. It should never be the first or only solution to workplace hazards."
              : "معدات الحماية الشخصية هي الملاذ الأخير عندما تكون الضوابط الأخرى غير ممكنة أو كافية. يجب ألا تكون الحل الأول أو الوحيد لمخاطر مكان العمل."}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
