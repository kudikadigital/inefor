 "use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  HelpCircle, MessageCircle, Mail, Phone, FileText, 
  BookOpen, Video, Download, ChevronRight, Search, 
  ArrowRight, CheckCircle, Clock, Users, Shield,
  ChevronDown, ChevronUp, ExternalLink, LifeBuoy,
  Globe, Smartphone, Monitor, Printer, Wifi, Lock,
  AlertCircle, ThumbsUp, Star, Zap,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hero } from "@/components/sections/Hero";
import { CTABanner } from "@/components/sections/CTABanner";
import { EnrollmentModal } from "@/components/modals/EnrollmentModal";
import { cn } from "@/lib/utils";

// Categorias de suporte
const supportCategories = [
  {
    icon: BookOpen,
    title: "Dúvidas sobre Cursos",
    description: "Informações sobre cursos, certificações e matérias",
    color: "bg-blue-500",
    href: "#cursos",
  },
  {
    icon: FileText,
    title: "Inscrições e Matrículas",
    description: "Processo de inscrição, documentos e prazos",
    color: "bg-green-500",
    href: "#inscricoes",
  },
  {
    icon: Download,
    title: "Materiais e Certificados",
    description: "Download de materiais e emissão de certificados",
    color: "bg-purple-500",
    href: "#materiais",
  },
  {
    icon: Video,
    title: "Aulas Online",
    description: "Acesso à plataforma EAD e suporte técnico",
    color: "bg-orange-500",
    href: "#aulas",
  },
  {
    icon: CreditCard,
    title: "Pagamentos",
    description: "Formas de pagamento, recibos e comprovantes",
    color: "bg-teal-500",
    href: "#pagamentos",
  },
  {
    icon: LifeBuoy,
    title: "Suporte Técnico",
    description: "Problemas com acesso e funcionalidades",
    color: "bg-red-500",
    href: "#tecnico",
  },
];

// FAQs
const faqs = [
  {
    question: "Como faço para me inscrever num curso?",
    answer: "Para se inscrever num curso, aceda à página do curso desejado, clique em 'Inscrever' e preencha o formulário de inscrição. Após o preenchimento, receberá um email com as instruções de pagamento e confirmação da matrícula.",
    category: "inscricoes",
  },
  {
    question: "Quais são as formas de pagamento aceites?",
    answer: "Aceitamos transferência bancária, depósito em conta BAI, MB WAY e pagamento presencial na nossa sede. Os dados bancários são: BAI 9848701410001 | IBAN: 0040.0000.9848.7014.1014.9",
    category: "pagamentos",
  },
  {
    question: "Os cursos têm certificado?",
    answer: "Sim, todos os cursos do Inefor são certificados. Ao concluir a formação com aproveitamento, receberá um certificado de conclusão reconhecido pelo mercado.",
    category: "cursos",
  },
  {
    question: "Como aceder à plataforma EAD?",
    answer: "Após a confirmação da matrícula, receberá um email com as credenciais de acesso à nossa plataforma de ensino online. Pode aceder através do link: https://ead.inefor.ao",
    category: "aulas",
  },
  {
    question: "Posso fazer o curso online?",
    answer: "Sim, oferecemos cursos nas modalidades presencial, online e híbrida. Na página do curso, pode verificar a disponibilidade da modalidade desejada.",
    category: "cursos",
  },
  {
    question: "Como obter o meu certificado?",
    answer: "Após a conclusão do curso, o certificado é disponibilizado na plataforma EAD para download. Também pode solicitar a versão física na nossa secretaria.",
    category: "materiais",
  },
  {
    question: "Qual o horário de atendimento?",
    answer: "Nosso atendimento é de Segunda a Sexta, das 8h às 19h30, e aos Sábados das 8h às 18h. Pode contactar-nos por telefone, WhatsApp ou presencialmente.",
    category: "geral",
  },
  {
    question: "Como funciona o suporte técnico?",
    answer: "Para suporte técnico com a plataforma EAD, envie um email para suporte@inefor.ao ou ligue para +244 944 683 483. O atendimento é de Segunda a Sexta, 8h-18h.",
    category: "tecnico",
  },
];

// Artigos de ajuda
const helpArticles = [
  {
    title: "Guia de Inscrição passo a passo",
    description: "Aprenda como se inscrever nos nossos cursos de forma rápida e fácil.",
    icon: BookOpen,
    readTime: "3 min",
    href: "#",
  },
  {
    title: "Como aceder à plataforma EAD",
    description: "Tutorial completo para aceder e navegar na nossa plataforma de ensino.",
    icon: Video,
    readTime: "5 min",
    href: "#",
  },
  {
    title: "Guia de Pagamentos e Comprovantes",
    description: "Saiba como realizar o pagamento e enviar o comprovante corretamente.",
    icon: CreditCard,
    readTime: "4 min",
    href: "#",
  },
  {
    title: "Dúvidas Frequentes sobre Certificados",
    description: "Tudo que precisa saber sobre a emissão e autenticação de certificados.",
    icon: FileText,
    readTime: "3 min",
    href: "#",
  },
];

// Canais de atendimento
const supportChannels = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Atendimento rápido e direto",
    contact: "+244 944 683 483",
    action: "Enviar mensagem",
    href: "https://wa.me/244944683483",
    color: "bg-green-500",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Resposta em até 24h úteis",
    contact: "suporte@inefor.ao",
    action: "Enviar email",
    href: "mailto:suporte@inefor.ao",
    color: "bg-blue-500",
  },
  {
    icon: Phone,
    title: "Telefone",
    description: "Atendimento presencial",
    contact: "+244 944 683 483",
    action: "Ligar agora",
    href: "tel:+244944683483",
    color: "bg-purple-500",
  },
  {
    icon: Users,
    title: "Atendimento Presencial",
    description: "Segunda a Sexta, 8h-17h",
    contact: "Av. Deolinda Rodrigues, 329",
    action: "Ver localização",
    href: "https://maps.google.com/?q=Av.+Deolinda+Rodrigues+329+Luanda",
    color: "bg-orange-500",
  },
];

export default function SuportePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleOpenTicket = () => {
    setSelectedCourse("Abrir Ticket");
    setIsModalOpen(true);
  };

  const faqCategories = [
    { value: "all", label: "Todas" },
    { value: "cursos", label: "Cursos" },
    { value: "inscricoes", label: "Inscrições" },
    { value: "pagamentos", label: "Pagamentos" },
    { value: "materiais", label: "Materiais" },
    { value: "aulas", label: "Aulas Online" },
    { value: "tecnico", label: "Suporte Técnico" },
    { value: "geral", label: "Geral" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      
      {/* Hero Section */}
      <Hero
        badge="Suporte"
        title="Como podemos"
        titleHighlight="ajudar?"
        description="Encontre respostas para suas dúvidas ou entre em contacto com nossa equipa de suporte."
        variant="centered"
        showScrollIndicator={false}
        backgroundImage="/all/02.jpg"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Suporte</span>
        </div>

        {/* Categorias de Suporte */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-foreground mb-2 text-center">
            O que precisa de <span className="text-primary">ajuda</span>?
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Escolha uma categoria para encontrar a informação que precisa
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <a
                  key={idx}
                  href={cat.href}
                  className="group bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", cat.color, "bg-opacity-10")}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver mais <ChevronRight className="w-4 h-4" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <Badge variant="glass" className="mb-4">Dúvidas Frequentes</Badge>
            <h2 className="text-3xl font-light text-foreground mb-4">
              Perguntas <span className="text-primary">Frequentes</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Encontre respostas para as dúvidas mais comuns dos nossos alunos
            </p>
          </div>

          {/* Search e Filtro */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Pesquisar perguntas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-1.5 min-w-max">
                {faqCategories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={cn(
                      "px-3 py-1.5 text-xs rounded-md transition-all whitespace-nowrap",
                      selectedCategory === cat.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Nenhuma pergunta encontrada com os filtros selecionados.</p>
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-xl overflow-hidden bg-card"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                  >
                    <span className="font-medium text-foreground">{faq.question}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 pt-0 border-t border-border">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Artigos de Ajuda */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4">Artigos e Tutoriais</Badge>
            <h2 className="text-3xl font-light text-foreground mb-4">
              Guias <span className="text-primary">Práticos</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tutoriais e guias passo a passo para te ajudar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {helpArticles.map((article, idx) => {
              const Icon = article.icon;
              return (
                <a
                  key={idx}
                  href={article.href}
                  className="group bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{article.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime} de leitura
                    </span>
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Ler mais
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Canais de Atendimento */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <Badge variant="glass" className="mb-4">Canais de Atendimento</Badge>
            <h2 className="text-3xl font-light text-foreground mb-4">
              Fale <span className="text-primary">Conosco</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Escolha o canal mais conveniente para entrar em contacto
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportChannels.map((channel, idx) => {
              const Icon = channel.icon;
              return (
                <a
                  key={idx}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group bg-card border border-border rounded-xl p-5 text-center hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4", channel.color, "bg-opacity-10")}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{channel.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{channel.description}</p>
                  <p className="text-sm font-mono text-primary mb-3">{channel.contact}</p>
                  <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    {channel.action} →
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Abrir Ticket */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-border p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <div className="relative z-10">
            <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">
              Não encontrou o que <span className="text-primary">procurava</span>?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Abra um ticket e nossa equipa de suporte entrará em contacto consigo o mais breve possível.
            </p>
            <Button onClick={handleOpenTicket} size="lg" className="gap-2">
              Abrir Ticket
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTABanner
        badge="Atendimento Prioritário"
        title="Precisa de ajuda"
        titleHighlight="urgente?"
        description="Ligue diretamente para nossa equipa de suporte ou envie uma mensagem no WhatsApp."
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
            label: "Ligar Agora",
            href: "tel:+244944683483",
            icon: <Phone className="w-4 h-4" />,
            variant: "outline",
          },
        ]}
      />

      {/* Modal para abrir ticket */}
      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCourse("");
        }}
        courseTitle="Abrir Ticket de Suporte"
        courseId="support-ticket"
        coursePrice="Gratuito"
      />

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}