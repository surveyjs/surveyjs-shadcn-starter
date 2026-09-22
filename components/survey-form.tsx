"use client"

import { useEffect, useMemo } from "react"
import { Model, type Question, type SurveyModel } from "survey-core"
import { Survey } from "survey-react-ui"
import "survey-core/survey-core.css"
import "survey-core/themes/adapters/shadcn-base-nova.css" // ← the one line to change for another shadcn style

// Built in the SurveyJS form builder — https://surveyjs.io/create-free-survey — edit the file or replace it.
import survey from "@/survey.json"

export function SurveyForm({
  definition = survey,
  onComplete,
  prefillData,
}: {
  definition?: object
  onComplete?: (data: Record<string, unknown>) => void
  /** Adds a "Prefill demo data" button that fills the current page. Pass a stable object. */
  prefillData?: Record<string, unknown>
}) {
  // Rebuilt only when the definition changes; onComplete is attached below, so an
  // inline callback from the parent does not wipe the answers typed so far.
  const model = useMemo(() => {
    const m = new Model(definition)
    m.applyTheme({ isPanelless: true })
    return m
  }, [definition])

  useEffect(() => {
    const handler = (sender: SurveyModel) => {
      console.log(sender.data)
      onComplete?.(sender.data)

      // Your API: load the definition and post the response here — see https://surveyjs.io/backend-integration
      // const definition = await fetch("/api/surveys/checkout").then((r) => r.json())
      // await fetch("/api/responses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(sender.data) })
    }
    model.onComplete.add(handler)
    return () => model.onComplete.remove(handler)
  }, [model, onComplete])

  useEffect(() => {
    if (!prefillData) return
    const id = "sv-prefill-demo"
    model.addNavigationItem({
      id,
      title: "Prefill demo data",
      // Only the current page's questions, so the visitor still steps through the form.
      action: () => {
        const onThisPage = new Set(
          model.currentPage.questions.map((q: Question) => q.getValueName())
        )
        model.mergeData(
          Object.fromEntries(
            Object.entries(prefillData).filter(([name]) => onThisPage.has(name))
          )
        )
      },
    })
    return () => {
      model.navigationBar.removeActionById(id)
    }
  }, [model, prefillData])

  return <Survey model={model} />
}
