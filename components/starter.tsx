"use client"

import { useCallback, useState } from "react"
import { toast } from "sonner"

import { Card, CardContent } from "@/components/ui/card"
import { EditJsonPanel } from "@/components/edit-json-panel"
import { SurveyForm } from "@/components/survey-form"
import shipped from "@/survey.json"

// Answers for "Prefill demo data", keyed by question name. Billing differs from
// shipping, so filling the Payment page shows the conditional billing address.
const demoData = {
  items: [
    { product: "hoodie", quantity: 1 },
    { product: "tee", quantity: 2 },
  ],
  email: "jordan.avery@example.com",
  phone: "+1 (415) 555-0142",
  fullName: "Jordan Avery",
  address1: "742 Evergreen Terrace",
  address2: "Apt 4B",
  city: "San Francisco",
  state: "CA",
  zip: "94105",
  shippingMethod: "express",
  billingSameAsShipping: false,
  billingFullName: "Avery Holdings LLC",
  billingAddress1: "1 Market Street",
  billingAddress2: "Suite 300",
  billingCity: "San Francisco",
  billingState: "CA",
  billingZip: "94105",
  paymentMethod: "card",
  cardNumber: "4242 4242 4242 4242",
  cardExpiry: "08/28",
  cardCvc: "123",
  orderNotes: "Please leave the package with the concierge.",
  acceptTerms: true,
}

export function Starter() {
  const [definition, setDefinition] = useState<object>(shipped)
  const handleComplete = useCallback(() => toast("Response captured"), [])

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent>
          <SurveyForm
            definition={definition}
            onComplete={handleComplete}
            prefillData={demoData}
          />
        </CardContent>
      </Card>
      <EditJsonPanel shipped={shipped} onApply={setDefinition} />
    </div>
  )
}
