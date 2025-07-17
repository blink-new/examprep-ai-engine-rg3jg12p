import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  GitBranch, 
  Target, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Download
} from 'lucide-react'

export function SyllabusMapper() {
  const [isMapping, setIsMapping] = useState(false)
  const [mappingResults, setMappingResults] = useState<any>(null)
  const [formData, setFormData] = useState({
    classLevel: '',
    board: '',
    subject: '',
    targetExam: ''
  })

  const handleMapping = async () => {
    if (!formData.classLevel || !formData.board || !formData.subject || !formData.targetExam) {
      alert('Please fill in all fields')
      return
    }

    setIsMapping(true)
    
    // Simulate mapping analysis
    setTimeout(() => {
      setMappingResults({
        schoolCurriculum: `Class ${formData.classLevel} ${formData.board} ${formData.subject}`,
        targetExam: formData.targetExam,
        overlapPercentage: 78,
        overlappingTopics: [
          { 
            schoolTopic: 'Quadratic Equations', 
            examTopic: 'Quadratic Equations & Inequalities', 
            overlap: 95,
            status: 'complete'
          },
          { 
            schoolTopic: 'Coordinate Geometry', 
            examTopic: 'Analytical Geometry', 
            overlap: 85,
            status: 'partial'
          },
          { 
            schoolTopic: 'Trigonometry', 
            examTopic: 'Trigonometric Functions', 
            overlap: 90,
            status: 'complete'
          },
          { 
            schoolTopic: 'Probability', 
            examTopic: 'Probability & Statistics', 
            overlap: 70,
            status: 'partial'
          }
        ],
        gaps: [
          { topic: 'Complex Numbers', importance: 'High', examWeightage: '8%' },
          { topic: 'Matrices & Determinants', importance: 'Medium', examWeightage: '6%' },
          { topic: 'Differential Equations', importance: 'High', examWeightage: '10%' }
        ],
        recommendations: [
          'Focus on Complex Numbers - not covered in Class 11 but crucial for JEE',
          'Strengthen Coordinate Geometry with advanced problems',
          'Practice more Probability word problems for exam pattern'
        ]
      })
      setIsMapping(false)
    }, 2000)
  }

  const handleDownloadMapping = () => {
    if (!mappingResults) return

    const content = `Syllabus Mapping Report
Generated: ${new Date().toLocaleDateString()}

School Curriculum: ${mappingResults.schoolCurriculum}
Target Exam: ${mappingResults.targetExam}
Overall Overlap: ${mappingResults.overlapPercentage}%

OVERLAPPING TOPICS:
${mappingResults.overlappingTopics.map((topic: any) => `
• ${topic.schoolTopic} → ${topic.examTopic}
  Overlap: ${topic.overlap}% | Status: ${topic.status}
`).join('')}

KNOWLEDGE GAPS:
${mappingResults.gaps.map((gap: any) => `
• ${gap.topic}
  Importance: ${gap.importance} | Exam Weightage: ${gap.examWeightage}
`).join('')}

RECOMMENDATIONS:
${mappingResults.recommendations.map((rec: string, index: number) => `${index + 1}. ${rec}`).join('\n')}
`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `syllabus-mapping-${formData.subject}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Mapping Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GitBranch className="h-5 w-5 mr-2 text-primary" />
            Syllabus Mapping Configuration
          </CardTitle>
          <CardDescription>
            Map school curriculum topics to competitive exam syllabi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Class Level</Label>
              <Select value={formData.classLevel} onValueChange={(value) => setFormData({...formData, classLevel: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">Class 6</SelectItem>
                  <SelectItem value="7">Class 7</SelectItem>
                  <SelectItem value="8">Class 8</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                  <SelectItem value="11">Class 11</SelectItem>
                  <SelectItem value="12">Class 12</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Board</Label>
              <Select value={formData.board} onValueChange={(value) => setFormData({...formData, board: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select board" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cbse">CBSE</SelectItem>
                  <SelectItem value="icse">ICSE</SelectItem>
                  <SelectItem value="state">State Board</SelectItem>
                  <SelectItem value="ib">IB</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Target Exam</Label>
              <Select value={formData.targetExam} onValueChange={(value) => setFormData({...formData, targetExam: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target exam" />
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
          </div>

          <Button onClick={handleMapping} disabled={isMapping} className="w-full">
            {isMapping ? 'Analyzing Syllabus...' : 'Generate Mapping'}
          </Button>
        </CardContent>
      </Card>

      {/* Mapping Results */}
      {mappingResults && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overlap Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Overlap Analysis
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {mappingResults.overlapPercentage}% Match
                </Badge>
              </CardTitle>
              <CardDescription>
                {mappingResults.schoolCurriculum} → {mappingResults.targetExam}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Alignment</span>
                    <span className="text-sm text-gray-500">{mappingResults.overlapPercentage}%</span>
                  </div>
                  <Progress value={mappingResults.overlapPercentage} className="h-3" />
                </div>

                {mappingResults.overlappingTopics.map((topic: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{topic.schoolTopic}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{topic.examTopic}</span>
                      </div>
                      {topic.status === 'complete' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <Progress value={topic.overlap} className="h-2 flex-1 mr-3" />
                      <Badge 
                        variant="outline" 
                        className={topic.status === 'complete' ? 'border-green-500 text-green-700' : 'border-orange-500 text-orange-700'}
                      >
                        {topic.overlap}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Gaps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                Knowledge Gaps
              </CardTitle>
              <CardDescription>Topics not covered in school curriculum</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mappingResults.gaps.map((gap: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4 bg-orange-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-orange-900">{gap.topic}</h4>
                      <Badge 
                        variant="outline" 
                        className={
                          gap.importance === 'High' ? 'border-red-500 text-red-700' :
                          gap.importance === 'Medium' ? 'border-orange-500 text-orange-700' :
                          'border-yellow-500 text-yellow-700'
                        }
                      >
                        {gap.importance}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-orange-700">Exam Weightage</span>
                      <span className="text-sm font-medium text-orange-900">{gap.examWeightage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recommendations */}
      {mappingResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                AI Recommendations
              </div>
              <Button variant="outline" size="sm" onClick={handleDownloadMapping}>
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </CardTitle>
            <CardDescription>Personalized study recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mappingResults.recommendations.map((rec: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <p className="text-sm text-blue-800 flex-1">{rec}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Mappings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            Recent Mappings
          </CardTitle>
          <CardDescription>Previously generated syllabus mappings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { curriculum: 'Class 11 CBSE Physics', exam: 'JEE Main', overlap: 82, date: '2 hours ago' },
              { curriculum: 'Class 12 CBSE Chemistry', exam: 'NEET', overlap: 89, date: '1 day ago' },
              { curriculum: 'Class 10 ICSE Mathematics', exam: 'JEE Main', overlap: 65, date: '2 days ago' }
            ].map((mapping, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <GitBranch className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{mapping.curriculum} → {mapping.exam}</p>
                    <p className="text-sm text-gray-500">{mapping.overlap}% overlap • {mapping.date}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}