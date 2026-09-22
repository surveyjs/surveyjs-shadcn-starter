# surveyjs-shadcn-starter

SurveyJS in a shadcn/ui app — a themed multi-step form, ready to start from. MIT.

A fresh `shadcn init` project (Next.js App Router, Tailwind 4, the `base-nova` style) with one addition: a multi-step checkout form — a cart with a dynamic matrix and computed totals, contact, shipping, payment, review — rendered by [SurveyJS](https://surveyjs.io) from `survey.json`. The form takes its colors, radius and spacing from your shadcn tokens through the adapter stylesheet that ships in `survey-core`, and follows the light/dark toggle.

## Quick start

```bash
git clone https://github.com/surveyjs/surveyjs-shadcn-starter
cd surveyjs-shadcn-starter
npm install
npm run dev
```

Or start a new project from it:

```bash
npx create-next-app@latest --example https://github.com/surveyjs/surveyjs-shadcn-starter my-app
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsurveyjs%2Fsurveyjs-shadcn-starter)

No environment variables, no database, no keys.

## First thing to try: edit `survey.json`

The form is plain JSON at the project root. Change a title, add a question, and the page reloads with it. To design a form visually, build it in the [SurveyJS form builder](https://surveyjs.io/create-free-survey) and paste its JSON over `survey.json`.

The **Edit JSON** panel under the form does the same in the browser: apply a changed definition, see the linter's findings, reset to the shipped one. It keeps nothing — reload and it is gone.

## Add the form to an existing shadcn app

```bash
npx shadcn@latest add https://shadcn.demos.surveyjs.io/r/survey-form.json
```

> The host is not live yet. Until it is, run `npm run build && npm start` here and add from `http://localhost:3000/r/survey-form.json`.

The item installs two files — `components/survey-form.tsx` and `survey.json` — and two npm packages, `survey-core` and `survey-react-ui`. It adds no shadcn component. It reports completion through its `onComplete` prop:

```tsx
import { SurveyForm } from "@/components/survey-form"

<SurveyForm onComplete={(data) => console.log(data)} />
```

Pass `prefillData` (answers keyed by question name, defined outside the component so it stays the same object) to add a "Prefill demo data" button that fills the current page; the starter page does this. Without it there is no button.

Saving the response is yours to wire: the handler in `survey-form.tsx` marks the spot — see [SurveyJS backend integration](https://surveyjs.io/backend-integration).

**Another shadcn style** changes one import in `survey-form.tsx`, `survey-core/themes/adapters/shadcn-<style>.css`, where `<style>` is the `style` in your `components.json`:

`default`, `new-york`, `base-nova`, `base-vega`, `base-maia`, `base-lyra`, `base-mira`, `base-luma`, `base-sera`, `base-rhea`.

## Dependency policy

A starter people clone should install what was tested: `package-lock.json` is kept in the repo and `package.json` uses caret ranges, so `npm ci` reproduces the tested tree. A weekly CI run installs today's `survey-core` and `survey-react-ui` on top of it, without saving, and builds and smoke-tests against them — an alarm, not an update. It commits nothing. Moving the lockfile forward is Renovate's or Dependabot's job, through a reviewed pull request.

## What this is not

This starter stays one page and one form. Anything bigger has a home already:

- [The full SurveyJS demo](https://app.demos.surveyjs.io) — Survey Creator, PDF Generator, Dashboard and many more forms.
- [The MIT demo application](https://github.com/surveyjs/surveyjs-demo-mit) — a complete app built on the MIT-licensed libraries only.
- [Server integration](https://surveyjs.io/backend-integration) — storing definitions and responses in your own backend.

## License

[MIT](LICENSE) © Devsoft Baltic OÜ
