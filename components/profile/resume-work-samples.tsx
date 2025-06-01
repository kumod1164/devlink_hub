"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUp, FileText, Download, Trash2, Plus, File } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ResumeWorkSamplesProps {
  resume: {
    url: string
    lastUpdated: string
  }
  workSamples: Array<{
    id: number
    name: string
    type: string
    url: string
    size: string
  }>
  isEditing: boolean
}

export default function ResumeWorkSamples({
  resume,
  workSamples: initialWorkSamples,
  isEditing,
}: ResumeWorkSamplesProps) {
  const [workSamples, setWorkSamples] = useState(initialWorkSamples)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileUpload = () => {
    // Simulate file upload
    setUploading(true)
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setUploading(false)
        // Add new sample
        const newSample = {
          id: Date.now(),
          name: "New Sample Document.pdf",
          type: "pdf",
          url: "/sample-document.pdf",
          size: "1.8 MB",
        }
        setWorkSamples([...workSamples, newSample])
      }
    }, 300)
  }

  const handleDeleteSample = (id: number) => {
    setWorkSamples(workSamples.filter((sample) => sample.id !== id))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <div className="space-y-8">
      {/* Resume Section */}
      <Card>
        <CardHeader>
          <CardTitle>Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-6 bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-medium">My Resume</h3>
                  <p className="text-sm text-slate-500">Last updated: {formatDate(resume.lastUpdated)}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                {isEditing && (
                  <Button size="sm">
                    <FileUp className="h-4 w-4 mr-2" />
                    Update
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Samples Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Work Samples & Certificates</CardTitle>
          {isEditing && (
            <Button size="sm" onClick={handleFileUpload} disabled={uploading}>
              <Plus className="h-4 w-4 mr-2" />
              Add File
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {uploading && (
            <motion.div
              className="mb-6 p-4 border rounded-lg bg-slate-50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <File className="h-4 w-4 mr-2 text-slate-500" />
                  <span className="text-sm">Uploading file...</span>
                </div>
                <span className="text-sm font-medium">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </motion.div>
          )}

          {workSamples.length === 0 ? (
            <div className="text-center py-12 border rounded-lg border-dashed">
              <FileUp className="h-12 w-12 mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">No work samples yet</h3>
              <p className="text-slate-500 mb-4">Upload certificates, design samples, or other work documents</p>
              {isEditing && (
                <Button onClick={handleFileUpload} disabled={uploading}>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {workSamples.map((sample) => (
                <motion.div
                  key={sample.id}
                  className="border rounded-lg p-4 flex items-center justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-slate-100 rounded flex items-center justify-center mr-4">
                      <FileText className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{sample.name}</h4>
                      <p className="text-xs text-slate-500">{sample.size}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteSample(sample.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
