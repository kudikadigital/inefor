"use client";

import React, { useState } from "react";
import { Cable, Smartphone, Shield, Cpu, Code, Network, Server, Banknote, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { technicalCoursesByCategory } from "@/data";
import { EnrollmentModal } from "@/components/modals/EnrollmentModal";

type CategoryKey = keyof typeof technicalCoursesByCategory;

const categoryIcons: Record<CategoryKey, React.ReactNode> = {
  comunicacoesOpticas: <Cable className="w-5 h-5" />,
  comunicacoesMoveis: <Smartphone className="w-5 h-5" />,
  segurancaEletronica: <Shield className="w-5 h-5" />,
  microEletronica: <Cpu className="w-5 h-5" />,
  programacaoWeb: <Code className="w-5 h-5" />,
};

const categoryColors: Record<CategoryKey, string> = {
  comunicacoesOpticas: "from-blue-500 to-cyan-500",
  comunicacoesMoveis: "from-green-500 to-teal-500",
  segurancaEletronica: "from-red-500 to-orange-500",
  microEletronica: "from-purple-500 to-pink-500",
  programacaoWeb: "from-yellow-500 to-amber-500",
};

export function TechnicalCoursesByCategory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  const handleEnroll = (courseName: string) => {
    setSelectedCourse(courseName);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="space-y-16">
        {(Object.keys(technicalCoursesByCategory) as CategoryKey[]).map((category) => {
          const data = technicalCoursesByCategory[category];

          return (
            <div key={category} id={data.id}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={cn("w-10 h-10 rounded-lg bg-gradient-to-r flex items-center justify-center text-white", categoryColors[category])}>
                  {categoryIcons[category]}
                </div>
                <h2 className="text-2xl font-light text-foreground">{data.title}</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.courses.map((course, idx) => (
                  <div
                    key={idx}
                    className="group bg-card border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-foreground font-medium text-sm group-hover:text-primary transition-colors">
                          {course}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          Curso técnico profissionalizante com certificação
                        </p>
                      </div>
                      <Button
                        onClick={() => handleEnroll(course)}
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        Inscrever
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCourse("");
        }}
        courseTitle={selectedCourse}
        courseId="technical"
        coursePrice="Sob consulta"
      />
    </>
  );
}