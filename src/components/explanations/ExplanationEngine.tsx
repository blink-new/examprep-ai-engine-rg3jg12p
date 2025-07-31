import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MessageSquare, 
  Baby, 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'

export function ExplanationEngine() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [explanations, setExplanations] = useState<any>(null)
  const [questionText, setQuestionText] = useState("What is the derivative of f(x) = x³ + 2x² - 5x + 3?")

  const handleGenerate = async () => {
    setIsGenerating(true)
    
    try {
      // Import Blink client
      const { blink } = await import('@/blink/client')
      
      // Generate kid-friendly explanation
      const kidFriendlyPrompt = `Explain this question to a child (age 8-12) using simple analogies, storytelling, and fun examples. Use emojis and make it engaging:

Question: ${questionText}

Make it sound like a fun story that a kid would understand. Use analogies like cars, games, or everyday objects.`

      const { text: kidFriendlyText } = await blink.ai.generateText({
        prompt: kidFriendlyPrompt,
        maxTokens: 500
      })

      // Generate conceptual explanation
      const conceptualPrompt = `Explain this question by connecting school concepts to competitive exam expectations. Target audience: Class 11-12 students preparing for JEE/NEET.

Question: ${questionText}

Structure:
1. What you learned in school
2. How it applies to competitive exams
3. Step-by-step solution
4. Why this concept matters for exams

Make it educational and bridge the gap between school learning and exam preparation.`

      const { text: conceptualText } = await blink.ai.generateText({
        prompt: conceptualPrompt,
        maxTokens: 600
      })

      // Generate advanced explanation
      const advancedPrompt = `Provide an advanced, exam-focused explanation with time-saving strategies and pro tips. Target audience: Serious JEE/NEET aspirants.

Question: ${questionText}

Structure:
1. Quick solution method
2. Time-saving tips
3. Advanced applications
4. Exam-specific insights
5. Pro tips for competitive exams

Focus on efficiency, strategy, and advanced concepts.`

      const { text: advancedText } = await blink.ai.generateText({
        prompt: advancedPrompt,
        maxTokens: 600
      })

      setExplanations({
        question: questionText,
        kidFriendly: {
          title: "Kid-Friendly Explanation",
          content: kidFriendlyText
        },
        conceptual: {
          title: "Conceptual Explanation", 
          content: conceptualText
        },
        advanced: {
          title: "Advanced Explanation",
          content: advancedText
        }
      })
    } catch (error) {
      console.error('Error generating explanations:', error)
      alert('Failed to generate explanations. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
            Generate AI Explanations
          </CardTitle>
          <CardDescription>
            Create three types of explanations: kid-friendly, conceptual, and advanced
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Question</label>
            <Textarea 
              placeholder="Enter the question you want to explain..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Explanations
                </>
              )}
            </Button>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Target:</span>
              <Badge variant="outline">Class 11</Badge>
              <Badge variant="outline">JEE Main</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Explanations */}
      {explanations && (
        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Explanations</CardTitle>
            <CardDescription>Three different explanation styles for diverse learning needs</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="kid-friendly" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="kid-friendly" className="flex items-center space-x-2">
                  <Baby className="h-4 w-4" />
                  <span>Kid-Friendly</span>
                </TabsTrigger>
                <TabsTrigger value="conceptual" className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Conceptual</span>
                </TabsTrigger>
                <TabsTrigger value="advanced" className="flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Advanced</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="kid-friendly" className="mt-6">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-purple-900 flex items-center">
                      <Baby className="h-5 w-5 mr-2" />
                      {explanations.kidFriendly.title}
                    </h3>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="prose prose-purple max-w-none">
                    <p className="text-purple-800 whitespace-pre-line leading-relaxed">
                      {explanations.kidFriendly.content}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      Age 8-12
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      Storytelling
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      Visual Analogies
                    </Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="conceptual" className="mt-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-blue-900 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      {explanations.conceptual.title}
                    </h3>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="prose prose-blue max-w-none">
                    <p className="text-blue-800 whitespace-pre-line leading-relaxed">
                      {explanations.conceptual.content}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      School to Exam Bridge
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Conceptual Understanding
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Cross-Subject Links
                    </Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="mt-6">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-emerald-900 flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      {explanations.advanced.title}
                    </h3>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="prose prose-emerald max-w-none">
                    <p className="text-emerald-800 whitespace-pre-line leading-relaxed font-mono text-sm">
                      {explanations.advanced.content}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                      Exam Strategy
                    </Badge>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                      Time-Saving Tips
                    </Badge>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                      Advanced Applications
                    </Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Rate this explanation:</span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Needs work
                    </Button>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Explanation Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Baby className="h-4 w-4 mr-2 text-pink-600" />
              Kid-Friendly Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Rating</span>
                <span className="text-sm font-medium">4.8/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Generated</span>
                <span className="text-sm font-medium">2,847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="text-sm font-medium text-green-600">94%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
              Conceptual Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Rating</span>
                <span className="text-sm font-medium">4.9/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Generated</span>
                <span className="text-sm font-medium">3,156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="text-sm font-medium text-green-600">96%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <GraduationCap className="h-4 w-4 mr-2 text-emerald-600" />
              Advanced Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Rating</span>
                <span className="text-sm font-medium">4.7/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Generated</span>
                <span className="text-sm font-medium">1,923</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="text-sm font-medium text-green-600">92%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}