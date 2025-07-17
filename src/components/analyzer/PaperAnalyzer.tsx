import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  FileText, 
  Brain, 
  BarChart3, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Download
} from 'lucide-react'

export function PaperAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  const handleFileUpload = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setAnalysisResults({
            paperName: 'JEE Main 2024 - Mathematics',
            totalQuestions: 90,
            topics: [
              { name: 'Calculus', count: 25, percentage: 28 },
              { name: 'Algebra', count: 20, percentage: 22 },
              { name: 'Coordinate Geometry', count: 18, percentage: 20 },
              { name: 'Trigonometry', count: 15, percentage: 17 },
              { name: 'Probability', count: 12, percentage: 13 }
            ],
            difficulty: {
              easy: 30,
              medium: 45,
              hard: 25
            },
            markingScheme: '+4 for correct, -1 for incorrect'
          })
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleDownloadAnalysis = (paper: any) => {
    const content = `ExamPrep AI - Paper Analysis Report
Generated: ${new Date().toLocaleDateString()}

PAPER DETAILS:
Name: ${paper.name}
Questions: ${paper.questions}
Status: ${paper.status}
Date: ${paper.date}

ANALYSIS SUMMARY:
This is a simulated analysis report. In a real implementation, this would include:

• Detailed topic breakdown with percentages
• Difficulty distribution analysis
• Question pattern insights
• Marking scheme details
• Comparison with previous years
• Recommended study areas
• Performance predictions

The analysis would provide comprehensive insights to help students prepare effectively for their target exams.
`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analysis-${paper.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2 text-primary" />
            Upload Exam Paper
          </CardTitle>
          <CardDescription>
            Upload PDF files or structured datasets of past exam papers for analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="exam-name">Exam Name</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jee-main">JEE Main</SelectItem>
                  <SelectItem value="jee-advanced">JEE Advanced</SelectItem>
                  <SelectItem value="neet">NEET</SelectItem>
                  <SelectItem value="sat">SAT</SelectItem>
                  <SelectItem value="lsat">LSAT</SelectItem>
                  <SelectItem value="cbse">CBSE Board</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" placeholder="e.g., 2024" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Drop your files here</p>
            <p className="text-sm text-gray-500 mb-4">or click to browse</p>
            <Button onClick={handleFileUpload} disabled={isAnalyzing}>
              {isAnalyzing ? 'Analyzing...' : 'Upload Paper'}
            </Button>
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Analysis Progress</span>
                <span className="text-sm text-gray-500">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
              <p className="text-xs text-gray-500">
                Processing paper with OCR and NLP analysis...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResults && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Topic Analysis
              </CardTitle>
              <CardDescription>Distribution of topics in the paper</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">{analysisResults.paperName}</h3>
                  <Badge variant="secondary">{analysisResults.totalQuestions} Questions</Badge>
                </div>
                
                {analysisResults.topics.map((topic: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{topic.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{topic.count} questions</span>
                        <Badge variant="outline">{topic.percentage}%</Badge>
                      </div>
                    </div>
                    <Progress value={topic.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{analysisResults.difficulty.easy}%</div>
                    <div className="text-sm text-green-700">Easy</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{analysisResults.difficulty.medium}%</div>
                    <div className="text-sm text-yellow-700">Medium</div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{analysisResults.difficulty.hard}%</div>
                    <div className="text-sm text-red-700">Hard</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Marking Scheme</h4>
                  <p className="text-sm text-gray-600">{analysisResults.markingScheme}</p>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Analysis Status</h4>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600">Analysis Complete</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Analyses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            Recent Analyses
          </CardTitle>
          <CardDescription>Previously analyzed papers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'JEE Main 2024 - Physics', status: 'completed', questions: 90, date: '2 hours ago' },
              { name: 'NEET 2023 - Biology', status: 'completed', questions: 90, date: '1 day ago' },
              { name: 'SAT Math 2024', status: 'processing', questions: 58, date: '2 days ago' },
              { name: 'JEE Advanced 2023 - Chemistry', status: 'completed', questions: 54, date: '3 days ago' }
            ].map((paper, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{paper.name}</p>
                    <p className="text-sm text-gray-500">{paper.questions} questions • {paper.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {paper.status === 'completed' ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Complete
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Processing
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => handleDownloadAnalysis(paper)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}