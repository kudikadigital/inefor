"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Briefcase, GraduationCap, Users, Calendar, ArrowRight, Shield, Network, Cpu, Server, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { corporateCourses } from "@/data";
import { Hero } from "@/components/sections/Hero";
import { EnrollmentModal } from "@/components/modals/EnrollmentModal";

type CategoryKey = keyof typeof corporateCourses;

const categoryInfo: Record<CategoryKey, { icon: React.ReactNode; color: string }> = {
  telecomunicacoes: { icon: <Briefcase className="w-5 h-5" />, color: "bg-blue-500" },
  computacao: { icon: <GraduationCap className="w-5 h-5" />, color: "bg-green-500" },
  segurancaEletronica: { icon: <Shield className="w-5 h-5" />, color: "bg-red-500" },
  redesDados: { icon: <Network className="w-5 h-5" />, color: "bg-purple-500" },
  electronica: { icon: <Cpu className="w-5 h-5" />, color: "bg-yellow-500" },
  ciscoHuawei: { icon: <Server className="w-5 h-5" />, color: "bg-indigo-500" },
  gestaoNegocios: { icon: <Users className="w-5 h-5" />, color: "bg-teal-500" },
};

export function CorporateCourses() {
  const [expandedCategories, setExpandedCategories] = useState<Record<CategoryKey, boolean>>({
    telecomunicacoes: true,
    computacao: false,
    segurancaEletronica: false,
    redesDados: false,
    electronica: false,
    ciscoHuawei: false,
    gestaoNegocios: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  const toggleCategory = (category: CategoryKey) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const handleEnroll = (courseName: string) => {
    setSelectedCourse(courseName);
    setIsModalOpen(true);
  };

  return (
    <>
      <Hero
        badge="Empresarial"
        title="Formação"
        titleHighlight="Corporativa"
        description="Escolha as formações ideais para a sua empresa, grupo de estudantes, especialistas e muito mais."
        variant="centered"
        showScrollIndicator={false}
        backgroundImage="/assets/banner/cursos_empresarial_banner.jpg"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Info Box */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-10 text-center">
          <h3 className="text-lg font-medium text-foreground mb-2">Formação Personalizada para Empresas</h3>
          <p className="text-muted-foreground mb-4">
            Desenvolvemos programas de formação sob medida para as necessidades específicas da sua empresa,
            com horários flexíveis e conteúdo adaptado à sua realidade.
          </p>
          <Button onClick={() => handleEnroll("Formação Corporativa")} className="gap-2">
            Solicitar Orçamento <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {(Object.keys(corporateCourses) as CategoryKey[]).map((category) => {
            const data = corporateCourses[category];
            const isExpanded = expandedCategories[category];
            const { icon, color } = categoryInfo[category];

            return (
              <div key={category} className="border border-border rounded-xl overflow-hidden bg-card">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white", color)}>
                      {icon}
                    </div>
                    <h3 className="text-lg font-medium text-foreground">{data.title}</h3>
                    <Badge variant="secondary" size="sm">
                      {data.courses.length} cursos
                    </Badge>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-border p-5 bg-muted/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {data.courses.map((course, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors group"
                        >
                          <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                            {course}
                          </span>
                          <button
                            onClick={() => handleEnroll(course)}
                            className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Inscrever
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Schedule Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-muted/30 rounded-xl border border-border">
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

      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCourse("");
        }}
        courseTitle={selectedCourse || "Formação Corporativa"}
        courseId="corporate"
        coursePrice="Sob consulta"
      />
    </>
  );
}