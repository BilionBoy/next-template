import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  description?: string
  action?: ReactNode
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          </div>
          {title}
        </h1>
        {description && <p className="text-gray-600 mt-1">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
