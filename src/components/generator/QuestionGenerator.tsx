import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { 
  Zap, 
  Settings, 
  Play, 
  RefreshCw, 
  Copy, 
  Download,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

export function QuestionGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([])
  const [difficulty, setDifficulty] = useState([50])
  const [formData, setFormData] = useState({
    classLevel: '',
    board: '',
    subject: '',
    targetExam: '',
    questionType: '',
    topic: '',
    quantity: 10,
    timeLimit: 30
  })

  const handleGenerate = async () => {
    if (!formData.classLevel || !formData.subject || !formData.targetExam) {
      alert('Please fill in all required fields')
      return
    }

    setIsGenerating(true)
    
    // Generate the requested number of questions
    const sampleQuestions = [
      {
        question: "What is the derivative of f(x) = x³ + 2x² - 5x + 3?",
        options: ["3x² + 4x - 5", "3x² + 4x + 5", "x³ + 4x - 5", "3x + 4x² - 5"],
        correct: 0,
        topic: "Calculus",
        difficulty: "Medium"
      },
      {
        question: "If the roots of the equation x² - px + q = 0 are α and β, then α + β equals:",
        options: ["p", "-p", "q", "-q"],
        correct: 0,
        topic: "Algebra",
        difficulty: "Easy"
      },
      {
        question: "The value of sin(π/6) is:",
        options: ["1/2", "√3/2", "1", "0"],
        correct: 0,
        topic: "Trigonometry",
        difficulty: "Easy"
      },
      {
        question: "What is the integral of 2x dx?",
        options: ["x²", "x² + C", "2x²", "2x² + C"],
        correct: 1,
        topic: "Integration",
        difficulty: "Medium"
      },
      {
        question: "The slope of the line passing through (1,2) and (3,6) is:",
        options: ["2", "3", "4", "1"],
        correct: 0,
        topic: "Coordinate Geometry",
        difficulty: "Easy"
      }
    ]

    setTimeout(() => {
      const questions = []
      for (let i = 0; i < formData.quantity; i++) {
        const baseQuestion = sampleQuestions[i % sampleQuestions.length]
        questions.push({
          id: i + 1,
          question: baseQuestion.question,
          options: baseQuestion.options,
          correct: baseQuestion.correct,
          topic: baseQuestion.topic,
          difficulty: baseQuestion.difficulty,
          examType: formData.targetExam,
          classLevel: formData.classLevel,
          board: formData.board,
          subject: formData.subject
        })
      }
      setGeneratedQuestions(questions)
      setIsGenerating(false)
    }, 2000)
  }

  const handleDownload = () => {
    if (generatedQuestions.length === 0) return

    const content = `ExamPrep AI - Generated Questions
Class: ${formData.classLevel} | Board: ${formData.board} | Subject: ${formData.subject}
Target Exam: ${formData.targetExam} | Generated: ${new Date().toLocaleDateString()}

${generatedQuestions.map((q, index) => `
Question ${index + 1}: ${q.question}
Topic: ${q.topic} | Difficulty: ${q.difficulty}

Options:
${q.options.map((opt: string, i: number) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n')}

Correct Answer: ${String.fromCharCode(65 + q.correct)}. ${q.options[q.correct]}

---
`).join('')}`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `questions-${formData.subject}-${formData.classLevel}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Generation Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2 text-primary" />
            Question Generation Settings
          </CardTitle>
          <CardDescription>
            Configure parameters for adaptive question generation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="class-level">Class Level</Label>
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
              <Label htmlFor="board">Board</Label>
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
              <Label htmlFor="subject">Subject</Label>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target-exam">Target Exam</Label>
              <Select value={formData.targetExam} onValueChange={(value) => setFormData({...formData, targetExam: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jee-main">JEE Main</SelectItem>
                  <SelectItem value="jee-advanced">JEE Advanced</SelectItem>
                  <SelectItem value="neet">NEET</SelectItem>
                  <SelectItem value="sat">SAT</SelectItem>
                  <SelectItem value="boards">Board Exams</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="question-type">Question Type</Label>
              <Select value={formData.questionType} onValueChange={(value) => setFormData({...formData, questionType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mcq">Multiple Choice (MCQ)</SelectItem>
                  <SelectItem value="numerical">Numerical Answer</SelectItem>
                  <SelectItem value="subjective">Subjective</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Specific Topic (Optional)</Label>
            <Input 
              id="topic" 
              placeholder="e.g., Quadratic Equations, Thermodynamics" 
              value={formData.topic}
              onChange={(e) => setFormData({...formData, topic: e.target.value})}
            />
          </div>

          <div className="space-y-3">
            <Label>Difficulty Level: {difficulty[0]}%</Label>
            <Slider
              value={difficulty}
              onValueChange={setDifficulty}
              max={100}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Easy</span>
              <span>Medium</span>
              <span>Hard</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Number of Questions</Label>
              <Input 
                id="quantity" 
                type="number" 
                placeholder="10" 
                min="1" 
                max="100" 
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 10})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time-limit">Time Limit (minutes)</Label>
              <Input 
                id="time-limit" 
                type="number" 
                placeholder="30" 
                value={formData.timeLimit}
                onChange={(e) => setFormData({...formData, timeLimit: parseInt(e.target.value) || 30})}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <Button onClick={handleGenerate} disabled={isGenerating} className="flex-1">
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Generate Questions
                </>
              )}
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Advanced
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Questions */}
      {generatedQuestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-primary" />
                Generated Questions
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Questions
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              AI-generated adaptive questions based on your settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {generatedQuestions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-6 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Q{index + 1}</Badge>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {question.topic}
                      </Badge>
                      <Badge 
                        variant="secondary" 
                        className={
                          question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {question.difficulty}
                      </Badge>
                      <Badge variant="outline">{question.examType}</Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {question.question}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {question.options.map((option: string, optionIndex: number) => (
                      <div 
                        key={optionIndex} 
                        className={`p-3 border rounded-lg ${
                          optionIndex === question.correct 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        } transition-colors`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-700">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          <span className={optionIndex === question.correct ? 'text-green-800' : 'text-gray-900'}>
                            {option}
                          </span>
                          {optionIndex === question.correct && (
                            <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Estimated time: 2-3 minutes</span>
                      <span>•</span>
                      <span>Marks: +4, -1</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Explanations
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
            Generation Insights
          </CardTitle>
          <CardDescription>AI recommendations for better question generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-blue-900">Topic Balance</p>
                <p className="text-sm text-blue-700">Consider including more Coordinate Geometry questions for JEE Main preparation</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-green-900">Difficulty Progression</p>
                <p className="text-sm text-green-700">Good difficulty distribution for adaptive learning</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-orange-900">Exam Pattern</p>
                <p className="text-sm text-orange-700">Questions align well with recent JEE Main patterns</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}