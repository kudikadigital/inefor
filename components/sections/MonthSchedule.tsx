import React from "react";
import Link from "next/link";
import { CalendarDays, Users, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scheduledCourses } from "@/data";

export function MonthSchedule() {
  return (
    <section className="py-20 bg-bg-surface border-y border-border-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-blue-600 dark:text-blue-400 text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-blue-500" />
              Agenda
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-text-primary leading-tight">
              Programação do Mês
            </h2>
            <p className="text-text-muted text-sm mt-2">Turmas a iniciar em Abril 2025</p>
          </div>
          <Link href="/cursos/programados">
            <Button variant="ghost" size="sm" className="gap-2">
              Ver programação completa <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="space-y-2">
          {/* Header row - desktop */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-[11px] text-text-subtle uppercase tracking-wider">
            <div className="col-span-4">Curso</div>
            <div className="col-span-2">Início</div>
            <div className="col-span-3">Horário</div>
            <div className="col-span-2">Vagas</div>
            <div className="col-span-1"></div>
          </div>

          {scheduledCourses.map((sc, i) => (
            <div
              key={sc.id}
              className={cn(
                "grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-4 py-4 rounded-sm border transition-all duration-150 hover:border-border-strong group",
                i === 0
                  ? "border-blue-500/20 bg-blue-500/5"
                  : "border-border-base bg-bg-card"
              )}
            >
              <div className="md:col-span-4 flex items-center gap-3">
                <div className={cn("w-1.5 h-8 rounded-full shrink-0", sc.area === "tech" ? "bg-blue-500" : "bg-indigo-400")} />
                <div>
                  <p className="text-text-primary text-sm font-medium">{sc.courseTitle}</p>
                  <p className="text-text-muted text-xs md:hidden mt-0.5">{sc.startDate}</p>
                </div>
              </div>

              <div className="hidden md:flex md:col-span-2 items-center gap-2 text-sm text-text-secondary">
                <CalendarDays className="w-3.5 h-3.5 text-text-subtle" />
                {sc.startDate}
              </div>

              <div className="md:col-span-3 flex items-center gap-2 text-sm text-text-muted">
                <Clock className="w-3.5 h-3.5 text-text-subtle" />
                {sc.schedule}
              </div>

              <div className="md:col-span-2 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-text-subtle" />
                <span className="text-sm text-text-muted">{sc.spots} vagas</span>
                {sc.spots <= 8 && <Badge variant="warning" className="text-[10px] py-0">Limitado</Badge>}
              </div>

              <div className="md:col-span-1 flex items-center justify-end">
                <Link href={`/contacto?curso=${sc.courseTitle}`}>
                  <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors opacity-0 group-hover:opacity-100">
                    Inscrever <ArrowRight className="w-3 h-3" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Info note */}
        <div className="mt-8 flex flex-col sm:flex-row gap-6 p-4 bg-bg-card border border-border-base rounded-sm">
          <div className="flex-1">
            <p className="text-xs text-text-muted leading-relaxed">
              <span className="text-text-primary font-medium">Horários disponíveis:</span>{" "}
              Seg–Sex: 8h–11h · 11h–13h30 · 13h30–16h30 · 17h–19h30 | Sáb: 8h–13h · 13h–18h
            </p>
          </div>
          <div className="flex-1">
            <p className="text-xs text-text-muted leading-relaxed">
              <span className="text-text-primary font-medium">Conta BAI:</span>{" "}
              9848701410001 · IBAN: 0040.0000.9848.7014.1014.9
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
