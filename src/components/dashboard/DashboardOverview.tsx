import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  FileText, 
  Zap, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export function DashboardOverview() {
  const stats = [
    {
      title: 'Papers Analyzed',
      value: '1,247',
      change: '+12%',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Questions Generated',
      value: '15,832',
      change: '+8%',
      icon: Zap,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Explanations Created',
      value: '47,496',
      change: '+15%',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'AI Processing Time',
      value: '2.3s',
      change: '-5%',
      icon: Brain,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  const recentActivity = [
    {
      action: 'JEE Main 2024 Paper Analyzed',
      status: 'completed',
      time: '2 minutes ago',
      details: '450 questions processed, 23 topics identified'
    },
    {
      action: 'NEET Biology Questions Generated',
      status: 'completed',
      time: '5 minutes ago',
      details: '100 adaptive questions created for Class 11'
    },
    {
      action: 'SAT Math Explanations',
      status: 'processing',
      time: '8 minutes ago',
      details: 'Generating kid-friendly explanations...'
    },
    {
      action: 'CBSE Syllabus Mapping',
      status: 'completed',
      time: '12 minutes ago',
      details: 'Physics Class 12 mapped to JEE Advanced'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                      <span className="text-sm text-gray-500 ml-1">vs last week</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Engine Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-primary" />
              AI Engine Status
            </CardTitle>
            <CardDescription>Real-time processing capabilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Question Generation</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <Progress value={92} className="h-2" />
              <p className="text-xs text-gray-500">92% capacity • Processing 15 requests</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Paper Analysis</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">Active</Badge>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-gray-500">78% capacity • Analyzing 3 papers</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Explanation Engine</span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">Active</Badge>
              </div>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-gray-500">65% capacity • Generating explanations</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest AI processing tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="mt-1">
                    {activity.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-500 animate-pulse" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <FileText className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900">Upload New Paper</h3>
              <p className="text-sm text-gray-500 mt-1">Analyze a new exam paper</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Zap className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Generate Questions</h3>
              <p className="text-sm text-gray-500 mt-1">Create adaptive practice questions</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <MessageSquare className="h-8 w-8 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900">Create Explanations</h3>
              <p className="text-sm text-gray-500 mt-1">Generate multi-level explanations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}