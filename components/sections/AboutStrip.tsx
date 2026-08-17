"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Target, Eye, Zap, Play, Pause, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Pillar {
  key: string;
  icon: React.ElementType;
  title: string;
  text: string;
  image: string;
}

interface ButtonConfig {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "glass" | "secondary";
  icon?: React.ReactNode;
}

interface AboutStripProps {
  variant?: "compact" | "full";
  badgeText?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  secondaryText?: string;
  pillars?: Pillar[];
  buttons?: ButtonConfig[];
  showBadge?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  className?: string;
}

const defaultPillars: Pillar[] = [
  {
    key: "missao",
    icon: Target,
    title: "Missão",
    text: "Gerar conhecimento, formar profissionais que atendam as exigências do mercado e promover o empreendedorismo e o desenvolvimento científico e tecnológico, contribuindo para o crescimento da sociedade.",
    image: "/about/06.jpg",
  },
  {
    key: "visao",
    icon: Eye,
    title: "Visão",
    text: "Ser referência no sector da formação técnica e tecnológica, formando profissionais de alto nível e transferindo conhecimento científico e tecnológico para a sociedade angolana e internacional.",
    image: "/about/07.jpg",
  },
  {
    key: "valores",
    icon: Zap,
    title: "Valores",
    text: "Excelência, Inovação, Respeito ao Ser Humano, Qualidade, Melhoria Contínua, Honestidade, Profissionalismo e Ética — norteados pelo Temor a Deus.",
    image: "/about/08.jpg",
  },
];

const defaultButtons: ButtonConfig[] = [
  {
    label: "Conhecer o Inefor",
    href: "/sobre",
    variant: "outline",
    icon: <ArrowRight className="w-4 h-4" />,
  },
];

// Função auxiliar para renderizar botão (não é componente)
const renderButton = (btn: ButtonConfig, idx: number) => {
  const buttonClass = cn(
    "gap-2 group",
    btn.variant === "glass" && "border-white/30 text-white bg-white/5 hover:bg-white/10 backdrop-blur-md"
  );

  const content = (
    <>
      {btn.label}
      {btn.icon && <span className="transition-transform group-hover:translate-x-1">{btn.icon}</span>}
    </>
  );

  if (btn.onClick) {
    return (
      <Button
        key={idx}
        variant={btn.variant === "glass" ? "default" : btn.variant}
        onClick={btn.onClick}
        className={buttonClass}
      >
        {content}
      </Button>
    );
  }

  if (btn.href) {
    return (
      <Link key={idx} href={btn.href}>
        <Button variant={btn.variant === "glass" ? "default" : btn.variant} className={buttonClass}>
          {content}
        </Button>
      </Link>
    );
  }

  return null;
};

export function AboutStrip({ 
  variant = "compact",
  badgeText = "Sobre o Inefor",
  title = "Centro de Excelência",
  subtitle = "em Formação Contínua",
  description = "Idealizado em 2014 e fundado em 2018, o INEFOR busca soluções através da formação contínua e investigação científica nas áreas de Engenharia, Gestão e Negócios.",
  secondaryText = "A instituição visa o binómio Academia–Indústria como forma de proporcionar o desenvolvimento social. Consolidado no mercado angolano, projecta protagonismo no mercado internacional.",
  pillars = defaultPillars,
  buttons = defaultButtons,
  showBadge = true,
  showTitle = true,
  showDescription = true,
  className = "",
}: AboutStripProps) {
  const [active, setActive] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const nextSlide = useCallback(() => {
    setActive((prev) => (prev + 1) % pillars.length);
  }, [pillars.length]);

  const prevSlide = useCallback(() => {
    setActive((prev) => (prev - 1 + pillars.length) % pillars.length);
  }, [pillars.length]);

  useEffect(() => {
    if (!isAutoPlaying || isHovering) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovering, nextSlide]);

  const currentPillar = pillars[active];

  // Layout compacto para home (apenas o card)
  if (variant === "compact") {
    return (
      <div className={cn("w-full", className)}>
        <div 
          className="relative rounded-2xl overflow-hidden shadow-2xl w-full"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
            style={{ 
              backgroundImage: `url(${currentPillar.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/60 to-primary-800/40" />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/30" />

          {/* Conteúdo */}
          <div className="relative z-10 min-h-125 p-8 flex flex-col">
            {/* Pill tabs */}
            <div className="flex flex-wrap items-center gap-2 justify-center">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.key}
                    onClick={() => {
                      setActive(i);
                      setIsAutoPlaying(false);
                      setTimeout(() => setIsAutoPlaying(true), 10000);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md",
                      active === i
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {p.title}
                  </button>
                );
              })}
              
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="ml-2 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all"
              >
                {isAutoPlaying ? (
                  <Pause className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-white" />
                )}
              </button>
            </div>

            <div className="flex-1" />

            {/* Conteúdo - Bottom Left */}
            <div className="relative overflow-hidden mb-6">
              {pillars.map((p, i) => (
                <div
                  key={p.key}
                  className={cn(
                    "transition-all duration-500 ease-out",
                    active === i
                      ? "opacity-100 translate-x-0"
                      : i < active
                      ? "opacity-0 -translate-x-full absolute inset-0 pointer-events-none"
                      : "opacity-0 translate-x-full absolute inset-0 pointer-events-none"
                  )}
                >
                  <p className="text-white/90 text-base leading-relaxed text-left max-w-md">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Dots e controles */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2">
                {pillars.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActive(i);
                      setIsAutoPlaying(false);
                      setTimeout(() => setIsAutoPlaying(true), 10000);
                    }}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      i === active
                        ? "w-8 h-2 bg-primary"
                        : "w-2 h-2 bg-white/40 hover:bg-white/60"
                    )}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    prevSlide();
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 10000);
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    nextSlide();
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 10000);
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {isAutoPlaying && !isHovering && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
                <div 
                  className="h-full bg-primary transition-all duration-5000 linear"
                  style={{ 
                    width: isAutoPlaying ? '100%' : '0%',
                    transition: 'width 5000ms linear'
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Layout full para página sobre (com texto lateral e botões)
  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left - Texto fixo */}
        <div>
          {showBadge && (
            <Badge variant="outline" className="mb-4">
              {badgeText}
            </Badge>
          )}
          {showTitle && (
            <h2 className="text-3xl font-light text-foreground mb-6">
              {title} <span className="text-primary">{subtitle}</span>
            </h2>
          )}
          {showDescription && (
            <>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {description}
              </p>
              {secondaryText && (
                <p className="text-muted-foreground/70 text-sm leading-relaxed mb-6">
                  {secondaryText}
                </p>
              )}
            </>
          )}
          
          {/* Botões */}
          {buttons && buttons.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {buttons.map((btn, idx) => renderButton(btn, idx))}
            </div>
          )}
        </div>

        {/* Right - Card com slide */}
        <div 
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
            style={{ 
              backgroundImage: `url(${currentPillar.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/60 to-primary-800/40" />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/30" />

          {/* Conteúdo */}
          <div className="relative z-10 min-h-125 p-8 flex flex-col">
            {/* Pill tabs */}
            <div className="flex flex-wrap items-center gap-2 justify-center">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.key}
                    onClick={() => {
                      setActive(i);
                      setIsAutoPlaying(false);
                      setTimeout(() => setIsAutoPlaying(true), 10000);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md",
                      active === i
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {p.title}
                  </button>
                );
              })}
              
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="ml-2 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all"
              >
                {isAutoPlaying ? (
                  <Pause className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-white" />
                )}
              </button>
            </div>

            <div className="flex-1" />

            {/* Conteúdo - Bottom Left */}
            <div className="relative overflow-hidden mb-6">
              {pillars.map((p, i) => (
                <div
                  key={p.key}
                  className={cn(
                    "transition-all duration-500 ease-out",
                    active === i
                      ? "opacity-100 translate-x-0"
                      : i < active
                      ? "opacity-0 -translate-x-full absolute inset-0 pointer-events-none"
                      : "opacity-0 translate-x-full absolute inset-0 pointer-events-none"
                  )}
                >
                  <p className="text-white/90 text-base leading-relaxed text-left max-w-md">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Dots e controles */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2">
                {pillars.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActive(i);
                      setIsAutoPlaying(false);
                      setTimeout(() => setIsAutoPlaying(true), 10000);
                    }}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      i === active
                        ? "w-8 h-2 bg-primary"
                        : "w-2 h-2 bg-white/40 hover:bg-white/60"
                    )}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    prevSlide();
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 10000);
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    nextSlide();
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 10000);
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {isAutoPlaying && !isHovering && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
                <div 
                  className="h-full bg-primary transition-all duration-5000 linear"
                  style={{ 
                    width: isAutoPlaying ? '100%' : '0%',
                    transition: 'width 5000ms linear'
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}