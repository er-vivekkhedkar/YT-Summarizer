import { Button } from "@/components/ui/button"
import { ReactNode } from 'react'

interface ToolCardProps {
  title: string
  description: string
  icon: ReactNode
}

export function ToolCard({ title, description, icon }: ToolCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105">
      <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button variant="outline" size="sm">Learn More</Button>
    </div>
  )
}

