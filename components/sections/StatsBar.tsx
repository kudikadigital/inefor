"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface StatItem {
  value: string;
  label: string;
}

interface StatsBarProps {
  /** Array de estatísticas */
  stats: StatItem[];
  /** Variante visual */
  variant?: "default" | "compact" | "highlight";
  /** Cor de fundo */
  background?: "surface" | "card" | "transparent";
  /** Classe adicional */
  className?: string;
}

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return value;
}

function StatItem({ 
  value, 
  label, 
  variant = "default",
  index 
}: { 
  value: string; 
  label: string; 
  variant: StatsBarProps["variant"];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Parse numeric part and suffix (e.g. "500+" → 500, "+")
  const match = value.match(/^(\d+)(.*)$/);
  const numeric = match ? parseInt(match[1]) : null;
  const suffix = match ? match[2] : "";

  const count = useCountUp(numeric ?? 0, 1800, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isHighlight = variant === "highlight";
  const isCompact = variant === "compact";

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center transition-all duration-300",
        isCompact ? "py-6 px-4 gap-1" : "py-8 px-6 gap-2",
        !isHighlight && "hover:bg-primary/5"
      )}
    >
      <span
        className={cn(
          "tracking-tight tabular-nums",
          isCompact ? "text-2xl" : "text-3xl lg:text-4xl",
          isHighlight ? "text-primary font-bold" : "text-foreground font-light"
        )}
      >
        {numeric !== null ? `${count}${suffix}` : value}
      </span>
      <span
        className={cn(
          "tracking-wide uppercase",
          isCompact ? "text-[11px]" : "text-xs",
          isHighlight ? "text-primary/80 font-medium" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function StatsBar({ 
  stats, 
  variant = "default",
  background = "surface",
  className = ""
}: StatsBarProps) {
  const bgColors = {
    surface: "bg-muted/30 border-y border-border",
    card: "bg-card border-y border-border",
    transparent: "bg-transparent"
  };

  return (
    <section className={cn(bgColors[background], className)}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className={cn(
          "grid grid-cols-2 lg:grid-cols-4",
          variant !== "compact" && "divide-x divide-y lg:divide-y-0 divide-border"
        )}>
          {stats.map((stat, index) => (
            <StatItem 
              key={stat.label} 
              value={stat.value} 
              label={stat.label} 
              variant={variant}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}