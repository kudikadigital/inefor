"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonWithIcon } from "../ui/button-with-icon";

const slides = [
  {
    id: 1,
    eyebrow: "Plataforma de Formação",
    title: "O seu Futuro\né a nossa Missão",
    description:
      "Centro de excelência em formação técnica e administrativa. Cursos certificados, treinamentos profissionais e eventos de alto impacto em Luanda.",
    cta: { label: "Ver Cursos", href: "/cursos" },
    secondary: { label: "Saber mais", href: "/sobre" },
    tag: "Inscrições abertas",
    image: "/all/11.jpg",
  },
  {
    id: 2,
    eyebrow: "Soluções Tech",
    title: "Cisco · Linux · Fibra\nFormação de Elite",
    description:
      "CCNA, NOC, Fibra Óptica, Cabeamento Estruturado, Segurança de Redes. Laboratórios práticos com certificação reconhecida internacionalmente.",
    cta: { label: "Cursos Tecnológicos", href: "/cursos?area=tech" },
    secondary: { label: "Treinamentos", href: "/treinamentos" },
    tag: "Área Tecnológica",
    image: "/all/02.jpg",
  },
  {
    id: 3,
    eyebrow: "Eventos 2025",
    title: "BMINDS · WCP\nINOC — Abril a Junho",
    description:
      "Business Minds Summit, Workshop de Cabeamento Profissional e Inefor NOC Challenge. Os maiores eventos de tecnologia e negócios em Angola.",
    cta: { label: "Ver Eventos", href: "/eventos" },
    secondary: { label: "Inscrever", href: "/contacto" },
    tag: "Próximos eventos",
    image: "/all/03.jpg",
  },
  {
    id: 4,
    eyebrow: "Área Administrativa",
    title: "Gestão · Finanças\nProdutividade Empresarial",
    description:
      "Programas executivos para profissionais e empresas. Gestão de Projectos, RH, Contabilidade e Microsoft Office em nível avançado.",
    cta: { label: "Cursos Admin", href: "/cursos?area=admin" },
    secondary: { label: "Empresarial", href: "/servicos" },
    tag: "Área Administrativa",
    image: "/all/04.jpg",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(idx);
      setTimeout(() => setAnimating(false), 700);
    },
    [animating],
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo],
  );
  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo],
  );

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background images with crossfade */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${s.image}), url(/images/hero-fallback.jpg)`,
            }}
          />
          {/* Dark overlay — stronger on left for text legibility */}
          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10 z-20">
        <div
          className="h-full bg-secondary transition-all duration-500 ease-out"
          style={{ width: `${((current + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Content — left aligned */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-20 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div
            key={`eyebrow-${current}`}
            className="flex items-center gap-3 mb-6 animate-fade-in"
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium text-secondary/80 tracking-widest uppercase">
              <span className="w-8 h-px bg-secondary/80" />
              {slide.eyebrow}
            </span>

            <span className="text-xs bg-secondary/30 text-secondary border border-secondary/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
              {slide.tag}
            </span>
          </div>

          {/* Heading */}
          <h1
            key={`h-${current}`}
            className="text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.05] tracking-tight mb-6 animate-fade-up whitespace-pre-line"
          >
            {slide.title}
          </h1>

          {/* Description */}
          <p
            key={`d-${current}`}
            className="text-lg text-white/70 max-w-lg leading-relaxed mb-10 animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            {slide.description}
          </p>

          {/* CTAs */}
          <div
            key={`cta-${current}`}
            className="flex flex-wrap items-center gap-4 animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            <Link href={slide.cta.href}>
              <ButtonWithIcon>{slide.cta.label}</ButtonWithIcon>
            </Link>

            <Link href={slide.secondary.href}>
              <Button
                variant="glass"
                size="lg"
                className="h-12 px-6 text-sm rounded-full"
              >
                {slide.secondary.label}
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-8 left-6 sm:left-8 lg:left-12 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === current
                  ? "w-8 h-2 bg-(--primary-900)/50 hover:bg-(--primary-900)/70"
                  : "w-2 h-2 bg-white/20 hover:bg-white/60",
              )}
            />
          ))}
        </div>

        <div className="absolute bottom-6 right-6 sm:right-8 lg:right-12 flex items-center gap-2">
          <span className="text-white/40 text-xs font-mono tabular-nums mr-2">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
          {[prev, next].map((fn, i) => (
            <button
              key={i}
              onClick={fn}
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              {i === 0 ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
