"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Mail, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CTAAction {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: "default" | "outline" | "glass" | "secondary";
  external?: boolean;
}

interface CTABannerProps {
  /** Badge text (optional) */
  badge?: string;
  /** Main title */
  title?: string;
  /** Highlighted text in title */
  titleHighlight?: string;
  /** Description text */
  description?: string;
  /** Array of CTA actions/buttons */
  actions?: CTAAction[];
  /** Visual variant */
  variant?: "default" | "centered" | "compact" | "gradient";
  /** Background style */
  background?: "surface" | "card" | "gradient" | "transparent";
  /** Show decorative elements */
  showDecoration?: boolean;
  /** Additional className */
  className?: string;
}

// Valores padrão para as props
const defaultTitle = "Pronto para começar";
const defaultTitleHighlight = "a sua formação?";
const defaultDescription = "Fale connosco pelo WhatsApp, venha à nossa sede ou preencha o formulário. A equipa do Inefor está disponível para orientar a sua escolha.";
const defaultActions: CTAAction[] = [
  {
    label: "WhatsApp",
    href: "https://wa.me/244944683483",
    icon: <MessageCircle className="w-4 h-4" />,
    variant: "outline",
    external: true,
  },
  {
    label: "Inscrever agora",
    href: "/contacto",
    icon: <ArrowRight className="w-4 h-4" />,
    variant: "default",
  },
];

export function CTABanner({
  badge = "Próximo passo",
  title = defaultTitle,
  titleHighlight = defaultTitleHighlight,
  description = defaultDescription,
  actions = defaultActions,
  variant = "default",
  background = "surface",
  showDecoration = true,
  className,
}: CTABannerProps) {
  
  const renderButton = (action: CTAAction, idx: number) => {
    const buttonClass = cn(
      "gap-2 h-12",
      action.variant === "glass" && "border-white/30 text-white bg-white/5 hover:bg-white/10 backdrop-blur-md"
    );

    const content = (
      <>
        {action.icon}
        {action.label}
      </>
    );

    if (action.onClick) {
      return (
        <Button
          key={idx}
          variant={action.variant === "glass" ? "default" : action.variant}
          onClick={action.onClick}
          className={buttonClass}
        >
          {content}
        </Button>
      );
    }

    if (action.href && action.external) {
      return (
        <a
          key={idx}
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant={action.variant === "glass" ? "default" : action.variant} className={buttonClass}>
            {content}
          </Button>
        </a>
      );
    }

    if (action.href) {
      return (
        <Link key={idx} href={action.href}>
          <Button variant={action.variant === "glass" ? "default" : action.variant} className={buttonClass}>
            {content}
          </Button>
        </Link>
      );
    }

    return null;
  };

  const bgStyles = {
    surface: "bg-muted/30 border-y border-border",
    card: "bg-card border border-border",
    gradient: "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-border",
    transparent: "bg-transparent",
  };

  const isCentered = variant === "centered";
  const isCompact = variant === "compact";
  const isGradient = variant === "gradient";

  return (
    <section className={cn("py-16 md:py-20", bgStyles[background], className)}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={cn(
            "relative overflow-hidden",
            !isCompact && "rounded-2xl",
            isCompact ? "p-6" : "p-8 md:p-12",
            isGradient && "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent"
          )}
        >
          {/* Decorative elements */}
          {showDecoration && (
            <>
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/5 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-primary/5 blur-3xl" />
            </>
          )}

          <div
            className={cn(
              "relative flex flex-col gap-8",
              isCentered ? "text-center items-center" : "lg:flex-row lg:items-center justify-between",
              isCompact && "gap-4"
            )}
          >
            {/* Text Content */}
            <div className={cn(
              "max-w-xl",
              isCentered && "text-center mx-auto",
              isCompact && "max-w-lg"
            )}>
              {badge && (
                <Badge 
                  variant={isGradient ? "glass" : "outline"} 
                  className={cn("mb-3 gap-2 w-fit", isCentered && "mx-auto")}
                >
                  <span className="w-4 h-px bg-primary" />
                  {badge}
                </Badge>
              )}
              
              <h2 className={cn(
                "font-light text-foreground leading-tight",
                isCompact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl",
                isCentered && "mx-auto"
              )}>
                {title}{" "}
                {titleHighlight && (
                  <span className="text-primary">{titleHighlight}</span>
                )}
              </h2>
              
              {description && (
                <p className={cn(
                  "text-muted-foreground leading-relaxed mt-3",
                  isCompact ? "text-sm" : "text-base",
                  isCentered && "mx-auto max-w-md"
                )}>
                  {description}
                </p>
              )}
            </div>

            {/* Actions Buttons */}
            {actions && actions.length > 0 && (
              <div className={cn(
                "flex flex-wrap gap-3",
                isCentered ? "justify-center" : "",
                isCompact && "gap-2"
              )}>
                {actions.map((action, idx) => renderButton(action, idx))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Predefined variants for common use cases (sem precisar passar props obrigatórias)
export const ContactCTA = () => (
  <CTABanner
    badge="Próximo passo"
    title="Pronto para começar"
    titleHighlight="a sua formação?"
    description="Fale connosco pelo WhatsApp, venha à nossa sede ou preencha o formulário. A equipa do Inefor está disponível para orientar a sua escolha."
    actions={[
      {
        label: "WhatsApp",
        href: "https://wa.me/244944683483",
        icon: <MessageCircle className="w-4 h-4" />,
        variant: "outline",
        external: true,
      },
      {
        label: "Inscrever agora",
        href: "/contacto",
        icon: <ArrowRight className="w-4 h-4" />,
        variant: "default",
      },
    ]}
  />
);

export const NewsletterCTA = () => (
  <CTABanner
    badge="Newsletter"
    title="Fique por dentro"
    titleHighlight="das novidades"
    description="Receba informações sobre novos cursos, eventos e oportunidades exclusivas."
    variant="centered"
    background="gradient"
    actions={[
      {
        label: "Inscrever-me",
        href: "/newsletter",
        icon: <Mail className="w-4 h-4" />,
        variant: "default",
      },
    ]}
  />
);

export const CourseCTA = () => (
  <CTABanner
    badge="Próxima turma"
    title="Garanta sua vaga"
    titleHighlight="agora mesmo"
    description="As vagas são limitadas. Não perca a oportunidade de se destacar no mercado."
    variant="compact"
    background="card"
    actions={[
      {
        label: "Ver cursos",
        href: "/cursos",
        icon: <Calendar className="w-4 h-4" />,
        variant: "outline",
      },
      {
        label: "Falar com consultor",
        href: "https://wa.me/244944683483",
        icon: <MessageCircle className="w-4 h-4" />,
        variant: "default",
        external: true,
      },
    ]}
  />
);

export const CorporateCTA = () => (
  <CTABanner
    badge="Soluções Empresariais"
    title="Formação para sua empresa"
    titleHighlight=""
    description="Oferecemos treinamentos personalizados para equipas corporativas. Entre em contato e solicite uma proposta."
    variant="centered"
    background="gradient"
    showDecoration={true}
    actions={[
      {
        label: "Solicitar proposta",
        href: "/empresarial",
        icon: <Users className="w-4 h-4" />,
        variant: "default",
      },
      {
        label: "Falar com especialista",
        href: "https://wa.me/244944683483",
        icon: <MessageCircle className="w-4 h-4" />,
        variant: "outline",
        external: true,
      },
    ]}
  />
);

// Componente simplificado para home (usa valores padrão)
export function HomeCTA() {
  return <CTABanner variant="default" background="surface" />;
}