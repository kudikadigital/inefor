import React from "react";
import Link from "next/link";
import { Clock, Users, ArrowRight, Landmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scheduledCourses } from "@/data";

const areaLabel: Record<string, string> = {
  tech: "Tecnológico",
  admin: "Administrativo",
};

export function MonthSchedule() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-primary text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-primary" />
              Agenda
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-foreground leading-tight">
              Programação do Mês
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              Turmas a iniciar em Abril 2025
            </p>
          </div>
          <Link href="/cursos/programados">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              Ver programação completa <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Ticket list */}
        <div className="space-y-4">
          {scheduledCourses.map((sc, i) => {
            const [day, month] = sc.startDate.split(" ");
            const isUrgent = i === 0;

            return (
              <div
                key={sc.id}
                className={cn(
                  "group relative flex flex-col sm:flex-row rounded-2xl border bg-card overflow-hidden transition-all duration-300",
                  isUrgent
                    ? "border-primary/30 ring-1 ring-primary/15 shadow-md shadow-primary/5"
                    : "border-border hover:border-primary/30 hover:shadow-lg"
                )}
              >
                {isUrgent && (
                  <span className="absolute top-3 left-3 sm:hidden z-10 text-[10px] font-medium uppercase tracking-wider text-primary-foreground bg-primary px-2 py-0.5 rounded-full">
                    Turma mais próxima
                  </span>
                )}

                {/* Date stub */}
                <div className="relative flex sm:flex-col items-center justify-center gap-2 sm:gap-0 shrink-0 w-full sm:w-28 py-4 sm:py-6 bg-primary text-primary-foreground">
                  {isUrgent && (
                    <span className="hidden sm:block absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-medium uppercase tracking-wider text-primary-foreground/70">
                      Mais próxima
                    </span>
                  )}
                  <span className="text-3xl font-light leading-none">{day}</span>
                  <span className="text-[11px] uppercase tracking-widest opacity-70">{month}</span>
                </div>

                {/* Perforated divider */}
                <div className="hidden sm:flex flex-col justify-between items-center py-2 relative w-px bg-transparent">
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l border-dashed border-border" />
                  <span className="w-3 h-3 -translate-x-1/2 rounded-full bg-background -mt-1.5" />
                  <span className="w-3 h-3 -translate-x-1/2 rounded-full bg-background -mb-1.5" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-3 sm:flex-row sm:items-center p-5">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={cn("w-1.5 h-1.5 rounded-full", sc.area === "tech" ? "bg-primary" : "bg-secondary")} />
                      <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                        {areaLabel[sc.area]}
                      </span>
                      <Badge variant="outline" className="text-[10px]">{sc.modality}</Badge>
                      {sc.spots <= 8 && (
                        <Badge variant="warning" className="text-[10px]">Últimas vagas</Badge>
                      )}
                    </div>
                    <h3 className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {sc.courseTitle}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {sc.schedule}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        {sc.spots} vagas
                      </span>
                    </div>
                  </div>

                  <Link href={`/contacto?curso=${sc.courseTitle}`} className="shrink-0">
                    <Button
                      size="sm"
                      variant={isUrgent ? "default" : "outline"}
                      className="gap-2 w-full sm:w-auto"
                    >
                      Inscrever-se <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info note */}
        <div className="mt-8 flex flex-col sm:flex-row gap-6 p-5 bg-muted/50 border border-border rounded-2xl">
          <div className="flex-1 flex items-start gap-3">
            <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="text-foreground font-medium">Horários disponíveis:</span>{" "}
              Seg–Sex: 8h–11h · 11h–13h30 · 13h30–16h30 · 17h–19h30 | Sáb: 8h–13h · 13h–18h
            </p>
          </div>
          <div className="flex-1 flex items-start gap-3">
            <Landmark className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="text-foreground font-medium">Conta BAI:</span>{" "}
              9848701410001 · IBAN: 0040.0000.9848.7014.1014.9
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
