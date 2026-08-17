"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { courses } from "@/data";
import { CoursesHero } from "@/components/sections/Hero";
import { CourseCard } from "@/components/ui/CourseCard";

type Area = "all" | "tech" | "admin";

export default function CursosPage() {
  const [area, setArea] = useState<Area>("all");
  const [search, setSearch] = useState("");

  const filtered = courses.filter(
    (c) =>
      (area === "all" || c.area === area) &&
      (search === "" || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      
      {/* Hero Section - Usando o preset CoursesHero */}
      <CoursesHero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar cursos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-card border border-border text-foreground text-sm rounded-lg placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>
          <div className="flex items-center gap-1 border border-border rounded-lg p-1 w-fit bg-card">
            {(["all", "tech", "admin"] as Area[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setArea(tab)}
                className={cn(
                  "px-4 py-1.5 text-sm rounded-md transition-all",
                  area === tab 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {tab === "all" ? "Todos" : tab === "tech" ? "Tecnológicos" : "Administrativos"}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-muted-foreground text-sm mb-6">
          {filtered.length} curso{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Courses Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p>Nenhum curso encontrado com esse filtro.</p>
          </div>
        ) : (
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
                price={course.price}
                image={course.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}