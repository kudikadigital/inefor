"use client";

import { useState } from "react";
import { Play, X, User, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SuccessStoryProps {
  title?: string;
  content: string[];
  author: {
    name: string;
    role: string;
  };
  videoUrl?: string;
  imageUrl?: string;
  className?: string;
}

export function SuccessStory({
  title = "História de Sucesso",
  content,
  author,
  videoUrl,
  imageUrl = "/assets/backgrounds/success-story.jpg",
  className,
}: SuccessStoryProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section
        className={cn(
          "relative bg-cover bg-center bg-no-repeat py-20",
          className
        )}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left - Text Content */}
            <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-border">
              <Badge variant="glass" className="mb-4">
                Depoimento
              </Badge>
              <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">
                {title}
              </h2>
              
              <div className="space-y-4">
                {content.map((paragraph, idx) => (
                  <p key={idx} className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">{author.name}</h5>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Settings className="w-3 h-3" />
                      {author.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Video Button */}
            {videoUrl && (
              <div className="flex justify-center lg:justify-end">
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="group relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center hover:bg-primary/30 transition-all duration-300"
                >
                  <div className="absolute inset-2 rounded-full bg-primary/30 group-hover:scale-105 transition-transform" />
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoUrl && isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setIsVideoOpen(false)} />
          <div className="relative z-10 w-full max-w-4xl bg-black rounded-2xl overflow-hidden">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoUrl.split('/').pop()?.split('?')[0]}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}