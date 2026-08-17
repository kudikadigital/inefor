"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle, Clock, Banknote, Map, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/sections/Hero";
import { CTABanner } from "@/components/sections/CTABanner";
import Link from "next/link";

function ContactForm() {
  const searchParams = useSearchParams();
  const cursoParam = searchParams.get("curso") || "";
  const eventoParam = searchParams.get("evento") || "";
  const treinamentoParam = searchParams.get("treinamento") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: cursoParam ? `Inscrição: ${cursoParam}` : eventoParam ? `Evento: ${eventoParam}` : treinamentoParam ? `Treinamento: ${treinamentoParam}` : "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio (aqui você integraria com API real)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mb-5">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-foreground font-medium text-xl mb-2">Mensagem enviada!</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          A nossa equipa entrará em contacto em breve.
        </p>
        <div className="flex gap-3 mt-6">
          <a href="https://wa.me/244944683483" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </a>
          <Button onClick={() => setSent(false)} className="gap-2">
            Nova mensagem
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Nome completo <span className="text-destructive">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            placeholder="O seu nome"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            placeholder="email@exemplo.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Telefone / WhatsApp
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            placeholder="+244 9xx xxx xxx"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Assunto
          </label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            placeholder="Ex: Inscrição no CCNA"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Mensagem <span className="text-destructive">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          required
          className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
          placeholder="Como podemos ajudar?"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full gap-2 h-11"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Enviar mensagem
          </>
        )}
      </Button>
    </form>
  );
}

// Componente do Mapa (usando iframe do Google Maps)
function ContactMap() {
  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-md">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.456812447813!2d13.239222!3d-8.83999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f2c9c8d8e8d9%3A0x7c8b9c8f9e8d7c6b!2sAv.%20Deolinda%20Rodrigues%2C%20Luanda%2C%20Angola!5e0!3m2!1spt!2s!4v1700000000000!5m2!1spt!2s"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Localização do Inefor"
        className="grayscale hover:grayscale-0 transition-all duration-500"
      />
    </div>
  );
}

export default function ContactoPage() {
  const contactInfo = [
    {
      icon: MapPin,
      label: "Nossa Sede",
      value: "Av. Deolinda Rodrigues Nº 329, 1º Andar\nJunto ao Banco BIC — Luanda",
      link: "https://maps.google.com/?q=Av.+Deolinda+Rodrigues+329+Luanda",
    },
    {
      icon: Phone,
      label: "Telefone",
      value: "+244 944 683 483\n+244 990 683 483",
      link: "tel:+244944683483",
    },
    {
      icon: Mail,
      label: "Email",
      value: "geral@inefor.ao",
      link: "mailto:geral@inefor.ao",
    },
    {
      icon: Clock,
      label: "Horário de Atendimento",
      value: "Segunda a Sexta: 8h às 19h30\nSábado: 8h às 18h",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      
      {/* Hero Section */}
      <Hero
        badge="Fale Connosco"
        title="Entre em"
        titleHighlight="Contacto"
        description="Inscreva-se num curso, tire dúvidas ou solicite informações. Nossa equipa está pronta para ajudar."
        variant="centered"
        showScrollIndicator={false}
        backgroundImage="/all/03.jpg"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Contacto</span>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-medium text-foreground mb-5 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Informações de Contacto
              </h2>
              <div className="space-y-5">
                {contactInfo.map(({ icon: Icon, label, value, link }) => (
                  <div key={label} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{label}</p>
                      {link ? (
                        <a
                          href={link}
                          target={label === "Endereço" ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-foreground text-sm whitespace-pre-line hover:text-primary transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-foreground text-sm whitespace-pre-line">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="border-t border-border pt-6">
              <p className="text-sm text-muted-foreground mb-3">Atendimento rápido via:</p>
              <a href="https://wa.me/244944683483" target="_blank" rel="noopener noreferrer">
                <Button variant="default" className="w-full gap-2 bg-green-600 hover:bg-green-700">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </a>
            </div>

            {/* Bank Info */}
            <div className="border-t border-border pt-6">
              <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Banknote className="w-4 h-4 text-primary" />
                Dados Bancários
              </p>
              <p className="text-muted-foreground text-xs font-mono">Conta BAI: 9848701410001</p>
              <p className="text-muted-foreground text-xs font-mono">IBAN: 0040.0000.9848.7014.1014.9</p>
            </div>
          </div>

          {/* Right Column - Form and Map */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form */}
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-medium text-foreground mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 text-primary" />
                Enviar mensagem
              </h2>
              <Suspense fallback={
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              }>
                <ContactForm />
              </Suspense>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-xl font-medium text-foreground mb-4 flex items-center gap-2">
                <Map className="w-5 h-5 text-primary" />
                Localização
              </h2>
              <ContactMap />
              <div className="mt-3 flex justify-end">
                <a
                  href="https://maps.google.com/?q=Av.+Deolinda+Rodrigues+329+Luanda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3" />
                  Abrir no Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-5 text-center hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-1">Atendimento Telefónico</h3>
            <p className="text-sm text-muted-foreground">+244 944 683 483</p>
            <p className="text-xs text-muted-foreground">Segunda a Sexta, 8h-19h30</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 text-center hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-1">Email</h3>
            <p className="text-sm text-muted-foreground">geral@inefor.ao</p>
            <p className="text-xs text-muted-foreground">Resposta em até 24h úteis</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 text-center hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-1">Atendimento Presencial</h3>
            <p className="text-sm text-muted-foreground">Av. Deolinda Rodrigues, 329</p>
            <p className="text-xs text-muted-foreground">Segunda a Sábado, 8h-18h</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTABanner
        badge="Pronto para começar?"
        title="Ainda tem dúvidas?"
        titleHighlight="Fale connosco"
        description="Nossa equipa está disponível para esclarecer todas as suas perguntas e ajudar na sua jornada de formação."
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
            label: "Voltar ao topo",
            href: "#",
            onClick: () => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            },
            icon: <Navigation className="w-4 h-4" />,
            variant: "outline",
          },
        ]}
      />
    </div>
  );
}