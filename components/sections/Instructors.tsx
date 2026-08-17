"use client";

import { useState } from "react";
import { X, Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Instructor {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string[];
  social?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    email?: string;
  };
}

interface InstructorsProps {
  title?: string;
  subtitle?: string;
  instructors: Instructor[];
  className?: string;
}

export function Instructors({
  title = "Formadores",
  subtitle = "Conheça os profissionais que fazem a diferença",
  instructors,
  className,
}: InstructorsProps) {
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);

  return (
    <>
      <section className={cn("py-20", className)}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <Badge variant="glass" className="mb-4">
              Equipa
            </Badge>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {instructors.map((instructor) => (
              <button
                key={instructor.id}
                onClick={() => setSelectedInstructor(instructor)}
                className="group text-left"
              >
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-square">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {instructor.name}
                </h3>
                <p className="text-sm text-muted-foreground">{instructor.role}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Modal */}
      {selectedInstructor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedInstructor(null)}
          />
          <div className="relative z-10 w-full max-w-4xl bg-card rounded-2xl overflow-hidden shadow-2xl border border-border">
            <button
              onClick={() => setSelectedInstructor(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="aspect-square md:aspect-auto">
                <img
                  src={selectedInstructor.image}
                  alt={selectedInstructor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 overflow-y-auto max-h-[80vh]">
                <h3 className="text-2xl font-light text-foreground mb-1">
                  {selectedInstructor.name}
                </h3>
                <p className="text-primary text-sm mb-4">{selectedInstructor.role}</p>

                <div className="space-y-4 mb-6">
                  {selectedInstructor.bio.map((paragraph, idx) => (
                    <p key={idx} className="text-muted-foreground text-sm leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Social Links */}
                {selectedInstructor.social && (
                  <div className="flex gap-3 pt-4 border-t border-border">
                    {selectedInstructor.social.facebook && (
                      <a
                        href={selectedInstructor.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                      >
                        <Facebook className="w-4 h-4 text-muted-foreground hover:text-primary" />
                      </a>
                    )}
                    {selectedInstructor.social.instagram && (
                      <a
                        href={selectedInstructor.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                      >
                        <Instagram className="w-4 h-4 text-muted-foreground hover:text-primary" />
                      </a>
                    )}
                    {selectedInstructor.social.linkedin && (
                      <a
                        href={selectedInstructor.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary" />
                      </a>
                    )}
                    {selectedInstructor.social.email && (
                      <a
                        href={`mailto:${selectedInstructor.social.email}`}
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-muted-foreground hover:text-primary" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}