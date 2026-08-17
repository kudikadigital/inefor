"use client";

import { useState } from "react";
import {
  Calendar,
  Award,
  TrendingUp,
  Users,
  BookOpen,
  Globe,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AboutStrip } from "@/components/sections/AboutStrip";
import { StatsBar } from "@/components/sections/StatsBar";
import { SuccessStory } from "@/components/sections/SuccessStory";
import { Instructors } from "@/components/sections/Instructors";
import { Partners } from "@/components/sections/Partners";
import { aboutStats, successStory, instructors, partners } from "@/data";
import { CTABanner } from "@/components/sections/CTABanner";
import { AboutHero, Hero } from "@/components/sections/Hero";

const values = [
  "Temor a Deus",
  "Foco no Cliente",
  "Excelência",
  "Inovação",
  "Respeito ao Ser Humano",
  "Qualidade",
  "Melhoria Contínua",
  "Honestidade",
  "Profissionalismo",
  "Ética",
];

const timeline = [
  {
    year: "2014",
    label: "Idealização",
    desc: "O conceito do Inefor é desenvolvido pelos seus fundadores.",
    icon: Calendar,
  },
  {
    year: "2018",
    label: "Fundação",
    desc: "O Inefor é oficialmente fundado em Luanda, Angola.",
    icon: Award,
  },
  {
    year: "2019",
    label: "Expansão",
    desc: "Lançamento dos primeiros programas de certificação Cisco.",
    icon: TrendingUp,
  },
  {
    year: "2022",
    label: "Consolidação",
    desc: "Mais de 500 profissionais formados. Novos cursos administrativos.",
    icon: Users,
  },
  {
    year: "2025",
    label: "Plataforma Web",
    desc: "Lançamento da nova plataforma digital com EAD e loja em breve.",
    icon: Globe,
  },
];

function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 bg-card rounded-2xl p-8 max-w-md w-full mx-4 border border-border shadow-xl">
        <h3 className="text-2xl font-light text-foreground mb-4">
          Fale Conosco
        </h3>
        <p className="text-muted-foreground mb-6">
          Entre em contato para saber mais sobre nossos cursos e oportunidades
          de formação.
        </p>
        <div className="flex gap-3">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Fechar
          </Button>
          <Link href="/contacto" className="flex-1">
            <Button className="w-full">Ir para Contato</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SobrePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      
      {/* Hero Section - Usando o componente reutilizável */}
      <AboutHero />

      {/* Stats Bar */}
      <StatsBar stats={aboutStats} variant="default" background="card" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-24">
        {/* AboutStrip */}
        <AboutStrip
          variant="full"
          badgeText="Nossa Trajetória"
          title="A nossa"
          subtitle="história"
          description="Idealizado em 2014 e fundado em 2018, o INEFOR é um centro de excelência que busca soluções através da formação contínua e investigação científica nas áreas de Engenharia, Gestão e Negócios."
          secondaryText="A instituição visa o binómio Academia–Indústria como forma de proporcionar o desenvolvimento social. Tem-se consolidado no mercado angolano e busca protagonismo no mercado internacional."
          buttons={[
            {
              label: "Fazer parte",
              href: "/cursos",
              variant: "default",
              icon: <ArrowRight className="w-4 h-4" />,
            },
            {
              label: "Falar conosco",
              onClick: () => setIsModalOpen(true),
              variant: "outline",
              icon: <MessageCircle className="w-4 h-4" />,
            },
          ]}
        />

        {/* Valores Grid */}
        <div>
          <div className="text-center mb-12">
            <Badge variant="glass" className="mb-4">
              Nosso Propósito
            </Badge>
            <h2 className="text-3xl font-light text-foreground mb-4">
              Valores que nos <span className="text-primary">guiam</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nossos valores são a base de tudo o que fazemos. Eles moldam nossa
              cultura, orientam nossas decisões e nos impulsionam a buscar a
              excelência.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {values.map((v) => (
              <span
                key={v}
                className="px-4 py-2 text-sm text-foreground bg-card border border-border rounded-full hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Jornada
            </Badge>
            <h2 className="text-3xl font-light text-foreground mb-4">
              Linha do <span className="text-primary">tempo</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conheça os marcos da nossa trajetória até aqui.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20" />

            <div className="space-y-12">
              {timeline.map((item, idx) => {
                const Icon = item.icon;
                const isLeft = idx % 2 === 0;

                return (
                  <div
                    key={item.year}
                    className={`relative flex ${isLeft ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-12" : "md:pl-12"}`}
                    >
                      <div className="relative group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                        <div className="absolute -top-3 left-6">
                          <Badge variant="glass" className="text-xs font-mono">
                            {item.year}
                          </Badge>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-foreground font-medium text-lg mb-2">
                              {item.label}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-card z-10" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Success Story Section - Full width */}
      <SuccessStory
        title={successStory.title}
        content={successStory.content}
        author={successStory.author}
        videoUrl={successStory.videoUrl}
        imageUrl={successStory.imageUrl}
      />

      {/* Instructors Section */}
      <Instructors
        title="Formadores"
        subtitle="Conheça os profissionais que fazem a diferença"
        instructors={instructors}
      />

      {/* Partners Section */}
      <Partners
        title="Parceiros"
        subtitle="Empresas que confiam no nosso trabalho"
        partners={partners}
      />

<CTABanner
  badge="Próximo passo"
  title="Faça parte da nossa"
  titleHighlight="história"
  description="Junte-se a centenas de profissionais que já transformaram suas carreiras com o Inefor."
  variant="centered"
  background="gradient"
  actions={[
    {
      label: "Conhecer cursos",
      href: "/cursos",
      icon: <ArrowRight className="w-4 h-4" />,
      variant: "default",
    },
    {
      label: "Fale conosco",
      href: "/contacto",
      icon: <MessageCircle className="w-4 h-4" />,
      variant: "outline",
    },
  ]}
/>

      {/* Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
