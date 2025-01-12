"use client";

// import { useState } from 'react';
import { CreditCard, Clock, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PRICING_PLANS = [
  {
    name: 'Free',
    price: '$0',
    features: ['5 summaries per month', 'Basic AI model', 'Standard support'],
    current: true
  },
  {
    name: 'Pro',
    price: '$9.99',
    interval: 'month',
    features: ['Unlimited summaries', 'Advanced AI model', 'Priority support', 'Custom preferences'],
    current: false
  },
  {
    name: 'Team',
    price: '$49.99',
    interval: 'month',
    features: ['Everything in Pro', 'Team collaboration', 'Admin dashboard', 'API access'],
    current: false
  }
];

const BILLING_HISTORY = [
  {
    id: 1,
    date: '2024-03-01',
    amount: '$0.00',
    status: 'Completed',
    description: 'Free Plan - March 2024'
  },
  {
    id: 2,
    date: '2024-02-01',
    amount: '$0.00',
    status: 'Completed',
    description: 'Free Plan - February 2024'
  }
];

export default function BillingPage() {
//   const [selectedPlan, setSelectedPlan] = useState<string>('Free');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Billing & Subscription</h1>

      {/* Current Plan */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">Free Plan</p>
            <p className="text-gray-500">5 summaries remaining this month</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Renews on April 1, 2024</p>
            <div className="mt-2">
              <Button variant="default" className="bg-red-600 hover:bg-red-700">
                Upgrade Plan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {PRICING_PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow ${
              plan.current ? 'ring-2 ring-red-500' : ''
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold mb-4">
              {plan.price}
              {plan.interval && (
                <span className="text-base font-normal text-gray-500">
                  /{plan.interval}
                </span>
              )}
            </p>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.current ? "outline" : "default"}
              className="w-full"
              disabled={plan.current}
            >
              {plan.current ? 'Current Plan' : 'Upgrade'}
            </Button>
          </div>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
        <Button variant="outline" className="flex items-center">
          <CreditCard className="mr-2" />
          Add Payment Method
        </Button>
      </div>

      {/* Billing History */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Billing History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Description</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {BILLING_HISTORY.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3 px-4">{item.date}</td>
                  <td className="py-3 px-4">{item.description}</td>
                  <td className="py-3 px-4">{item.amount}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center">
                      {item.status === 'Completed' ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                      )}
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 