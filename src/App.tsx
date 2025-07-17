import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'
import { PaperAnalyzer } from '@/components/analyzer/PaperAnalyzer'
import { QuestionGenerator } from '@/components/generator/QuestionGenerator'
import { ExplanationEngine } from '@/components/explanations/ExplanationEngine'
import { SyllabusMapper } from '@/components/mapper/SyllabusMapper'
import { ExportCenter } from '@/components/export/ExportCenter'
import { Analytics } from '@/components/analytics/Analytics'
import { AdminPanel } from '@/components/admin/AdminPanel'
import { blink } from '@/blink/client'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ExamPrep AI...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ExamPrep AI Platform</h1>
          <p className="text-gray-600 mb-8">Central AI Engine for Competitive Exam Preparation</p>
          <button 
            onClick={() => blink.auth.login()}
            className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />
      case 'analyzer':
        return <PaperAnalyzer />
      case 'generator':
        return <QuestionGenerator />
      case 'explanations':
        return <ExplanationEngine />
      case 'mapper':
        return <SyllabusMapper />
      case 'export':
        return <ExportCenter />
      case 'analytics':
        return <Analytics />
      case 'admin':
        return <AdminPanel />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App