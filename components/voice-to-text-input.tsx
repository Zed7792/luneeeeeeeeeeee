"use client"

import { useEffect, useRef, useState } from "react"
import { Mic, MicOff, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface VoiceToTextInputProps {
  onTranscript: (text: string) => void
  placeholder?: string
}

export function VoiceToTextInput({ onTranscript, placeholder = "Speak or type here..." }: VoiceToTextInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    if (SpeechRecognition) {
      setIsSupported(true)
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onstart = () => setIsListening(true)
      recognitionRef.current.onend = () => setIsListening(false)
      recognitionRef.current.onerror = (event: any) => {
        console.error("[v0] Speech recognition error:", event.error)
        toast({
          title: "Error",
          description: "Speech recognition error: " + event.error,
          variant: "destructive",
        })
      }

      recognitionRef.current.onresult = (event: any) => {
        let interim = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            setTranscript((prev) => prev + transcriptPart + " ")
            onTranscript(transcript + transcriptPart + " ")
          } else {
            interim += transcriptPart
          }
        }
      }
    }
  }, [onTranscript, transcript, toast])

  const toggleListening = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
    } else {
      recognitionRef.current.start()
    }
  }

  const copyTranscript = () => {
    navigator.clipboard.writeText(transcript)
    toast({
      title: "Copied",
      description: "Transcript copied to clipboard",
    })
  }

  const clearTranscript = () => {
    setTranscript("")
  }

  if (!isSupported) {
    return (
      <Card className="border-slate-700 bg-slate-800">
        <CardContent className="pt-6">
          <p className="text-slate-400 text-sm">Voice input is not supported in your browser</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-slate-700 bg-slate-800">
      <CardContent className="pt-6 space-y-4">
        <Textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder={placeholder}
          className="bg-slate-700 border-slate-600 text-white min-h-32 resize-none"
        />

        <div className="flex gap-2 flex-wrap">
          <Button onClick={toggleListening} variant={isListening ? "destructive" : "default"} className="flex-1">
            {isListening ? (
              <>
                <MicOff className="h-4 w-4 mr-2" />
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 mr-2" />
                Start Listening
              </>
            )}
          </Button>
          {transcript && (
            <>
              <Button onClick={copyTranscript} variant="outline" size="sm">
                <Copy className="h-4 w-4" />
              </Button>
              <Button onClick={clearTranscript} variant="outline" size="sm">
                Clear
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
