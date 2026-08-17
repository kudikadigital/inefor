"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, Users, BookOpen, Wrench, Network, BarChart3, 
  ArrowRight, Shield, Trophy, Sparkles, CheckCircle, 
  Phone, Mail, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hero } from "@/components/sections/Hero";
import { CTABanner } from "@/components/sections/CTABanner";
import { EnrollmentModal } from "@/components/modals/EnrollmentModal";
import { cn } from "@/lib/utils";

const services = [
  { 
    icon: BookOpen, 
    title: "Formação Empresarial", 
    desc: "Programas in-company desenhados à medida das necessidades da sua empresa, ministrados nas instalações do cliente ou do Inefor.",
    color: "blue",
    features: ["Conteúdo personalizado", "Horários flexíveis", "Certificação reconhecida"],
    price: "Sob consulta"
  },
  { 
    icon: Users, 
    title: "Consultoria em RH", 
    desc: "Assessoria em gestão de recursos humanos, avaliação de desempenho, recrutamento e desenvolvimento de equipas.",
    color: "green",
    features: ["Recrutamento e seleção", "Avaliação de desempenho", "Desenvolvimento de lideranças"],
    price: "Sob consulta"
  },
  { 
    icon: Network, 
    title: "Implementação de Redes", 
    desc: "Projectos de infra-estrutura de rede, cabeamento estruturado, fibra óptica e configuração de equipamentos Cisco.",
    color: "purple",
    features: ["Cabeamento estruturado", "Fibra óptica", "Configuração Cisco"],
    price: "Sob consulta"
  },
  { 
    icon: Wrench, 
    title: "Suporte Técnico", 
    desc: "Serviços de help-desk, manutenção de sistemas, suporte a infra-estruturas de TI para empresas.",
    color: "orange",
    features: ["Help-desk 24/7", "Manutenção preventiva", "Suporte remoto"],
    price: "Sob consulta"
  },
  { 
    icon: Building2, 
    title: "Parcerias Institucionais", 
    desc: "Acordos de cooperação com empresas e instituições para formação contínua dos colaboradores.",
    color: "indigo",
    features: ["Programas de capacitação", "Descontos exclusivos", "Certificações conjuntas"],
    price: "Sob consulta"
  },
  { 
    icon: BarChart3, 
    title: "Consultoria de Gestão", 
    desc: "Assessoria empresarial em optimização de processos, planeamento estratégico e produtividade organizacional.",
    color: "red",
    features: ["Planeamento estratégico", "Optimização de processos", "Gestão de projetos"],
    price: "Sob consulta"
  },
];

const serviceColors: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  green: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  red: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

export default function ServicosPage() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestQuote = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const colorClass = serviceColors[service.color];
            
            return (
              <div
                key={service.title}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Icon */}
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110",
                  colorClass
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.desc}
                </p>
                
                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Price and Button */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">{service.price}</span>
                  <Button
                    size="sm"
                    onClick={() => handleRequestQuote(service)}
                    className="gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    Solicitar
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            );
          })}
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
            {[
              { icon: Trophy, title: "Experiência Comprovada", desc: "Mais de 10 anos de atuação no mercado angolano" },
              { icon: Users, title: "Equipa Especializada", desc: "Profissionais certificados e experientes" },
              { icon: Shield, title: "Qualidade Garantida", desc: "Metodologias reconhecidas internacionalmente" },
              { icon: Sparkles, title: "Soluções Personalizadas", desc: "Atendimento às necessidades específicas" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="text-center p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
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
              ].map((item, idx) => (
                <div key={idx} className="relative text-center p-6 bg-card border border-border rounded-xl">
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

      {/* Modal de Solicitação */}
      {selectedService && (
        <EnrollmentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedService(null);
          }}
          courseTitle={`Serviço: ${selectedService.title}`}
          courseId="service"
          coursePrice={selectedService.price}
        />
      )}
    </div>
  );
}