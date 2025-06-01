"use client"

import type React from "react"

import { useState, useRef, type ChangeEvent } from "react"
import { Upload, X, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  currentImage?: string
  onImageSelected: (imageUrl: string) => void
  className?: string
  accept?: string
  maxSize?: number // in MB
}

export default function ImageUpload({
  currentImage,
  onImageSelected,
  className,
  accept = "image/*",
  maxSize = 5,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    setError(null)

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreview(result)
      onImageSelected(result)
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onImageSelected("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          className,
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative group">
            <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <div className="flex space-x-2">
                <Button size="sm" variant="secondary" onClick={triggerFileSelect}>
                  <Camera className="h-4 w-4 mr-2" />
                  Change
                </Button>
                <Button size="sm" variant="destructive" onClick={handleRemoveImage}>
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors rounded-lg"
            onClick={triggerFileSelect}
          >
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Image</h3>
            <p className="text-sm text-muted-foreground mb-4">Drag and drop an image here, or click to select</p>
            <p className="text-xs text-muted-foreground">Supports: JPG, PNG, GIF (max {maxSize}MB)</p>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <input ref={fileInputRef} type="file" accept={accept} onChange={handleFileChange} className="hidden" />
    </div>
  )
}
