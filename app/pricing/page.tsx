import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'
import { PageHeader } from "@/components/page-header"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out our service",
      features: [
        "3 video summaries per month",
        "Basic AI analysis",
        "720p video quality",
        "Community support",
        "Ad-supported experience"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Basic",
      price: "$9.99",
      period: "per month",
      description: "Great for individual users",
      features: [
        "15 video summaries per month",
        "Advanced AI analysis",
        "1080p video quality",
        "Email support",
        "Ad-free experience",
        "Access to community forums"
      ],
      cta: "Start Basic Plan",
      highlighted: false
    },
    {
      name: "Pro",
      price: "$19.99",
      period: "per month",
      description: "Ideal for professionals and small teams",
      features: [
        "50 video summaries per month",
        "Premium AI analysis",
        "4K video quality",
        "Priority email support",
        "API access",
        "Team collaboration features",
        "Custom branding"
      ],
      cta: "Start Pro Plan",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact for pricing",
      description: "Tailored solutions for large organizations",
      features: [
        "Unlimited video summaries",
        "Custom AI solutions",
        "8K video quality",
        "24/7 phone support",
        "Dedicated account manager",
        "Custom integrations",
        "On-premise deployment options",
        "Advanced analytics and reporting"
      ],
      cta: "Contact Sales",
      highlighted: false
    },
  ]

  return (
    <>
      <PageHeader 
        title="Pricing Plans" 
        description="Choose the perfect plan for your needs. Upgrade, downgrade, or cancel anytime."
      />
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div 
                key={plan.name} 
                className={`bg-white p-8 rounded-lg shadow-md flex flex-col h-full ${
                  plan.highlighted ? 'ring-2 ring-red-500 transform scale-105' : ''
                }`}
              >
                {plan.highlighted && (
                  <span className="text-center bg-red-500 text-white py-1 px-3 rounded-full text-sm font-semibold mb-4">
                    Most Popular
                  </span>
                )}
                <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="mb-2 flex items-start">
                      <Check className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.highlighted ? 'bg-red-600 hover:bg-red-700' : ''
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
          <p className="text-center mt-12 text-gray-600">
            All paid plans come with a 14-day free trial. No credit card required for free plan.
          </p>
        </div>
      </section>
    </>
  )
}
