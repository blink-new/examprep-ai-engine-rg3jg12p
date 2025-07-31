import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Settings, 
  Database, 
  Users, 
  Upload, 
  Brain,
  Shield,
  Server,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Trash2,
  Edit
} from 'lucide-react'

export function AdminPanel() {
  const [isUploading, setIsUploading] = useState(false)
  const [systemStatus, setSystemStatus] = useState({
    aiEngine: 'active',
    database: 'active',
    storage: 'active',
    api: 'active'
  })

  const handleDatasetUpload = async () => {
    setIsUploading(true)
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false)
      alert('Dataset uploaded successfully!')
    }, 2000)
  }

  const examDatasets = [
    { id: 1, name: 'JEE Main 2024', papers: 24, questions: 2160, status: 'active', lastUpdated: '2 days ago' },
    { id: 2, name: 'NEET 2023-2024', papers: 18, questions: 1620, status: 'active', lastUpdated: '1 week ago' },
    { id: 3, name: 'SAT Math 2024', papers: 12, questions: 696, status: 'active', lastUpdated: '3 days ago' },
    { id: 4, name: 'JEE Advanced 2023', papers: 8, questions: 432, status: 'inactive', lastUpdated: '2 weeks ago' }
  ]

  const systemUsers = [
    { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah@university.edu', role: 'Admin', status: 'active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Prof. Michael Chen', email: 'mchen@institute.org', role: 'Moderator', status: 'active', lastLogin: '1 day ago' },
    { id: 3, name: 'Alex Rodriguez', email: 'alex@school.edu', role: 'Teacher', status: 'active', lastLogin: '3 hours ago' },
    { id: 4, name: 'Emma Wilson', email: 'emma@college.edu', role: 'Teacher', status: 'inactive', lastLogin: '1 week ago' }
  ]

  const aiModels = [
    { name: 'Question Generator', version: 'v2.1.0', status: 'active', accuracy: '94%', lastTrained: '1 week ago' },
    { name: 'Paper Analyzer', version: 'v1.8.3', status: 'active', accuracy: '96%', lastTrained: '3 days ago' },
    { name: 'Explanation Engine', version: 'v1.5.2', status: 'active', accuracy: '92%', lastTrained: '5 days ago' },
    { name: 'Syllabus Mapper', version: 'v1.2.1', status: 'maintenance', accuracy: '89%', lastTrained: '2 weeks ago' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
          <p className="text-gray-600">System administration and configuration</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <Shield className="h-3 w-3 mr-1" />
          Admin Access
        </Badge>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Server className="h-5 w-5 mr-2 text-primary" />
            System Status
          </CardTitle>
          <CardDescription>Real-time system health monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(systemStatus).map(([service, status]) => (
              <div key={service} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  {status === 'active' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="font-medium capitalize">{service.replace(/([A-Z])/g, ' $1')}</span>
                </div>
                <Badge 
                  variant="secondary" 
                  className={status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                >
                  {status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="datasets" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="ai-models">AI Models</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Dataset Management */}
        <TabsContent value="datasets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2 text-primary" />
                Upload New Dataset
              </CardTitle>
              <CardDescription>Add new exam papers and datasets to the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Exam Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jee-main">JEE Main</SelectItem>
                      <SelectItem value="jee-advanced">JEE Advanced</SelectItem>
                      <SelectItem value="neet">NEET</SelectItem>
                      <SelectItem value="sat">SAT</SelectItem>
                      <SelectItem value="lsat">LSAT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input placeholder="e.g., 2024" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Brief description of the dataset..." />
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Drop files here or click to browse</p>
                <p className="text-xs text-gray-500 mt-1">Supports PDF, JSON, CSV formats</p>
              </div>

              <Button onClick={handleDatasetUpload} disabled={isUploading} className="w-full">
                {isUploading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Dataset
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-primary" />
                Existing Datasets
              </CardTitle>
              <CardDescription>Manage uploaded exam datasets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {examDatasets.map((dataset) => (
                  <div key={dataset.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Database className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{dataset.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{dataset.papers} papers</span>
                          <span>{dataset.questions} questions</span>
                          <span>Updated {dataset.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="secondary" 
                        className={dataset.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                      >
                        {dataset.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                User Management
              </CardTitle>
              <CardDescription>Manage system users and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{user.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{user.email}</span>
                          <span>Last login: {user.lastLogin}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline"
                        className={
                          user.role === 'Admin' ? 'border-red-500 text-red-700' :
                          user.role === 'Moderator' ? 'border-orange-500 text-orange-700' :
                          'border-blue-500 text-blue-700'
                        }
                      >
                        {user.role}
                      </Badge>
                      <Badge 
                        variant="secondary" 
                        className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                      >
                        {user.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Models */}
        <TabsContent value="ai-models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-primary" />
                AI Model Management
              </CardTitle>
              <CardDescription>Monitor and manage AI model performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiModels.map((model, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <Brain className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{model.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Version {model.version}</span>
                          <span>Accuracy: {model.accuracy}</span>
                          <span>Last trained: {model.lastTrained}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="secondary" 
                        className={
                          model.status === 'active' ? 'bg-green-100 text-green-800' :
                          model.status === 'maintenance' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }
                      >
                        {model.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-primary" />
                System Configuration
              </CardTitle>
              <CardDescription>Configure system-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">AI Engine Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-scaling">Auto Scaling</Label>
                      <Switch id="auto-scaling" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="batch-processing">Batch Processing</Label>
                      <Switch id="batch-processing" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="cache-enabled">Cache Enabled</Label>
                      <Switch id="cache-enabled" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Security Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="two-factor">Two-Factor Auth</Label>
                      <Switch id="two-factor" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="audit-logs">Audit Logging</Label>
                      <Switch id="audit-logs" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="rate-limiting">Rate Limiting</Label>
                      <Switch id="rate-limiting" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <div className="flex space-x-3">
                  <Button>Save Settings</Button>
                  <Button variant="outline">Reset to Default</Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Config
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}