"use client"

import { useState } from "react"
import { Model, Serializer } from "survey-core"
import { lintSurvey, type ILintFinding } from "survey-core/linter"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Textarea } from "@/components/ui/textarea"

/** HTML autofill's section tokens, which the `autocomplete` property's choice list does not spell out. */
const AUTOFILL_SECTION = /^(?:section-[\w-]+\s+)?(?:shipping|billing)\s+(\S+)$/

/**
 * `autocomplete: "shipping postal-code"` is valid HTML autofill and keeps the two
 * address blocks apart, but the linter reports it. Silence it at its own path, and
 * only when the field after the section token is an allowed value — a typo still reports.
 */
function autofillSuppressions(json: unknown) {
  const allowed = new Set<unknown>(
    Serializer.findProperty("text", "autocomplete")?.choices ?? []
  )
  const found: { ruleId: string; path: string }[] = []
  const walk = (node: unknown, path: string) => {
    if (Array.isArray(node)) {
      node.forEach((item, index) => walk(item, `${path}[${index}]`))
      return
    }
    if (!node || typeof node !== "object") return
    for (const [key, value] of Object.entries(node)) {
      const childPath = path ? `${path}.${key}` : key
      if (key === "autocomplete" && typeof value === "string") {
        const field = AUTOFILL_SECTION.exec(value)?.[1]
        if (field && allowed.has(field)) {
          found.push({ ruleId: "property/invalid-value", path: childPath })
        }
      }
      walk(value, childPath)
    }
  }
  walk(json, "")
  return found
}

export function EditJsonPanel({
  shipped,
  onApply,
}: {
  shipped: object
  onApply: (definition: object) => void
}) {
  const [text, setText] = useState(() => JSON.stringify(shipped, null, 2))
  const [error, setError] = useState<string | null>(null)
  const [findings, setFindings] = useState<ILintFinding[] | null>(null)

  function apply() {
    try {
      const value: unknown = JSON.parse(text)
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        throw new Error("A survey definition is a JSON object.")
      }
      const result = lintSurvey(value, { suppress: autofillSuppressions(value) })
      new Model(value) // dry run: throws here rather than in the rendered form
      onApply(value)
      setError(null)
      setFindings(result.findings)
    } catch (e) {
      // The definition did not change, so the form and its answers stay as they are.
      setError(e instanceof Error ? e.message : String(e))
      setFindings(null)
    }
  }

  function reset() {
    setText(JSON.stringify(shipped, null, 2))
    onApply(shipped)
    setError(null)
    setFindings(null)
  }

  return (
    <Collapsible className="flex flex-col gap-2">
      <CollapsibleTrigger render={<Button variant="outline" className="self-start" />}>
        Edit JSON
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-2">
        <Textarea
          aria-label="Survey JSON"
          spellCheck={false}
          className="h-96 font-mono text-xs [field-sizing:fixed] md:text-xs"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex gap-2">
          <Button onClick={apply}>Apply</Button>
          <Button variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {findings && (
          <ul className="text-sm text-muted-foreground">
            {findings.length === 0 && <li>Applied. No lint findings.</li>}
            {findings.map((f, i) => (
              <li key={i}>
                {f.severity} · {f.message}
              </li>
            ))}
          </ul>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
