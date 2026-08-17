"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, MapPin, Users, ArrowRight, Filter, Search, X, Banknote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scheduledCourses } from "@/data";
import { Hero } from "@/components/sections/Hero";
import { EnrollmentModal } from "@/components/modals/EnrollmentModal";

type Area = "all" | "tech" | "admin";

export default function ProgramadosPage() {
  const [selectedArea, setSelectedArea] = useState<Area>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<typeof scheduledCourses[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = scheduledCourses.filter((course) => {
    const matchesArea = selectedArea === "all" || course.area === selectedArea;
    const matchesSearch = course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesArea && matchesSearch;
  });

  const handleEnroll = (course: typeof scheduledCourses[0]) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      
      <Hero
        badge="Cursos Programados"
        title="Próximas"
        titleHighlight="Turmas"
        description="Veja as datas e horários das próximas turmas agendadas. Garanta já a sua vaga!"
        variant="centered"
        showScrollIndicator={false}
        backgroundImage="/assets/banner/cursos_programados_banner.jpg"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/cursos" className="hover:text-foreground transition-colors">Cursos</Link>
          <span>/</span>
          <span className="text-foreground">Cursos Programados</span>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar curso..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
            {(["all", "tech", "admin"] as Area[]).map((area) => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={cn(
                  "px-4 py-1.5 text-sm rounded-md transition-all",
                  selectedArea === area
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {area === "all" ? "Todos" : area === "tech" ? "Tecnológicos" : "Administrativos"}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} turma{filtered.length !== 1 ? "s" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Courses Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Nenhum curso encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <div
                key={course.id}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={`/images/courses/${course.id}.jpg`}
                    alt={course.courseTitle}
                    fill
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/all/11.jpg"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Badge
                    variant={course.spots <= 8 ? "destructive" : "secondary"}
                    className="absolute top-3 right-3"
                  >
                    {course.spots <= 8 ? "Últimas vagas" : "Vagas disponíveis"}
                  </Badge>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={course.area === "tech" ? "default" : "secondary"}>
                      {course.area === "tech" ? "Tecnológico" : "Administrativo"}
                    </Badge>
                    <Badge variant="outline">
                      {course.modality}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {course.courseTitle}
                  </h3>

                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Início: {course.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{course.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{course.spots} vagas restantes</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-primary font-bold">{course.price}</p>
                    <Button onClick={() => handleEnroll(course)} size="sm" className="gap-1">
                      Inscrever <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-primary/5 border border-primary/20 rounded-xl">
          <div>
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Horários Disponíveis
            </h3>
            <p className="text-sm text-muted-foreground">
              Segunda a Sexta: 8h-11h, 11h-13h30, 13h30-16h30, 17h-19h30<br />
              Sábado: 8h-13h, 13h-18h
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Banknote className="w-4 h-4 text-primary" />
              Dados Bancários
            </h3>
            <p className="text-sm text-muted-foreground">
              Conta BAI: 9848701410001<br />
              IBAN: 0040.0000.9848.7014.1014.9
            </p>
          </div>
        </div>
      </div>

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
    </div>
  );
}