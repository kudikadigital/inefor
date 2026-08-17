"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hero } from "@/components/sections/Hero";
import { cn } from "@/lib/utils";
import { services } from "@/data";

export default function ServiceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Serviço não encontrado</h1>
          <Link href="/servicos">
            <Button>Voltar para serviços</Button>
          </Link>
        </div>
      </div>
    );
  }

  const related = services.filter((s) => s.id !== service.id).slice(0, 3);
  const quoteHref = `/contacto?servico=${encodeURIComponent(service.title)}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">

      {/* Hero */}
      <Hero
        badge="Detalhes do Serviço"
        title={service.title}
        titleHighlight=""
        description={service.desc}
        variant="compact"
        showScrollIndicator={false}
        backgroundImage="/all/03.jpg"
      />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/servicos" className="hover:text-foreground transition-colors">Serviços</Link>
            <span>/</span>
            <span className="text-foreground truncate">{service.title}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <Link href="/servicos">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar aos serviços
          </button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main column */}
          <div className="lg:col-span-2">
            <span className={cn("inline-block w-10 h-1 rounded-full bg-gradient-to-r mb-6", service.bar)} />
            <h2 className="text-2xl font-light text-foreground mb-4">Sobre este serviço</h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              {service.longDesc || service.desc}
            </p>

            {service.deliverables && (
              <>
                <h2 className="text-2xl font-light text-foreground mb-4">O que inclui</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="text-2xl font-light text-foreground mb-4">Destaques</h2>
            <ul className="space-y-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", service.dot)} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 overflow-hidden relative">
              <div className={cn("absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30", service.glow)} />
              <div className="relative z-10">
                <Badge variant="glass" className="mb-4">Investimento</Badge>
                <p className="text-2xl font-light text-white mb-1">{service.price}</p>
                <p className="text-white/50 text-sm mb-6">
                  Proposta desenhada de acordo com o âmbito e dimensão do projecto.
                </p>
                <div className="flex flex-col gap-3">
                  <Link href={quoteHref}>
                    <Button className="w-full gap-2">
                      Solicitar orçamento
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <a href="https://wa.me/244944683483" target="_blank" rel="noopener noreferrer">
                    <Button variant="glass" className="w-full gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Falar no WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related services */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-light text-foreground mb-6">Outros serviços</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((s) => (
                <Link
                  key={s.id}
                  href={`/servicos/${s.id}`}
                  className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/30"
                >
                  <div className={cn("absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r", s.bar)} />
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-4xl font-extralight text-white/10 tabular-nums">{s.number}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-white font-medium mb-2">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{s.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
