"use client";

import React from "react";
import Link from "next/link";
import { Clock, Calendar, Layers, Award, Target, BookOpen, Users, CheckCircle, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  schedule: string;
  area: "tech" | "admin";
  badge?: string;
  price?: string;
  syllabus?: string[];
  prerequisites?: string[];
  objectives?: string[];
  targetAudience?: string[];
}

interface CourseDetailsProps {
  course: Course;
  relatedCourses: Course[];
  onEnroll: () => void;
}

export function CourseDetails({ course, relatedCourses, onEnroll }: CourseDetailsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {course.area === "tech" ? "Tecnológico" : "Administrativo"}
              </span>
            </div>
            {course.badge && (
              <Badge variant={course.badge === "Destaque" ? "default" : "warning"}>
                {course.badge}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-foreground mb-4">{course.title}</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">{course.description}</p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <Clock className="w-5 h-5 text-primary mb-2" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Duração</p>
            <p className="text-foreground font-medium">{course.duration}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <Calendar className="w-5 h-5 text-primary mb-2" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Horário</p>
            <p className="text-foreground font-medium">{course.schedule}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <Users className="w-5 h-5 text-primary mb-2" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Modalidade</p>
            <p className="text-foreground font-medium">Presencial / Online</p>
          </div>
        </div>

        {/* Sobre o curso */}
        <div>
          <h2 className="text-xl font-medium text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Sobre o curso
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Este curso é desenvolvido para profissionais que pretendem aprofundar os seus conhecimentos em {course.title}. 
            O programa combina teoria com prática intensa, preparando os formandos para os desafios reais do mercado angolano e internacional.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Ao concluir a formação, o formando receberá um certificado reconhecido pelo Inefor e estará capacitado 
            para aplicar os conhecimentos adquiridos no exercício da sua actividade profissional.
          </p>
        </div>

        {/* Objetivos */}
        {course.objectives && course.objectives.length > 0 && (
          <div>
            <h2 className="text-xl font-medium text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Objectivos
            </h2>
            <ul className="space-y-2">
              {course.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Público-alvo */}
        {course.targetAudience && course.targetAudience.length > 0 && (
          <div>
            <h2 className="text-xl font-medium text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Público-alvo
            </h2>
            <ul className="space-y-2">
              {course.targetAudience.map((target, idx) => (
                <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{target}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Conteúdo Programático */}
        {course.syllabus && course.syllabus.length > 0 && (
          <div>
            <h2 className="text-xl font-medium text-foreground mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Conteúdo Programático
            </h2>
            <div className="space-y-3">
              {course.syllabus.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pré-requisitos */}
        {course.prerequisites && course.prerequisites.length > 0 && (
          <div>
            <h2 className="text-xl font-medium text-foreground mb-4">Pré-requisitos</h2>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
              {course.prerequisites.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Certificação */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <Award className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h3 className="font-medium text-foreground mb-1">Certificação Reconhecida</h3>
              <p className="text-sm text-muted-foreground">
                Ao concluir este curso, receberá um certificado de conclusão reconhecido pelo Inefor, 
                validando suas novas competências e habilidades perante o mercado de trabalho.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* CTA Card */}
        <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
          <h3 className="text-lg font-medium text-foreground mb-2">Inscrever-me neste curso</h3>
          {course.price && (
            <p className="text-2xl font-bold text-primary mb-1">{course.price}</p>
          )}
          <p className="text-muted-foreground text-sm mb-5">
            Garanta o seu lugar nesta turma. As vagas são limitadas.
          </p>
          
          <Button onClick={onEnroll} className="w-full gap-2 mb-3">
            Inscrever agora <ArrowRight className="w-4 h-4" />
          </Button>
          
          <a
            href={`https://wa.me/244944683483?text=Olá, tenho interesse no curso ${encodeURIComponent(course.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant="outline" className="w-full gap-2">
              <MessageCircle className="w-4 h-4" />
              Falar pelo WhatsApp
            </Button>
          </a>
        </div>

        {/* Cursos relacionados */}
        {relatedCourses.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-foreground font-medium mb-4">Cursos relacionados</h3>
            <div className="space-y-3">
              {relatedCourses.map((r) => (
                <Link key={r.id} href={`/cursos/${r.id}`}>
                  <div className="flex items-center justify-between py-2 border-b border-border last:border-0 group cursor-pointer">
                    <span className="text-muted-foreground text-sm group-hover:text-primary transition-colors">
                      {r.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}