"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CourseCard } from "@/components/ui/CourseCard";
import { courses } from "@/data";

type Area = "all" | "tech" | "admin";

// Imagens para os cursos
const courseImages: Record<string, string> = {
  "cisco-ccna":       "/images/courses/ccna.jpg",
  "linux-admin":      "/images/courses/linux.jpg",
  "fibra-optica":     "/images/courses/fibra.jpg",
  "cabling":          "/images/courses/cabling.jpg",
  "seguranca-redes":  "/images/courses/security.jpg",
  "microsoft-office": "/images/courses/office.jpg",
  "gestao-projetos":  "/images/courses/pmp.jpg",
  "recursos-humanos": "/images/courses/rh.jpg",
  "contabilidade":    "/images/courses/finance.jpg",
};

export function FeaturedCourses() {
  const [area, setArea] = useState<Area>("all");
  const filtered = courses.filter((c) => area === "all" || c.area === area);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-primary text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-primary" />
              Soluções de Formação
            </p>
            <h2 className="text-4xl font-light text-foreground leading-tight">
              Cursos em Destaque
            </h2>
          </div>
          <Link href="/cursos">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              Ver todos <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-10 border-b border-border pb-px">
          {(["all", "tech", "admin"] as Area[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setArea(tab)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px",
                area === tab
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab === "all" ? "Todos" : tab === "tech" ? "Tecnológicos" : "Administrativos"}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              duration={course.duration}
              schedule={course.schedule}
              area={course.area}
              badge={course.badge}
              // image={courseImages[course.id]}
              price={course.price}
              image={course.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}