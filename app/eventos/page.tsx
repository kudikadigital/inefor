import React from "react";
import Link from "next/link";
import { Zap, ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { events } from "@/data";

const typeLabel: Record<string, string> = { workshop: "Workshop", conference: "Conferência", seminar: "Seminário" };

export default function EventosPage() {
  return (
    <div className="min-h-screen bg-bg-base pt-24">
      <div className="border-b border-border-base bg-bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-blue-600 dark:text-blue-400 text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-blue-500" />Agenda 2025
          </p>
          <h1 className="text-4xl font-light text-text-primary mb-3">Eventos</h1>
          <p className="text-text-muted text-base">Workshops, conferências e seminários organizados pelo Inefor ao longo do ano.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          {events.map((event, i) => (
            <div key={event.id} className={cn(
              "group relative flex flex-col sm:flex-row gap-6 p-6 rounded-sm border transition-all duration-200 hover:border-border-strong",
              i === 0 ? "bg-blue-500/5 border-blue-500/20" : "bg-bg-card border-border-base"
            )}>
              {i === 0 && <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-sm" />}
              <div className="shrink-0">
                <div className="w-20 h-20 rounded-sm bg-bg-elevated border border-border-base flex flex-col items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 text-xs font-medium uppercase tracking-wider">{event.date.split(" ")[0]}</span>
                  <span className="text-text-primary text-sm font-medium">{event.date.split(" ")[1]}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant={event.registrationOpen ? "success" : "secondary"}>
                    {event.registrationOpen ? "Inscrições abertas" : "Em breve"}
                  </Badge>
                  <span className="text-[11px] text-text-muted border border-border-base px-2 py-0.5 rounded-sm">
                    {typeLabel[event.type]}
                  </span>
                </div>
                <h2 className="text-text-primary font-medium text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{event.title}</h2>
                <p className="text-text-muted text-sm leading-relaxed">{event.description}</p>
              </div>
              {event.registrationOpen && (
                <div className="shrink-0 flex items-center">
                  <Link href={`/contacto?evento=${encodeURIComponent(event.title)}`}>
                    <Button className="gap-2"><Zap className="w-4 h-4" />Inscrever</Button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
