// src/components/ui/Progress.jsx
import React from "react";
import { cn } from "../../components/lib/utils";

const Progress = React.forwardRef(({ className, value, indicatorColor = "bg-gray-900", ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-gray-100", className)}
    {...props}
  >
    <div
      className={cn("h-full w-full flex-1 transition-all duration-500", indicatorColor)}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
));

Progress.displayName = "Progress";

export { Progress };