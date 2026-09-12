export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="h-10 bg-slate-700 rounded w-48 mb-2 animate-pulse" />
          <div className="h-4 bg-slate-700 rounded w-96 animate-pulse" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-800 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
