"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { X, Sparkles, PlusCircle } from "lucide-react"

interface AIInsightCardProps {
  title: string
  content: string
  onClose: () => void
}

export function AIInsightCard({ title, content, onClose }: AIInsightCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [confidence, setConfidence] = useState(0)

  useEffect(() => {
    // Animate in
    const timer1 = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    // Animate confidence progress
    const timer2 = setTimeout(() => {
      setConfidence(85)
    }, 1000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for animation to complete
  }

  return (
    <Card
      className={`
        floating-card shadow-lg border-0 bg-gradient-to-br from-sage/20 to-sage/5 overflow-hidden
        transition-all duration-300 transform
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-sage via-sage to-sage/50"></div>
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-sage/20 flex items-center justify-center">
            <Sparkles className="h-3.5 w-3.5 text-sage" />
          </div>
          <CardTitle className="text-base font-medium text-secondary">{title}</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="h-6 w-6 transition-colors hover:text-destructive"
        >
          <X className="h-3.5 w-3.5" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">{content}</p>

        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">AI confidence</span>
            <span className="font-medium">{confidence}%</span>
          </div>
          <Progress value={confidence} className="h-1.5" indicatorClassName="bg-sage" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-0">
        <Button variant="outline" size="sm" className="button-expand transition-all duration-200 hover:bg-sage/5">
          Dismiss
        </Button>
        <Button
          size="sm"
          className="button-expand bg-sage hover:bg-sage/90 text-sage-foreground transition-all duration-200"
        >
          <PlusCircle className="h-3.5 w-3.5 mr-1" />
          Add to Notes
        </Button>
      </CardFooter>
    </Card>
  )
}

