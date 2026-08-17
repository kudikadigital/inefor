"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface HeroProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  backgroundImage?: string;
  showScrollIndicator?: boolean;
  variant?: "default" | "centered" | "compact";
  className?: string;
  children?: React.ReactNode;
}

export function Hero({
  badge = "Destaque",
  title,
  titleHighlight,
  description,
  backgroundImage = "/all/11.jpg",
  showScrollIndicator = true,
  variant = "default",
  className,
  children,
}: HeroProps) {
  const isCentered = variant === "centered";
  const isCompact = variant === "compact";

  return (
    <section
      className={cn(
        "relative flex items-center overflow-hidden",
        isCompact ? "min-h-[50vh]" : "min-h-[70vh]",
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div
          className={cn(
            isCentered ? "text-center mx-auto" : "",
            isCompact ? "max-w-3xl" : "max-w-4xl"
          )}
        >
          {badge && (
            <Badge
              variant="glass"
              className={cn(
                "mb-6 gap-2 w-fit",
                isCentered && "mx-auto"
              )}
            >
              <span className="w-5 h-px bg-primary" />
              {badge}
            </Badge>
          )}

          <h1
            className={cn(
              "font-light text-white leading-[1.1] tracking-tight mb-6",
              isCompact
                ? "text-3xl sm:text-4xl lg:text-5xl"
                : "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
            )}
          >
            {title}{" "}
            {titleHighlight && (
              <span className="text-primary">{titleHighlight}</span>
            )}
          </h1>

          {description && (
            <p
              className={cn(
                "text-white/80 leading-relaxed",
                isCompact
                  ? "text-base max-w-2xl"
                  : "text-lg max-w-2xl",
                isCentered && "mx-auto"
              )}
            >
              {description}
            </p>
          )}

          {children && (
            <div
              className={cn(
                "flex flex-wrap gap-4 mt-8",
                isCentered && "justify-center"
              )}
            >
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      {showScrollIndicator && !isCompact && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      )}
    </section>
  );
}

// Presets for common pages
export function CoursesHero() {
  return (
    <Hero
      badge="Formação"
      title="Todos os"
      titleHighlight="Cursos"
      description="Cursos tecnológicos e administrativos para profissionais em Angola."
      variant="default"
      showScrollIndicator={false}
    />
  );
}

export function AboutHero() {
  return (
    <Hero
      badge="Quem Somos"
      title="Sobre o"
      titleHighlight="Inefor"
      description="Centro de excelência fundado para transformar vidas através da formação técnica, tecnológica e científica em Angola."
      variant="centered"
      showScrollIndicator={true}
    />
  );
}

export function ContactHero() {
  return (
    <Hero
      badge="Contacto"
      title="Fale"
      titleHighlight="Conosco"
      description="Estamos disponíveis para tirar suas dúvidas e ajudar na sua jornada de formação."
      variant="centered"
      showScrollIndicator={false}
    />
  );
}

export function EventsHero() {
  return (
    <Hero
      badge="Eventos"
      title="Próximos"
      titleHighlight="Eventos"
      description="Participe dos nossos eventos e workshops para impulsionar sua carreira."
      variant="default"
      showScrollIndicator={false}
    />
  );
}

export function BlogHero() {
  return (
    <Hero
      badge="Blog"
      title="Artigos e"
      titleHighlight="Novidades"
      description="Fique por dentro das últimas tendências e novidades do mundo da tecnologia e gestão."
      variant="centered"
      showScrollIndicator={false}
      backgroundImage="/all/02.jpg"
    />
  );
}

export function ServicesHero() {
  return (
    <Hero
      badge="Serviços"
      title="Nossos"
      titleHighlight="Serviços"
      description="Soluções completas para empresas e profissionais que buscam excelência."
      variant="default"
      showScrollIndicator={false}
      backgroundImage="/all/03.jpg"
    />
  );
}

export function ProductsHero() {
  return (
    <Hero
      badge="Produtos"
      title="Nossos"
      titleHighlight="Produtos"
      description="Soluções inovadoras para o seu negócio."
      variant="centered"
      showScrollIndicator={false}
      backgroundImage="/all/04.jpg"
    />
  );
}