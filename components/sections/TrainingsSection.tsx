"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Award, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { trainings } from "@/data";
import { EnrollmentModal } from "@/components/modals/EnrollmentModal";

const trainingImages: Record<string, string> = {
  "estagio": "/all/events/01.jpg",
  "ccna":    "/all/events/01.jpg",
  "cgpe":    "/all/events/01.jpg",
  "noc":     "/all/events/01.jpg",
  "helpdesk":"/all/events/01.jpg",
};

const fallbackImage = "/all/11.jpg";

// Mostrar apenas 4 treinamentos (2x2 grid)
const DISPLAY_COUNT = 4;

export function TrainingsSection() {
  const [selectedTraining, setSelectedTraining] = useState<typeof trainings[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleEnroll = (e: React.MouseEvent, training: typeof trainings[0]) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedTraining(training);
    setIsModalOpen(true);
  };

  // Pegar apenas os primeiros 4 treinamentos
  const displayedTrainings = trainings.slice(0, DISPLAY_COUNT);

  return (
    <>
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-primary text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-primary" />
                Programas Avançados
              </p>
              <h2 className="text-3xl sm:text-4xl font-light text-foreground leading-tight">
                Treinamentos Especializados
              </h2>
              <p className="text-muted-foreground text-sm mt-2">
                Programas intensivos com certificação reconhecida
              </p>
            </div>
            <Link href="/treinamentos">
              <Button variant="ghost" size="sm" className="gap-2">
                Ver todos <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* Grid 2x2 - mesmo estilo dos cursos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedTrainings.map((training) => {
              const isHovered = hoveredId === training.id;
              
              return (
                <div
                  key={training.id}
                  className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer transition-all duration-500 hover:shadow-xl"
                  onMouseEnter={() => setHoveredId(training.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Link para detalhes - cobre todo o card exceto o botão */}
                  <Link href={`/treinamentos/${training.id}`} className="absolute inset-0 z-10" />

                  {/* Image */}
                  <img
                    src={trainingImages[training.id] || fallbackImage}
                    alt={training.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
                  />

                  {/* Overlay escuro */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-500" />
                  <div className={cn(
                    "absolute inset-0 bg-black/40 transition-opacity duration-500",
                    isHovered ? "opacity-100" : "opacity-0"
                  )} />

                  {/* Badge top left - Certificação */}
                  <div className="absolute top-4 left-4 z-20">
                    <Badge variant="glass" className="gap-1.5 text-[10px] font-medium">
                      <Award className="w-3 h-3" />
                      {training.acronym}
                    </Badge>
                  </div>

                  {/* Certifier badge */}
                  {training.certifier && (
                    <div className="absolute top-4 left-24 z-20">
                      <Badge variant="secondary" className="text-[10px] font-medium bg-white/10 backdrop-blur-sm">
                        Cert. {training.certifier}
                      </Badge>
                    </div>
                  )}

                  {/* Ícone "Saber mais" top right */}
                  <div className={cn(
                    "absolute top-4 right-4 z-20 transition-all duration-300",
                    "w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20",
                    "flex items-center justify-center text-white",
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                  )}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>

                  {/* Botão "Inscrever" bottom right */}
                  <div className={cn(
                    "absolute bottom-4 right-4 z-30 transition-all duration-300",
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}>
                    <Button 
                      onClick={(e) => handleEnroll(e, training)} 
                      size="sm" 
                      className="gap-2 shadow-lg bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300"
                    >
                      Inscrever
                      <ArrowUpRight className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Content bottom - fixo no bottom */}
                  <div className="absolute left-0 right-0 bottom-0 p-5 z-20">
                    {/* Duração */}
                    <p className="text-white/60 text-[11px] uppercase tracking-widest mb-1">
                      {training.duration}
                    </p>
                    
                    {/* Título */}
                    <h3 className={cn(
                      "text-white font-medium leading-snug transition-all duration-300",
                      "group-hover:text-primary",
                      isHovered ? "text-base mb-1" : "text-lg"
                    )}>
                      {training.title}
                    </h3>

                    {/* Descrição - aparece no hover */}
                    <div className={cn(
                      "overflow-hidden transition-all duration-300",
                      isHovered ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0"
                    )}>
                      <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
                        {training.description}
                      </p>
                    </div>

                    {/* Detalhes - aparecem no hover */}
                    <div className={cn(
                      "flex flex-wrap items-center gap-3 mt-2 text-xs text-white/50 transition-all duration-300",
                      isHovered ? "max-h-10 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    )}>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {training.duration}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {training.schedule || "Horário flexível"}
                      </span>
                      {training.price && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-white/30" />
                          <span className="text-primary-300 font-medium">{training.price}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info note */}
          <div className="mt-12 p-4 bg-muted/30 border border-border rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">📅 Turmas limitadas:</span> Garanta já a sua vaga. 
              Para mais informações, entre em contacto connosco.
            </p>
          </div>
        </div>
      </section>

      {/* Modal de inscrição */}
      {selectedTraining && (
        <EnrollmentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTraining(null);
          }}
          courseTitle={selectedTraining.title}
          courseId={selectedTraining.id}
          coursePrice={selectedTraining.price || "Sob consulta"}
        />
      )}
    </>
  );
}