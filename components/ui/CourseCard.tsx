"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EnrollmentModal } from "@/components/modals/EnrollmentModal";

export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  schedule: string;
  area: "tech" | "admin";
  badge?: string;
  image?: string;
  price?: string;
  variant?: "default" | "compact";
  className?: string;
}

const fallbackImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80";

export function CourseCard({
  id,
  title,
  description,
  duration,
  schedule,
  area,
  badge,
  image,
  price,
  variant = "default",
  className,
}: CourseCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleEnroll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  if (variant === "compact") {
    return (
      <>
        <div 
          className={cn(
            "group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300",
            "hover:shadow-lg hover:border-primary/20",
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link href={`/cursos/${id}`} className="block">
            <div className="flex flex-col sm:flex-row">
              <div className="relative sm:w-48 h-48 sm:h-auto overflow-hidden">
                <img
                  src={image || fallbackImage}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
                />
                {badge && (
                  <div className="absolute top-3 left-3">
                    <Badge variant={badge === "Destaque" ? "default" : "warning"} size="sm">
                      {badge}
                    </Badge>
                  </div>
                )}
              </div>
              <div className="flex-1 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {area === "tech" ? "Tecnológico" : "Administrativo"}
                    </p>
                    <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{description}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{duration}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{schedule}</span>
                  {price && <span className="flex items-center gap-1 text-primary font-medium">{price}</span>}
                </div>
              </div>
            </div>
          </Link>
          <div className="absolute bottom-5 right-5 z-20">
            <Button onClick={handleEnroll} size="sm" className="gap-2 shadow-lg bg-primary hover:bg-primary/90">
              Inscrever-se <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
        <EnrollmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} courseTitle={title} courseId={id} coursePrice={price} />
      </>
    );
  }

  // Default card
  return (
    <>
      <div 
        className={cn(
          "group relative rounded-xl overflow-hidden aspect-[4/3] transition-all duration-500",
          "hover:shadow-xl",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Link para detalhes - cobre todo o card exceto o botão */}
        <Link href={`/cursos/${id}`} className="absolute inset-0 z-10" />
        
        {/* Image */}
        <img
          src={image || fallbackImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
        />

        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-500" />
        <div className={cn(
          "absolute inset-0 bg-black/40 transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0"
        )} />

        {/* Badge top left */}
        {badge && (
          <div className="absolute top-4 left-4 z-20">
            <Badge variant={badge === "Destaque" ? "default" : "warning"} className="text-[10px] font-medium">
              {badge}
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

        {/* Botão "Inscrever" bottom right - com z-index maior que o link */}
        <div className={cn(
          "absolute bottom-4 right-4 z-30 transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Button 
            onClick={handleEnroll} 
            size="sm" 
            className="gap-2 shadow-lg bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300"
          >
            Inscrever
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>

        {/* Content bottom - NÃO SOBE, fica fixo no bottom */}
        <div className="absolute left-0 right-0 bottom-0 p-5 z-20">
          {/* Área do curso */}
          <p className="text-white/60 text-[11px] uppercase tracking-widest mb-1">
            {area === "tech" ? "Tecnológico" : "Administrativo"}
          </p>
          
          {/* Título do curso */}
          <h3 className={cn(
            "text-white font-medium leading-snug transition-all duration-300",
            "group-hover:text-primary",
            isHovered ? "text-base mb-1" : "text-lg"
          )}>
            {title}
          </h3>

          {/* Descrição - aparece no hover, mas não desloca o conteúdo */}
          <div className={cn(
            "overflow-hidden transition-all duration-300",
            isHovered ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0"
          )}>
            <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          {/* Detalhes - aparecem no hover */}
          <div className={cn(
            "flex flex-wrap items-center gap-3 mt-2 text-xs text-white/50 transition-all duration-300",
            isHovered ? "max-h-10 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          )}>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{duration}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{schedule}</span>
            {price && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="text-primary-300 font-medium">{price}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <EnrollmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        courseTitle={title} 
        courseId={id} 
        coursePrice={price} 
      />
    </>
  );
}