"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Star, Quote } from 'lucide-react';
import { cn } from "@/lib/utils";

// --- Types ---
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
  rating?: number;
}

// --- Data do Inefor ---
const testimonials: Testimonial[] = [
  {
    text: "O INEFOR transformou minha carreira profissional. Os cursos são práticos e os formadores são excelentes. Recomendo a todos que buscam qualidade.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Maria Silva",
    role: "Engenheira de Telecomunicações",
    rating: 5,
  },
  {
    text: "Fiz o curso de Cisco CCNA e fui aprovado na certificação. A metodologia do Inefor é diferenciada, com muito foco na prática.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "João Santos",
    role: "Analista de Redes",
    rating: 5,
  },
  {
    text: "A formação em Fibra Óptica foi excelente! Os laboratórios são bem equipados e os instrutores dominam o assunto.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Ana Oliveira",
    role: "Técnica de Telecomunicações",
    rating: 5,
  },
  {
    text: "O curso de Gestão de Projetos me ajudou a conseguir uma promoção no trabalho. Material didático excelente e suporte incrível.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Carlos Mendes",
    role: "Gerente de Projetos",
    rating: 5,
  },
  {
    text: "Ambiente de aprendizagem muito bom, formadores atenciosos e conteúdo atualizado. O Inefor é referência em Angola.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Patrícia Lima",
    role: "Analista de RH",
    rating: 5,
  },
  {
    text: "Fiz vários cursos no Inefor e sempre saio satisfeito. A infraestrutura é boa e o atendimento é excelente.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Roberto Alves",
    role: "Administrador de Empresas",
    rating: 5,
  },
  {
    text: "O curso de Segurança de Redes superou minhas expectativas. Conteúdo profundo e exercícios práticos muito relevantes.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Fernanda Costa",
    role: "Especialista em Segurança",
    rating: 5,
  },
  {
    text: "Recomendo o Inefor para qualquer profissional que queira se destacar no mercado. Os certificados são reconhecidos.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Ricardo Ferreira",
    role: "Consultor de TI",
    rating: 5,
  },
  {
    text: "A plataforma EAD é muito boa e o suporte sempre responde rapidamente. Consegui conciliar os estudos com o trabalho.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Tatiana Souza",
    role: "Desenvolvedora",
    rating: 5,
  },
];

// Dividir em 3 colunas para o carrossel infinito
const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
interface TestimonialsColumnProps {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}

const TestimonialsColumn = ({
  className,
  testimonials,
  duration = 15
}: TestimonialsColumnProps) => {
  return (
    <div className={cn("flex-1", className)}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 list-none m-0 p-0"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role, rating }, i) => (
              <motion.li 
                key={`${index}-${i}`}
                aria-hidden={index === 1 ? "true" : "false"}
                tabIndex={index === 1 ? -1 : 0}
                whileHover={{ 
                  scale: 1.03,
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
                whileFocus={{ 
                  scale: 1.03,
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
                className="p-6 md:p-8 rounded-2xl border border-border bg-card shadow-lg shadow-black/5 max-w-sm w-full transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <blockquote className="m-0 p-0">
                  {/* Rating Stars */}
                  {rating && (
                    <div className="flex gap-1 mb-4">
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  )}
                  
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  
                  {/* Text */}
                  <p className="text-muted-foreground leading-relaxed font-normal m-0 transition-colors duration-300">
                    &ldquo;{text}&rdquo;
                  </p>
                  
                  {/* Footer with Avatar and Name */}
                  <footer className="flex items-center gap-3 mt-6">
                    <img
                      width={48}
                      height={48}
                      src={image}
                      alt={`Avatar of ${name}`}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-border group-hover:ring-primary/30 transition-all duration-300"
                    />
                    <div className="flex flex-col">
                      <cite className="font-semibold not-italic tracking-tight leading-5 text-foreground transition-colors duration-300">
                        {name}
                      </cite>
                      <span className="text-sm leading-5 tracking-tight text-muted-foreground mt-0.5 transition-colors duration-300">
                        {role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
};

// --- Main Component ---
interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export function TestimonialsSection({
  title = "O que nossos alunos dizem",
  subtitle = "Depoimentos reais de profissionais que transformaram suas carreiras conosco.",
  badge = "Depoimentos",
  className,
}: TestimonialsSectionProps) {
  return (
    <section 
      aria-labelledby="testimonials-heading"
      className={cn("bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 py-24 relative overflow-hidden", className)}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <motion.div 
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              {badge}
            </span>
          </div>

          <h2 
            id="testimonials-heading" 
            className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground tracking-tight mt-6"
          >
            {title}
          </h2>
          
          <p className="text-center mt-5 text-muted-foreground text-lg leading-relaxed max-w-md">
            {subtitle}
          </p>
        </div>

        {/* Scrolling Columns */}
        <div 
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} duration={30} className="hidden md:block" />
          <TestimonialsColumn testimonials={thirdColumn} duration={28} className="hidden lg:block" />
        </div>
      </motion.div>
    </section>
  );
}

// Export padrão para compatibilidade com o demo
export default TestimonialsSection;