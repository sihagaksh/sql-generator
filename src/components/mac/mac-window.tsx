"use client"

import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface MacWindowProps {
  title?: string
  children: React.ReactNode
  className?: string
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  showCollapseButton?: boolean
}

export function MacWindow({
  title,
  children,
  className,
  isCollapsed = false,
  onToggleCollapse,
  showCollapseButton = false,
}: MacWindowProps) {
  return (
    <div
      className={cn(
        "bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 transition-all duration-300",
        isCollapsed && "h-12",
        className,
      )}
    >
      <div className="h-12 bg-zinc-800/50 flex items-center px-4 gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        {title && (
          <div className="flex-1 flex items-center justify-between">
            <div className="text-sm text-zinc-400 ml-2">{title}</div>
            {showCollapseButton && (
              <button onClick={onToggleCollapse} className="text-zinc-400 hover:text-zinc-300 transition-colors">
                {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
          </div>
        )}
      </div>
      <div className={cn("transition-all duration-300", isCollapsed ? "h-0" : "p-4")}>{!isCollapsed && children}</div>
    </div>
  )
}

