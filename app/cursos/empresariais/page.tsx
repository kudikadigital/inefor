"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, X, MessageCircle, Mail, Banknote, Calendar, ExternalLink, Briefcase, Users, GraduationCap, Shield, Network, Cpu, Server, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hero } from "@/components/sections/Hero";
import { CTABanner } from "@/components/sections/CTABanner";
import { EnrollmentModal } from "@/components/modals/EnrollmentModal";
import { corporateCourses } from "@/data";
import { cn } from "@/lib/utils";

type CategoryKey = keyof typeof corporateCourses;

// Mapeamento de ícones e cores para categorias
const categoryInfo: Record<CategoryKey, { icon: React.ReactNode; color: string; label: string }> = {
  telecomunicacoes: { icon: <Briefcase className="w-5 h-5" />, color: "bg-blue-500", label: "Telecomunicações" },
  computacao: { icon: <GraduationCap className="w-5 h-5" />, color: "bg-green-500", label: "Computação" },
  segurancaEletronica: { icon: <Shield className="w-5 h-5" />, color: "bg-red-500", label: "Segurança Eletrónica" },
  redesDados: { icon: <Network className="w-5 h-5" />, color: "bg-purple-500", label: "Redes de Dados" },
  electronica: { icon: <Cpu className="w-5 h-5" />, color: "bg-yellow-500", label: "Electrónica" },
  ciscoHuawei: { icon: <Server className="w-5 h-5" />, color: "bg-indigo-500", label: "Cisco & Huawei" },
  gestaoNegocios: { icon: <Users className="w-5 h-5" />, color: "bg-teal-500", label: "Gestão e Negócios" },
};

// Mapeamento de imagens para categorias (fallback)
const categoryImages: Record<CategoryKey, string> = {
  telecomunicacoes: "/images/courses/telecom.jpg",
  computacao: "/images/courses/computacao.jpg",
  segurancaEletronica: "/images/courses/seguranca.jpg",
  redesDados: "/images/courses/redes.jpg",
  electronica: "/images/courses/electronica.jpg",
  ciscoHuawei: "/images/courses/cisco.jpg",
  gestaoNegocios: "/images/courses/gestao.jpg",
};

const fallbackImage = "/all/11.jpg";

// Função para obter duração padrão
const getDuration = (category: CategoryKey): string => {
  const durationMap: Record<CategoryKey, string> = {
    telecomunicacoes: "80-120h",
    computacao: "60-100h",
    segurancaEletronica: "40-60h",
    redesDados: "60-80h",
    electronica: "40-80h",
    ciscoHuawei: "120-160h",
    gestaoNegocios: "40-80h",
  };
  return durationMap[category];
};

// Função para obter horário padrão
const getSchedule = (category: CategoryKey): string => {
  const scheduleMap: Record<CategoryKey, string> = {
    telecomunicacoes: "Horário flexível",
    computacao: "Online - flexível",
    segurancaEletronica: "Sábados 8h-17h",
    redesDados: "Terças e Quintas 19h-22h",
    electronica: "Segundas e Quartas 18h-21h",
    ciscoHuawei: "Online - ao vivo",
    gestaoNegocios: "Quintas 18h-22h",
  };
  return scheduleMap[category];
};

export default function EmpresariaisPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<{ title: string; category: CategoryKey } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Construir lista de todos os cursos com suas categorias
  const allCourses = Object.entries(corporateCourses).flatMap(([categoryKey, categoryData]) => 
    categoryData.courses.map(course => ({
      title: course,
      category: categoryKey as CategoryKey,
      categoryTitle: categoryData.title,
    }))
  );

  const filtered = allCourses.filter((course) => {
    const category = course.category;
    const matchesCategory = selectedCategory === "all" || category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedCategory("all");
    setSearchTerm("");
  };

  const hasActiveFilters = selectedCategory !== "all" || searchTerm !== "";

  const handleEnroll = (course: { title: string; category: CategoryKey }) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  // Componente de card para cada curso
  const CourseCard = ({ course }: { course: { title: string; category: CategoryKey; categoryTitle: string } }) => {
    const { icon, color, label } = categoryInfo[course.category];
    const imageUrl = categoryImages[course.category] || fallbackImage;

    return (
      <div className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer transition-all duration-500 hover:shadow-xl">
        {/* Link para saber mais (landing page) */}
        <a 
          href={`/cursos/empresariais/${course.category}/${encodeURIComponent(course.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
        />
        
        {/* Imagem */}
        <img
          src={imageUrl}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className={cn(
            "inline-flex items-center gap-1.5 backdrop-blur-md border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full",
            color
          )}>
            {icon}
            {label}
          </span>
        </div>

        {/* Ícone "Saber mais" top right */}
        <div className="absolute top-4 right-4 z-20 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-0">
          <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>

        {/* Botão "Inscrever" bottom right */}
        <div className="absolute bottom-4 right-4 z-30 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleEnroll(course);
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Inscrever
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Content bottom */}
        <div className="absolute left-0 right-0 bottom-0 p-5 z-20">
          <p className="text-white/60 text-[11px] uppercase tracking-widest mb-1">
            {getDuration(course.category)}
          </p>
          
          <h3 className="text-white font-medium text-lg leading-snug mb-1 group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          {/* Descrição - aparece no hover */}
          <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 group-hover:mt-2">
            <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
              Curso {label} com certificação reconhecida. Desenvolvido para atender as necessidades do mercado.
            </p>
          </div>

          {/* Detalhes - aparecem no hover */}
          <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-10 group-hover:mt-2">
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {getSchedule(course.category)}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-primary-300 font-medium">Sob consulta</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      
      {/* Hero Section */}
      <Hero
        badge="Empresarial"
        title="Formação"
        titleHighlight="Corporativa"
        description="Escolha as formações ideais para a sua empresa, grupo de estudantes, especialistas e muito mais."
        variant="centered"
        showScrollIndicator={false}
        backgroundImage="/assets/banner/cursos_empresarial_banner.jpg"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/cursos" className="hover:text-foreground transition-colors">Cursos</Link>
          <span>/</span>
          <span className="text-foreground">Formação Empresarial</span>
        </div>

        {/* Info Box */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-10 text-center">
          <h3 className="text-lg font-medium text-foreground mb-2">Formação Personalizada para Empresas</h3>
          <p className="text-muted-foreground mb-4">
            Desenvolvemos programas de formação sob medida para as necessidades específicas da sua empresa,
            com horários flexíveis e conteúdo adaptado à sua realidade.
          </p>
          <Button onClick={() => handleEnroll({ title: "Formação Corporativa", category: "gestaoNegocios" })} className="gap-2">
            Solicitar Orçamento <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Filters - Apenas busca e categorias */}
        <div className="bg-card border border-border rounded-xl p-4 mb-8">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar curso..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-muted border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {/* Categorias */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-xs text-muted-foreground font-medium">Categoria:</span>
            </div>
            <div className="overflow-x-auto scrollbar-hide pb-1">
              <div className="flex items-center gap-1.5 min-w-max">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={cn(
                    "px-3 py-1.5 text-xs rounded-md transition-all whitespace-nowrap",
                    selectedCategory === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  )}
                >
                  Todos
                </button>
                {(Object.keys(corporateCourses) as CategoryKey[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-3 py-1.5 text-xs rounded-md transition-all whitespace-nowrap flex items-center gap-1.5",
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    )}
                  >
                    <span className="hidden sm:inline">{categoryInfo[cat].icon}</span>
                    {categoryInfo[cat].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex justify-end mt-4 pt-2 border-t border-border">
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3 h-3" />
                Limpar todos os filtros
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-muted-foreground">
            {filtered.length} curso{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Courses Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Nenhum curso encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, idx) => (
              <CourseCard key={`${course.category}-${idx}`} course={course} />
            ))}
          </div>
        )}

        {/* Schedule Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-primary/5 border border-primary/20 rounded-xl">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Horários Flexíveis</h4>
              <p className="text-sm text-muted-foreground">
                Segunda a Sexta: 8h-11h, 11h-13h30, 13h30-16h30, 17h-19h30<br />
                Sábado: 8h-13h, 13h-18h
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Banknote className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Dados Bancários</h4>
              <p className="text-sm text-muted-foreground">
                Conta BAI: 9848701410001<br />
                IBAN: 0040.0000.9848.7014.1014.9
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTABanner
        badge="Dúvidas?"
        title="Fale com um"
        titleHighlight="consultor"
        description="Tem dúvidas sobre qual curso escolher para sua empresa? Nossa equipa está disponível para ajudar."
        variant="centered"
        background="gradient"
        actions={[
          {
            label: "Falar no WhatsApp",
            href: "https://wa.me/244944683483",
            icon: <MessageCircle className="w-4 h-4" />,
            variant: "default",
            external: true,
          },
          {
            label: "Contacto",
            href: "/contacto",
            icon: <Mail className="w-4 h-4" />,
            variant: "outline",
          },
        ]}
      />

      {/* Modal de inscrição */}
      {selectedCourse && (
        <EnrollmentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCourse(null);
          }}
          courseTitle={selectedCourse.title}
          courseId={`corporate-${selectedCourse.category}`}
          coursePrice="Sob consulta"
        />
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}