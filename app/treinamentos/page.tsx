"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  X,
  MessageCircle,
  Mail,
  Banknote,
  Calendar,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/sections/Hero";
import { CTABanner } from "@/components/sections/CTABanner";
import { trainings } from "@/data";
import { cn } from "@/lib/utils";

type Category = "all" | "tech" | "management" | "certification";
type Modality = "all" | "presencial" | "online" | "hybrid";

// Links das landing pages para cada treinamento
const trainingLinks: Record<string, { learnMore: string; enroll: string }> = {
  estagio: {
    learnMore: "#",
    enroll: "#",
  },
  ccna: {
    learnMore: "https://ccnatrainer.inefor.ao/",
    enroll: "https://ccnatrainer.inefor.ao/",
  },
  cgpe: {
    learnMore: "https://cgpe-online.inefor.ao/",
    enroll: "https://cgpe-online.inefor.ao/",
  },
  noc: {
    learnMore: "https://noc.inefor.ao/",
    enroll: "https://noc.inefor.ao/",
  },
  helpdesk: {
    learnMore: "https://help-desk.inefor.ao/",
    enroll: "https://help-desk.inefor.ao/",
  },
};

// Fallback image
const fallbackImage = "/all/11.jpg";

// Mapear categoria baseada no ID
const getTrainingCategory = (id: string): Category => {
  const categoryMap: Record<string, Category> = {
    estagio: "tech",
    ccna: "certification",
    cgpe: "management",
    noc: "tech",
    helpdesk: "tech",
  };
  return categoryMap[id] || "all";
};

// Mapear modalidade baseada no ID
const getTrainingModality = (id: string): Modality => {
  const modalityMap: Record<string, Modality> = {
    estagio: "presencial",
    ccna: "online",
    cgpe: "hybrid",
    noc: "presencial",
    helpdesk: "online",
  };
  return modalityMap[id] || "all";
};

// Mapear preço baseado no treinamento
const getTrainingPrice = (id: string): string | undefined => {
  const priceMap: Record<string, string> = {
    estagio: "Sob consulta",
    ccna: "450.000 Kz",
    cgpe: "350.000 Kz",
    noc: "380.000 Kz",
    helpdesk: "250.000 Kz",
  };
  return priceMap[id];
};

// Mapear horário/schedule
const getTrainingSchedule = (id: string): string => {
  const scheduleMap: Record<string, string> = {
    estagio: "Flexível",
    ccna: "Sábados 9h-17h",
    cgpe: "Quintas 18h-22h",
    noc: "Terças e Quintas 19h-22h",
    helpdesk: "Segundas e Quartas 18h-21h",
  };
  return scheduleMap[id] || "Consultar";
};

// Mapear badge (destaque)
const getTrainingBadge = (id: string): string | undefined => {
  const badgeMap: Record<string, string> = {
    ccna: "Destaque",
    noc: "Destaque",
  };
  return badgeMap[id];
};

export default function TreinamentosPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedModality, setSelectedModality] = useState<Modality>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = trainings.filter((training) => {
    const category = getTrainingCategory(training.id);
    const modality = getTrainingModality(training.id);
    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;
    const matchesModality =
      selectedModality === "all" || modality === selectedModality;
    const matchesSearch =
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesModality && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedModality("all");
    setSearchTerm("");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedModality !== "all" ||
    searchTerm !== "";

  // Componente de card customizado para treinamentos com links externos
  const TrainingCard = ({ training }: { training: (typeof trainings)[0] }) => {
    const links = trainingLinks[training.id];
    const modality = getTrainingModality(training.id);
    const modalityLabel = {
      all: "Consultar",
      presencial: "Presencial",
      online: "Online",
      hybrid: "Híbrido",
    }[modality];

    // Usa a imagem do training, com fallback
    const imageUrl = training.image || fallbackImage;

    return (
      <div className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer transition-all duration-500 hover:shadow-xl">
        {/* Link para Saber Mais - cobre todo o card */}
        <a
          href={links.learnMore}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
        />

        {/* Imagem - usando o campo image do training */}
        <img
          src={imageUrl}
          alt={training.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackImage;
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Acronym badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {training.acronym}
          </span>
        </div>

        {/* Modalidade badge */}
        <div className="absolute top-4 left-24 z-20">
          <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-[10px] font-medium px-2 py-1 rounded-full">
            {modalityLabel}
          </span>
        </div>

        {/* Certifier badge */}
        {training.certifier && (
          <div className="absolute top-4 left-44 z-20">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-[10px] font-medium px-2 py-1 rounded-full">
              Cert. {training.certifier}
            </span>
          </div>
        )}

        {/* Ícone "Saber mais" top right */}
        <div className="absolute top-4 right-4 z-20 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-0">
          <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>

        {/* Botão "Inscrever" bottom right - link externo */}
        <div className="absolute bottom-4 right-4 z-30 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4">
          <a
            href={links.enroll}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Inscrever
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Content bottom */}
        <div className="absolute left-0 right-0 bottom-0 p-5 z-20">
          <p className="text-white/60 text-[11px] uppercase tracking-widest mb-1">
            {training.duration}
          </p>

          <h3 className="text-white font-medium text-lg leading-snug mb-1 group-hover:text-primary transition-colors">
            {training.title}
          </h3>

          {/* Descrição - aparece no hover */}
          <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-2">
            <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
              {training.description}
            </p>
          </div>

          {/* Detalhes - aparecem no hover */}
          <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-10 group-hover:mt-2">
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {getTrainingSchedule(training.id)}
              </span>
              {getTrainingPrice(training.id) && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="text-primary-300 font-medium">
                    {getTrainingPrice(training.id)}
                  </span>
                </>
              )}
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
        badge="Programas Avançados"
        title="Treinamentos"
        titleHighlight="Especializados"
        description="Programas de formação intensiva com certificação, desenhados para profissionais que pretendem diferenciar-se no mercado."
        variant="centered"
        showScrollIndicator={false}
        backgroundImage="/all/02.jpg"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Treinamentos</span>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-xl p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Pesquisar treinamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-1 bg-muted border border-border rounded-lg p-1">
                {[
                  { value: "all", label: "Todos" },
                  { value: "tech", label: "Tecnológicos" },
                  { value: "management", label: "Gestão" },
                  { value: "certification", label: "Certificações" },
                ].map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value as Category)}
                    className={cn(
                      "px-3 py-1 text-xs rounded-md transition-all",
                      selectedCategory === cat.value
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Modality Filter */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-1 bg-muted border border-border rounded-lg p-1">
                {[
                  { value: "all", label: "Todas" },
                  { value: "presencial", label: "Presencial" },
                  { value: "online", label: "Online" },
                  { value: "hybrid", label: "Híbrido" },
                ].map((mod) => (
                  <button
                    key={mod.value}
                    onClick={() => setSelectedModality(mod.value as Modality)}
                    className={cn(
                      "px-3 py-1 text-xs rounded-md transition-all",
                      selectedModality === mod.value
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {mod.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3 h-3" />
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-muted-foreground">
            {filtered.length} treinamento{filtered.length !== 1 ? "s" : ""}{" "}
            encontrado{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Trainings Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              Nenhum treinamento encontrado com os filtros selecionados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((training) => (
              <TrainingCard key={training.id} training={training} />
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-primary/5 border border-primary/20 rounded-xl">
          <div>
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Horários Disponíveis
            </h3>
            <p className="text-sm text-muted-foreground">
              Segunda a Sexta: 8h-11h, 11h-13h30, 13h30-16h30, 17h-19h30
              <br />
              Sábado: 8h-13h, 13h-18h
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Banknote className="w-4 h-4 text-primary" />
              Dados Bancários
            </h3>
            <p className="text-sm text-muted-foreground">
              Conta BAI: 9848701410001
              <br />
              IBAN: 0040.0000.9848.7014.1014.9
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTABanner
        badge="Dúvidas?"
        title="Fale com um"
        titleHighlight="consultor"
        description="Tem dúvidas sobre qual treinamento escolher? Nossa equipa está disponível para ajudar."
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
    </div>
  );
}
