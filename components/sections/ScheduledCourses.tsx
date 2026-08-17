"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CalendarDays, Users, Clock, ArrowRight, Filter, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scheduledCourses } from "@/data";
import { EnrollmentModal } from "@/components/modals/EnrollmentModal";

type Area = "all" | "tech" | "admin";

export function ScheduledCourses() {
  const [selectedArea, setSelectedArea] = useState<Area>("all");
  const [selectedCourse, setSelectedCourse] = useState<typeof scheduledCourses[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = scheduledCourses.filter(
    (sc) => selectedArea === "all" || sc.area === selectedArea
  );

  const handleEnroll = (course: typeof scheduledCourses[0]) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-primary text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-primary" />
                Agenda
              </p>
              <h2 className="text-3xl sm:text-4xl font-light text-foreground leading-tight">
                Programação do Mês
              </h2>
              <p className="text-muted-foreground text-sm mt-2">Turmas a iniciar em Abril 2025</p>
            </div>
            <Link href="/cursos/programados">
              <Button variant="ghost" size="sm" className="gap-2">
                Ver programação completa <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
              {(["all", "tech", "admin"] as Area[]).map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={cn(
                    "px-4 py-1.5 text-sm rounded-md transition-all",
                    selectedArea === area
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {area === "all" ? "Todos" : area === "tech" ? "Tecnológicos" : "Administrativos"}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Header - Desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-muted/30 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <div className="col-span-4">Curso</div>
              <div className="col-span-2">Início</div>
              <div className="col-span-2">Horário</div>
              <div className="col-span-2">Modalidade</div>
              <div className="col-span-1">Vagas</div>
              <div className="col-span-1"></div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border">
              {filtered.map((course, idx) => (
                <div
                  key={course.id}
                  className={cn(
                    "grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-4 md:px-6 py-4 transition-all hover:bg-muted/20 group",
                    course.spots <= 8 && "bg-warning/5"
                  )}
                >
                  {/* Curso */}
                  <div className="md:col-span-4 flex items-center gap-3">
                    <div
                      className={cn(
                        "w-1.5 h-8 rounded-full shrink-0",
                        course.area === "tech" ? "bg-primary" : "bg-secondary"
                      )}
                    />
                    <div>
                      <Link href={`/cursos/${course.id}`}>
                        <p className="text-foreground text-sm font-medium hover:text-primary transition-colors">
                          {course.courseTitle}
                        </p>
                      </Link>
                      <p className="text-muted-foreground text-xs md:hidden mt-0.5">
                        {course.startDate}
                      </p>
                    </div>
                  </div>

                  {/* Início - Desktop */}
                  <div className="hidden md:flex md:col-span-2 items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {course.startDate}
                  </div>

                  {/* Horário */}
                  <div className="md:col-span-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {course.schedule}
                  </div>

                  {/* Modalidade */}
                  <div className="md:col-span-2 flex items-center text-sm text-muted-foreground">
                    {course.modality}
                  </div>

                  {/* Vagas */}
                  <div className="md:col-span-1 flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className={cn(
                      "text-sm",
                      course.spots <= 8 ? "text-warning font-medium" : "text-muted-foreground"
                    )}>
                      {course.spots}
                    </span>
                    {course.spots <= 8 && (
                      <Badge variant="warning" size="sm" className="text-[10px]">
                        Últimas
                      </Badge>
                    )}
                  </div>

                  {/* Ação */}
                  <div className="md:col-span-1 flex items-center justify-end">
                    <Button
                      onClick={() => handleEnroll(course)}
                      size="sm"
                      className="gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      Inscrever <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info note */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 border border-border rounded-lg">
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">📅 Horários disponíveis:</span>{" "}
                Seg–Sex: 8h–11h · 11h–13h30 · 13h30–16h30 · 17h–19h30 | Sáb: 8h–13h · 13h–18h
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">💰 Dados Bancários:</span>{" "}
                BAI: 9848701410001 · IBAN: 0040.0000.9848.7014.1014.9
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Inscrição */}
      {selectedCourse && (
        <EnrollmentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCourse(null);
          }}
          courseTitle={selectedCourse.courseTitle}
          courseId={selectedCourse.id}
          coursePrice={selectedCourse.price}
        />
      )}
    </>
  );
}