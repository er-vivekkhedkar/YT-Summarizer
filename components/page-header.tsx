"use client";

interface PageHeaderProps {
    title: string
    description?: string
  }
  
  export function PageHeader({ title, description }: PageHeaderProps) {
    return (
      <div className="bg-gradient-to-b from-white to-gray-50 border-b dark:bg-gray-900 dark:border-gray-800 dark:text-black">
        <div className="container mx-auto px-4 py-16 text-center dark:text-black">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-black">{title}</h1>
          {description && <p className="text-xl max-w-2xl mx-auto text-gray-900 dark:text-black">{description}</p>}
        </div>
      </div>
    )
  }
  
  