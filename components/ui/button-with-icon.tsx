"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ButtonWithIcon({ children, className }: Props) {
  return (
    <Button
      className={cn(
        "relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group",
        "transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden",
        // Light: navy dark bg | Dark: blue bg
        "bg-(--primary-800) text-white hover:bg-(--primary-900)",
        "dark:bg-secondary dark:text-white dark:hover:bg-(--secondary-700)",
        "hover:shadow-lg hover:shadow-(--primary-900)/20 dark:hover:shadow-(--secondary)/20",
        className
      )}
    >
      <span className="relative z-10 transition-all duration-500">
        {children}
      </span>

      {/* Pill button: white circle on light, dark circle on dark */}
      <div className={cn(
        "absolute right-1 w-10 h-10 rounded-full flex items-center justify-center",
        "transition-all duration-500",
        "group-hover:right-[calc(100%-44px)] group-hover:rotate-45",
        "bg-white text-(--primary-900)",
        "dark:bg-(--primary-900) dark:text-white"
      )}>
        <ArrowUpRight size={16} />
      </div>
    </Button>
  );
}