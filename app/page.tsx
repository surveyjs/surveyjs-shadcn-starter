import { Starter } from "@/components/starter"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Page() {
  return (
    <div className="mx-auto flex min-h-svh max-w-4xl flex-col gap-6 p-4 md:p-6">
      <header className="flex items-center justify-between">
        <span className="font-medium">surveyjs-shadcn-starter</span>
        <ThemeToggle />
      </header>
      <main className="flex-1">
        <Starter />
      </main>
      <footer className="text-xs text-muted-foreground">
        <a href="https://app.demos.surveyjs.io" className="hover:underline">
          More SurveyJS examples
        </a>
        {" · "}
        <a
          href="https://github.com/surveyjs/surveyjs-shadcn-starter"
          className="hover:underline"
        >
          Source
        </a>
      </footer>
    </div>
  )
}
