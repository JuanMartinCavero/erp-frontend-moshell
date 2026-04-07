// src/components/ui/Badge.jsx
import React from "react"
import { cn } from "../../components/lib/utils"

function Badge({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "bg-gray-900 text-gray-50 hover:bg-gray-900/80": variant === "default",
          "bg-gray-100 text-gray-900 hover:bg-gray-100/80": variant === "secondary",
          "bg-red-50 text-red-700 hover:bg-red-50/80": variant === "destructive",
          "bg-green-50 text-green-700": variant === "success",
          "bg-amber-50 text-amber-700": variant === "warning",
          "text-foreground border": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }