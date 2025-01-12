interface PageHeaderProps {
    title: string
    description?: string
  }
  
  export function PageHeader({ title, description }: PageHeaderProps) {
    return (
      <div className="bg-gradient-to-b from-white to-gray-50 border-b">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          {description && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>}
        </div>
      </div>
    )
  }
  
  