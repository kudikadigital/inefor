"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, 
  Twitter, Award, Calendar, BookOpen, Users, Briefcase 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  logoSrc?: string;
  logoDarkSrc?: string;
  logoAlt?: string;
  logoTitle?: string;
  sections?: FooterSection[];
  description?: string;
  socialLinks?: SocialLink[];
  contactInfo?: Array<{
    icon: React.ReactNode;
    text: string;
    href?: string;
  }>;
  bankInfo?: {
    account: string;
    iban: string;
  };
  copyright?: string;
  legalLinks?: FooterLink[];
  className?: string;
}

const defaultSections: FooterSection[] = [
  {
    title: "Cursos",
    links: [
      { name: "Cursos Tecnológicos", href: "/cursos?area=tech" },
      { name: "Cursos Administrativos", href: "/cursos?area=admin" },
      { name: "Cursos Programados", href: "/cursos/programados" },
      { name: "Formação Empresarial", href: "/cursos/empresariais" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { name: "Quem Somos", href: "/sobre" },
      { name: "Formadores", href: "/sobre#formadores" },
      { name: "Eventos", href: "/eventos" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { name: "Contacto", href: "/contacto" },
      { name: "FAQ", href: "/faq" },
      { name: "Termos e Condições", href: "/termos" },
      { name: "Política de Privacidade", href: "/privacidade" },
    ],
  },
];

const defaultSocialLinks: SocialLink[] = [
  { icon: <Facebook className="w-4 h-4" />, href: "https://www.facebook.com/Inefor.consultoria", label: "Facebook" },
  { icon: <Instagram className="w-4 h-4" />, href: "https://www.instagram.com/inefor_lda/", label: "Instagram" },
  { icon: <Linkedin className="w-4 h-4" />, href: "https://www.linkedin.com/in/inefor-ltd-796727197", label: "LinkedIn" },
  { icon: <Youtube className="w-4 h-4" />, href: "https://www.youtube.com/channel/UCZYlzvX_eF7tAAmW3NmYC-g", label: "YouTube" },
];

const defaultContactInfo = [
  { icon: <MapPin className="w-4 h-4" />, text: "Av. Deolinda Rodrigues Nº 329, 1º Andar, Luanda — Angola" },
  { icon: <Phone className="w-4 h-4" />, text: "+244 944 683 483", href: "tel:+244944683483" },
  { icon: <Mail className="w-4 h-4" />, text: "geral@inefor.ao", href: "mailto:geral@inefor.ao" },
];

const defaultBankInfo = {
  account: "9848701410001",
  iban: "0040.0000.9848.7014.1014.9",
};

const defaultLegalLinks: FooterLink[] = [
  { name: "Termos e Condições", href: "/termos" },
  { name: "Política de Privacidade", href: "/privacidade" },
];

export function Footer({
  logoSrc = "/logo-dark.png",
  logoDarkSrc = "/logo-light.png",
  logoAlt = "Inefor Logo",
  logoTitle = "INEFOR",
  sections = defaultSections,
  description = "Centro de excelência em formação técnica, tecnológica e administrativa. Formamos os profissionais que Angola precisa.",
  socialLinks = defaultSocialLinks,
  contactInfo = defaultContactInfo,
  bankInfo = defaultBankInfo,
  copyright = `© ${new Date().getFullYear()} Inefor. Todos os direitos reservados.`,
  legalLinks = defaultLegalLinks,
  className,
}: FooterProps) {
  const [isDark, setIsDark] = useState(false);

  // Detectar tema do sistema
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
    
    // Observar mudanças no tema
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  const currentLogoSrc = isDark ? logoDarkSrc : logoSrc;

  return (
    <footer className={cn("bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 border-t border-border", className)}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Main Footer Content */}
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start">
          
          {/* Left Column - Brand & Info */}
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start lg:w-1/3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-25 h-25">
                <Image
                  src={currentLogoSrc}
                  alt={logoAlt}
                  width={300}
                  height={300}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {logoTitle}
              </h2> */}
            </Link>
            
            {/* Description */}
            <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5">{info.icon}</span>
                  {info.href ? (
                    <a href={info.href} className="hover:text-primary transition-colors">
                      {info.text}
                    </a>
                  ) : (
                    <span>{info.text}</span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Bank Info */}
            <div className="pt-2">
              <p className="text-xs font-medium text-foreground mb-2">Dados Bancários</p>
              <p className="text-xs text-muted-foreground font-mono">Conta BAI: {bankInfo.account}</p>
              <p className="text-xs text-muted-foreground font-mono">IBAN: {bankInfo.iban}</p>
            </div>
            
            {/* Social Links */}
            <ul className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <li key={idx}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Links Sections */}
          <div className="grid w-full gap-8 md:grid-cols-3 lg:w-2/3">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 text-sm font-semibold text-foreground uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <p className="order-2 md:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-3 md:order-2 md:flex-row md:gap-6">
            {legalLinks.map((link, idx) => (
              <li key={idx}>
                <Link href={link.href} className="hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

// Componente simplificado para uso rápido
export function FooterSimple() {
  return <Footer />;
}