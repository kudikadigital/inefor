"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

interface PartnersProps {
  title?: string;
  subtitle?: string;
  partners: Partner[];
  className?: string;
}

export function Partners({
  title = "Parceiros",
  subtitle = "Empresas que confiam no nosso trabalho",
  partners,
  className,
}: PartnersProps) {
  return (
    <section className={cn("py-20", className)}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Rede de Parceiros
          </Badge>
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.website || "#"}
              target={partner.website ? "_blank" : undefined}
              rel={partner.website ? "noopener noreferrer" : undefined}
              className="group"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 bg-card border border-border rounded-xl flex items-center justify-center p-4 transition-all duration-300 hover:shadow-lg hover:border-primary/30 group-hover:scale-105">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <p className="text-center text-xs text-muted-foreground mt-2 group-hover:text-primary transition-colors">
                {partner.name}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}