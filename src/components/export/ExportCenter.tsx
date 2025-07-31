import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { 
  Download, 
  FileText, 
  Image, 
  BookOpen, 
  Clock,
  CheckCircle,
  RefreshCw
} from 'lucide-react'

export function ExportCenter() {
  const [isExporting, setIsExporting] = useState(false)
  const [exportType, setExportType] = useState('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handlePDFExport = (content: any[]) => {
    const pdfContent = `ExamPrep AI - Export Report
Generated: ${new Date().toLocaleDateString()}

EXPORTED CONTENT:
${content.map(item => `
• ${item.title}
  Type: ${item.type}
  Generated: ${item.date}
  Size: ${item.size}
`).join('')}

This is a simulated PDF export. In a real implementation, this would generate a properly formatted PDF with:
- Question papers with proper formatting
- Analysis reports with charts and graphs  
- Syllabus mappings with visual diagrams
- Explanations with proper typography

The PDF would include:
✓ Professional formatting
✓ Charts and visualizations
✓ Proper page breaks
✓ Table of contents
✓ Headers and footers
`

    downloadFile(pdfContent, 'export-report.pdf', 'application/pdf')
  }

  const handleMindmapExport = (content: any[]) => {
    const mindmapContent = `ExamPrep AI - Mindmap Export
Generated: ${new Date().toLocaleDateString()}

MINDMAP STRUCTURE:
${content.map(item => `
${item.title}
├── Type: ${item.type}
├── Generated: ${item.date}
└── Size: ${item.size}
`).join('')}

This is a simulated mindmap export. In a real implementation, this would generate:
- Visual mindmaps in PNG/SVG format
- Interactive HTML mindmaps
- Hierarchical topic structures
- Color-coded difficulty levels
- Clickable nodes with detailed information

Mindmap Features:
✓ Visual topic relationships
✓ Difficulty color coding
✓ Interactive navigation
✓ Export to multiple formats
✓ Customizable themes
`

    downloadFile(mindmapContent, 'mindmap-export.html', 'text/html')
  }

  const handleTextExport = (content: any[]) => {
    const textContent = `ExamPrep AI - Text Export
Generated: ${new Date().toLocaleDateString()}

EXPORTED CONTENT:
${content.map(item => `
=== ${item.title} ===
Type: ${item.type}
Generated: ${item.date}
Size: ${item.size}

[Content would be included here in full detail]

`).join('')}

This text export includes all selected content in a clean, readable format suitable for:
- Offline studying
- Printing
- Email sharing
- Import into other applications
`

    downloadFile(textContent, 'export-content.txt', 'text/plain')
  }

  const availableContent = [
    { id: '1', type: 'questions', title: 'JEE Main Mathematics - 20 Questions', date: '2 hours ago', size: '15 KB' },
    { id: '2', type: 'paper', title: 'NEET Biology Analysis Report', date: '1 day ago', size: '45 KB' },
    { id: '3', type: 'mapping', title: 'Class 11 CBSE → JEE Syllabus Map', date: '2 days ago', size: '12 KB' },
    { id: '4', type: 'questions', title: 'SAT Math Practice Set - 50 Questions', date: '3 days ago', size: '28 KB' },
    { id: '5', type: 'explanations', title: 'Calculus Explanations (3 Types)', date: '1 week ago', size: '22 KB' }
  ]

  const handleExport = async () => {
    if (!exportType || selectedItems.length === 0) {
      alert('Please select export type and items')
      return
    }

    setIsExporting(true)

    // Simulate export process
    setTimeout(() => {
      const selectedContent = availableContent.filter(item => selectedItems.includes(item.id))
      
      if (exportType === 'pdf') {
        handlePDFExport(selectedContent)
      } else if (exportType === 'mindmap') {
        handleMindmapExport(selectedContent)
      } else if (exportType === 'text') {
        handleTextExport(selectedContent)
      }

      setIsExporting(false)
    }, 2000)
  }

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const selectAll = () => {
    setSelectedItems(availableContent.map(item => item.id))
  }

  const clearSelection = () => {
    setSelectedItems([])
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'questions': return <FileText className="h-4 w-4" />
      case 'paper': return <BookOpen className="h-4 w-4" />
      case 'mapping': return <Image className="h-4 w-4" />
      case 'explanations': return <FileText className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      questions: 'bg-blue-100 text-blue-800',
      paper: 'bg-green-100 text-green-800',
      mapping: 'bg-purple-100 text-purple-800',
      explanations: 'bg-orange-100 text-orange-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Export Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="h-5 w-5 mr-2 text-primary" />
            Export Configuration
          </CardTitle>
          <CardDescription>
            Select content and format for export
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Export Format</Label>
              <Select value={exportType} onValueChange={setExportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="mindmap">Mindmap (PNG/HTML)</SelectItem>
                  <SelectItem value="text">Plain Text</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Selected Items</Label>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{selectedItems.length} selected</Badge>
                <Button variant="ghost" size="sm" onClick={selectAll}>
                  Select All
                </Button>
                <Button variant="ghost" size="sm" onClick={clearSelection}>
                  Clear
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Actions</Label>
              <Button onClick={handleExport} disabled={isExporting} className="w-full">
                {isExporting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export Selected
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Content */}
      <Card>
        <CardHeader>
          <CardTitle>Available Content</CardTitle>
          <CardDescription>Select items to include in your export</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {availableContent.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => toggleItemSelection(item.id)}
                />
                <div className="p-2 bg-gray-50 rounded-lg">
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <Badge variant="secondary" className={getTypeBadge(item.type)}>
                      {item.type}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.date}
                    </span>
                    <span>{item.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Formats Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <FileText className="h-4 w-4 mr-2 text-red-600" />
              PDF Export
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Professional formatting</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Charts and graphs</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Print-ready quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Table of contents</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Image className="h-4 w-4 mr-2 text-purple-600" />
              Mindmap Export
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Visual topic maps</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Interactive HTML</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Color-coded difficulty</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>PNG/SVG formats</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
              Text Export
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Clean formatting</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Easy to share</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Offline access</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Import compatible</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Exports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            Recent Exports
          </CardTitle>
          <CardDescription>Your export history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'JEE Main Math Questions.pdf', type: 'PDF', size: '2.3 MB', date: '1 hour ago' },
              { name: 'Physics Syllabus Map.html', type: 'Mindmap', size: '856 KB', date: '3 hours ago' },
              { name: 'Chemistry Analysis.txt', type: 'Text', size: '45 KB', date: '1 day ago' },
              { name: 'NEET Biology Set.pdf', type: 'PDF', size: '1.8 MB', date: '2 days ago' }
            ].map((export_, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Download className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{export_.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{export_.type}</span>
                      <span>{export_.size}</span>
                      <span>{export_.date}</span>
                    </div>
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