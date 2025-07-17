import { 
  LayoutDashboard, 
  FileText, 
  Zap, 
  MessageSquare, 
  GitBranch, 
  Download,
  Settings,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'analyzer', name: 'Paper Analyzer', icon: FileText },
  { id: 'generator', name: 'Question Generator', icon: Zap },
  { id: 'explanations', name: 'Explanation Engine', icon: MessageSquare },
  { id: 'mapper', name: 'Syllabus Mapper', icon: GitBranch },
  { id: 'export', name: 'Export Center', icon: Download },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'admin', name: 'Admin Panel', icon: Settings },
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r h-full">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start h-11 px-3',
                activeTab === item.id 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Button>
          )
        })}
      </nav>
    </div>
  )
}