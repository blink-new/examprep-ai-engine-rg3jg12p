import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  Brain,
  FileText,
  Zap,
  MessageSquare,
  Download,
  Calendar,
  Activity
} from 'lucide-react'

export function Analytics() {
  const overallStats = [
    {
      title: 'Total Questions Generated',
      value: '15,847',
      change: '+12.5%',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Papers Analyzed',
      value: '1,247',
      change: '+8.3%',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Explanations Created',
      value: '47,541',
      change: '+15.7%',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Active Users',
      value: '2,834',
      change: '+23.1%',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  const subjectPerformance = [
    { subject: 'Mathematics', questions: 5847, accuracy: 78, trend: '+5%' },
    { subject: 'Physics', questions: 4231, accuracy: 72, trend: '+3%' },
    { subject: 'Chemistry', questions: 3456, accuracy: 81, trend: '+7%' },
    { subject: 'Biology', questions: 2313, accuracy: 85, trend: '+2%' }
  ]

  const examTypeDistribution = [
    { exam: 'JEE Main', percentage: 35, questions: 5546, color: 'bg-blue-500' },
    { exam: 'NEET', percentage: 28, questions: 4437, color: 'bg-green-500' },
    { exam: 'JEE Advanced', percentage: 20, questions: 3169, color: 'bg-purple-500' },
    { exam: 'SAT', percentage: 12, questions: 1902, color: 'bg-orange-500' },
    { exam: 'Others', percentage: 5, questions: 793, color: 'bg-gray-500' }
  ]

  const difficultyAnalysis = [
    { level: 'Easy', count: 6234, percentage: 39, color: 'bg-green-500' },
    { level: 'Medium', count: 7123, percentage: 45, color: 'bg-yellow-500' },
    { level: 'Hard', count: 2490, percentage: 16, color: 'bg-red-500' }
  ]

  const recentActivity = [
    { action: 'Question Generation Peak', time: '2:30 PM', details: '450 questions generated in 1 hour' },
    { action: 'New User Milestone', time: '1:15 PM', details: '2,800+ active users reached' },
    { action: 'Paper Analysis Completed', time: '11:45 AM', details: 'JEE Main 2024 Physics analyzed' },
    { action: 'System Performance', time: '10:20 AM', details: 'Average response time: 1.8s' }
  ]

  const topTopics = [
    { topic: 'Calculus', questions: 1247, difficulty: 'Medium', popularity: 92 },
    { topic: 'Organic Chemistry', questions: 1156, difficulty: 'Hard', popularity: 88 },
    { topic: 'Mechanics', questions: 1089, difficulty: 'Medium', popularity: 85 },
    { topic: 'Algebra', questions: 987, difficulty: 'Easy', popularity: 82 },
    { topic: 'Thermodynamics', questions: 876, difficulty: 'Hard', popularity: 79 }
  ]

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Comprehensive insights into AI engine performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select defaultValue="7d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat) => {
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
        {/* Subject Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-primary" />
              Subject Performance
            </CardTitle>
            <CardDescription>Question generation and accuracy by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectPerformance.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{subject.subject}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{subject.questions} questions</Badge>
                      <span className="text-sm text-green-600 font-medium">{subject.trend}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Progress value={subject.accuracy} className="h-2 flex-1" />
                    <span className="text-sm font-medium w-12">{subject.accuracy}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Exam Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-primary" />
              Exam Type Distribution
            </CardTitle>
            <CardDescription>Questions generated by target exam</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {examTypeDistribution.map((exam, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{exam.exam}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{exam.questions} questions</span>
                      <Badge variant="outline">{exam.percentage}%</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${exam.color}`}
                      style={{ width: `${exam.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Difficulty Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-primary" />
              Difficulty Analysis
            </CardTitle>
            <CardDescription>Question difficulty distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {difficultyAnalysis.map((level, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded ${level.color}`}></div>
                    <span className="text-sm font-medium">{level.level}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{level.count}</div>
                    <div className="text-xs text-gray-500">{level.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Topics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Top Topics
            </CardTitle>
            <CardDescription>Most popular question topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div>
                    <div className="font-medium text-sm">{topic.topic}</div>
                    <div className="text-xs text-gray-500">{topic.questions} questions</div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant="outline" 
                      className={
                        topic.difficulty === 'Easy' ? 'border-green-500 text-green-700' :
                        topic.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-700' :
                        'border-red-500 text-red-700'
                      }
                    >
                      {topic.difficulty}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">{topic.popularity}% popular</div>
                  </div>
                </div>
              ))}
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
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Performance Metrics
          </CardTitle>
          <CardDescription>System performance and efficiency indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1.8s</div>
              <div className="text-sm text-blue-700">Avg Response Time</div>
              <div className="text-xs text-blue-600 mt-1">↓ 0.3s from last week</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">99.2%</div>
              <div className="text-sm text-green-700">System Uptime</div>
              <div className="text-xs text-green-600 mt-1">↑ 0.1% from last week</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">94%</div>
              <div className="text-sm text-purple-700">AI Accuracy</div>
              <div className="text-xs text-purple-600 mt-1">↑ 2% from last week</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">847</div>
              <div className="text-sm text-orange-700">Questions/Hour</div>
              <div className="text-xs text-orange-600 mt-1">↑ 12% from last week</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}