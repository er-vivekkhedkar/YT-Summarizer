"use client"

import { Button } from "@/components/ui/button"
import { ReactNode } from 'react'

interface ToolCardProps {
  title: string
  description: string
  icon: ReactNode
}

export function ToolCard({ title, description, icon }: ToolCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105 dark:bg-gray-900 dark:text-white">
      <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{description}</p>
      <Button variant="outline" size="sm" className="text-gray-900 dark:text-black border-gray-300 dark:border-gray-600">Learn More</Button>
    </div>
  )
}

