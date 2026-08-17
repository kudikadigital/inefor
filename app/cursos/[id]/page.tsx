"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses } from "@/data";
import { CourseDetails } from "@/components/sections/CourseDetails";
import { EnrollmentModal } from "@/components/modals/EnrollmentModal";
import { Hero } from "@/components/sections/Hero";

// Mapeamento de imagens por curso (opcional - só se quiser imagens específicas)
const courseImages: Record<string, string> = {
  "cisco-ccna": "/images/courses/ccna.jpg",
  "linux-admin": "/images/courses/linux.jpg",
  "fibra-optica": "/images/courses/fibra.jpg",
  "cabling": "/images/courses/cabling.jpg",
  "seguranca-redes": "/images/courses/security.jpg",
  "microsoft-office": "/images/courses/office.jpg",
  "gestao-projetos": "/images/courses/pmp.jpg",
  "recursos-humanos": "/images/courses/rh.jpg",
  "contabilidade": "/images/courses/finance.jpg",
};

// Imagem de fallback padrão para todos os cursos
const FALLBACK_IMAGE = "/all/11.jpg";

// Imagens de fallback por área (opcional - mais específico)
const areaFallbackImages: Record<string, string> = {
  // tech: "/images/courses/tech-fallback.jpg",
  // admin: "/images/courses/admin-fallback.jpg",
  tech: "/all/11.jpg",
  admin: "/all/11.jpg",
};

// Função para obter a imagem do curso com fallback
const getCourseImage = (courseId: string, courseArea: string): string => {
  // 1. Tenta pegar imagem específica do curso
  if (courseImages[courseId]) {
    return courseImages[courseId];
  }
  
  // 2. Se não tem imagem específica, tenta fallback por área
  if (areaFallbackImages[courseArea]) {
    return areaFallbackImages[courseArea];
  }
  
  // 3. Fallback padrão global
  return FALLBACK_IMAGE;
};

export default function CourseDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const course = courses.find((c) => c.id === id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Curso não encontrado</h1>
          <Link href="/cursos">
            <Button>Voltar para cursos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const related = courses.filter((c) => c.area === course.area && c.id !== course.id).slice(0, 3);
  
  // Obtém a imagem do curso usando a função de fallback
  // const courseImage = getCourseImage(course.id, course.area);

    // Usa a imagem do data, com fallback
  const courseImage = course.image || FALLBACK_IMAGE;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      
      {/* Hero com imagem do curso */}
      <Hero
        badge="Detalhes do Curso"
        title={course.title}
        titleHighlight=""
        description={course.description}
        variant="compact"
        showScrollIndicator={false}
        backgroundImage={courseImage}
      />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/cursos" className="hover:text-foreground transition-colors">Cursos</Link>
            <span>/</span>
            <span className="text-foreground truncate">{course.title}</span>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <Link href="/cursos">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar aos cursos
          </button>
        </Link>

        <CourseDetails
          course={{
            ...course,
            syllabus: course.syllabus || [
              "Módulo 1: Introdução à área",
              "Módulo 2: Conceitos fundamentais",
              "Módulo 3: Prática e aplicações",
              "Módulo 4: Casos reais e projetos",
            ],
            prerequisites: course.prerequisites || [
              "Conhecimentos básicos da área",
              "Acesso a computador com internet",
            ],
            objectives: course.objectives || [
              `Dominar os conceitos fundamentais de ${course.title}`,
              "Aplicar conhecimentos em situações reais",
              "Desenvolver habilidades práticas",
              "Preparar-se para certificações",
            ],
            targetAudience: course.targetAudience || [
              "Profissionais da área",
              "Estudantes e recém-formados",
              "Empreendedores",
              "Interessados em atualização profissional",
            ],
          }}
          relatedCourses={related}
          onEnroll={() => setIsModalOpen(true)}
        />
      </div>

      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseTitle={course.title}
        courseId={course.id}
        coursePrice={course.price}
      />
    </div>
  );
}