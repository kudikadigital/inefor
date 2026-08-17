import React from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, MessageCircle, Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hero } from "@/components/sections/Hero";
import { CTABanner } from "@/components/sections/CTABanner";
import { cn } from "@/lib/utils";
import { services } from "@/data";

const differentiators = [
  { title: "Experiência Comprovada", desc: "Mais de 10 anos de atuação no mercado angolano" },
  { title: "Equipa Especializada", desc: "Profissionais certificados e experientes" },
  { title: "Qualidade Garantida", desc: "Metodologias reconhecidas internacionalmente" },
  { title: "Soluções Personalizadas", desc: "Atendimento às necessidades específicas" },
];

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">

      {/* Hero Section */}
      <Hero
        badge="Soluções Empresariais"
        title="Nossos"
        titleHighlight="Serviços"
        description="Para além da formação individual, o Inefor oferece soluções completas para empresas e instituições."
        variant="centered"
        showScrollIndicator={false}
        backgroundImage="/all/04.jpg"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Serviços</span>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/servicos/${service.id}`}
              className="group relative flex flex-col min-h-[360px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 transition-all duration-500 hover:shadow-2xl hover:shadow-black/30"
            >
              {/* Top accent bar — unique per service */}
              <div className={cn("absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r", service.bar)} />

              {/* Ambient glow — unique per service */}
              <div className={cn(
                "absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40 pointer-events-none",
                service.glow
              )} />

              <div className="relative z-10 flex flex-col flex-1 p-8">
                {/* Number + expand affordance */}
                <div className="flex items-start justify-between mb-8">
                  <span className="text-6xl font-extralight text-white/10 leading-none select-none tabular-nums">
                    {service.number}
                  </span>
                  <div className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-white">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-medium text-white mb-3 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                  {service.desc}
                </p>

                {/* Features — reveal on hover */}
                <ul className={cn(
                  "mt-4 space-y-1.5 overflow-hidden max-h-0 opacity-0 transition-all duration-300",
                  "group-hover:max-h-32 group-hover:opacity-100"
                )}>
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-white/50">
                      <span className={cn("w-1 h-1 rounded-full shrink-0", service.dot)} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <span className="text-[11px] text-white/40 uppercase tracking-wider">
                    {service.price}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/5 px-3 py-1.5 text-sm font-medium text-white opacity-0 translate-y-2 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-white/10 group-hover:border-white/50">
                    Saber mais
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <Badge variant="glass" className="mb-4">Diferenciais</Badge>
            <h2 className="text-3xl font-light text-foreground mb-4">
              Por que escolher os <span className="text-primary">serviços do Inefor</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferecemos soluções personalizadas com qualidade e excelência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((item, idx) => (
              <div
                key={item.title}
                className="text-center p-6 bg-card border border-border rounded-xl hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <span className="block text-3xl font-extralight text-primary/25 mb-3 tabular-nums">
                  0{idx + 1}
                </span>
                <h3 className="font-medium text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4">Como Funciona</Badge>
            <h2 className="text-3xl font-light text-foreground mb-4">
              Nosso <span className="text-primary">Processo</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Metodologia comprovada para garantir os melhores resultados
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 hidden md:block" />

            <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Diagnóstico", desc: "Análise detalhada das necessidades" },
                { step: "02", title: "Proposta", desc: "Plano de ação personalizado" },
                { step: "03", title: "Execução", desc: "Implementação com qualidade" },
                { step: "04", title: "Acompanhamento", desc: "Suporte e avaliação contínua" },
              ].map((item) => (
                <div key={item.step} className="relative text-center p-6 bg-card border border-border rounded-xl">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-medium text-foreground mt-4 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-border p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">
              Precisa de uma <span className="text-primary">solução personalizada</span>?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Entre em contacto connosco e a nossa equipa desenvolverá uma proposta à medida da sua empresa.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contacto">
                <Button size="lg" className="gap-2 group">
                  Solicitar proposta
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href="https://wa.me/244944683483" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Falar no WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTABanner
        badge="Dúvidas?"
        title="Fale com um"
        titleHighlight="especialista"
        description="Nossos consultores estão prontos para entender suas necessidades e oferecer a melhor solução."
        variant="centered"
        background="gradient"
        actions={[
          {
            label: "WhatsApp",
            href: "https://wa.me/244944683483",
            icon: <MessageCircle className="w-4 h-4" />,
            variant: "default",
            external: true,
          },
          {
            label: "Email",
            href: "mailto:geral@inefor.ao",
            icon: <Mail className="w-4 h-4" />,
            variant: "outline",
          },
        ]}
      />
    </div>
  );
}
