"use client"

import { useCallback, useState } from "react"
import { toast } from "sonner"

import { Card, CardContent } from "@/components/ui/card"
import { EditJsonPanel } from "@/components/edit-json-panel"
import { SurveyForm } from "@/components/survey-form"
import shipped from "@/survey.json"

export function Starter() {
  const [definition, setDefinition] = useState<object>(shipped)
  const handleComplete = useCallback(() => toast("Response captured"), [])

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent>
          <SurveyForm definition={definition} onComplete={handleComplete} />
        </CardContent>
      </Card>
      <EditJsonPanel shipped={shipped} onApply={setDefinition} />
    </div>
  )
}
