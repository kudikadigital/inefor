"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { events } from "@/data";
import { EnrollmentModal } from "@/components/modals/EnrollmentModal";

const typeLabel: Record<string, string> = {
  workshop: "Workshop",
  conference: "Conferência",
  seminar: "Seminário",
};

const typeColor: Record<string, string> = {
  workshop: "bg-blue-500",
  conference: "bg-purple-500",
  seminar: "bg-green-500",
};

const eventImages: Record<string, string> = {
  "bminfo": "/all/events/01.jpg",
  "wcp": "/all/events/02.jpg",
  "inoc": "/all/events/03.jpg",
};

const fallbackImage = "/all/11.jpg";

export function EventsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalEvents = events.length;
  const visibleCount = 3;
  
  // Duplicar eventos para efeito infinito
  const extendedEvents = [...events, ...events, ...events];
  const startIndex = events.length + currentIndex;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= events.length) {
        setTimeout(() => {
          setCurrentIndex(0);
        }, 50);
        return prev;
      }
      return next;
    });
  }, [events.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev - 1;
      if (next < 0) {
        setTimeout(() => {
          setCurrentIndex(events.length - 1);
        }, 50);
        return prev;
      }
      return next;
    });
  }, [events.length]);

  useEffect(() => {
    if (!isAutoPlaying || isHovering) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovering, nextSlide]);

  const handleEnroll = (e: React.MouseEvent, event: typeof events[0]) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setTouchStart(null);
  };

  return (
    <>
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-primary text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-primary" />
                Agenda 2025
              </p>
              <h2 className="text-3xl sm:text-4xl font-light text-foreground leading-tight">
                Próximos Eventos
              </h2>
              <p className="text-muted-foreground text-sm mt-2">
                Participe dos nossos eventos e workshops
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Auto-play control */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
              >
                {isAutoPlaying ? (
                  <Pause className="w-3.5 h-3.5 text-muted-foreground" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-muted-foreground" />
                )}
              </button>
              
              {/* Navigation buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              
              <Link href="/eventos">
                <Button variant="ghost" size="sm" className="gap-2">
                  Ver todos <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Carousel */}
          <div
            ref={containerRef}
            className="relative overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${startIndex * (100 / visibleCount)}%)` }}
            >
              {extendedEvents.map((event, idx) => (
                <div
                  key={`${event.id}-${idx}`}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                >
                  <div className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer transition-all duration-500 hover:shadow-xl">
                    {/* Link para detalhes */}
                    <Link href={`/eventos/${event.id}`} className="absolute inset-0 z-10" />

                    {/* Image */}
                    <img
                      src={eventImages[event.id] || fallbackImage}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                      <Badge variant={event.registrationOpen ? "default" : "secondary"} className="text-[10px]">
                        {event.registrationOpen ? "Inscrições abertas" : "Em breve"}
                      </Badge>
                      <Badge variant="glass" className="text-[10px]">
                        {typeLabel[event.type]}
                      </Badge>
                    </div>

                    {/* Type color indicator */}
                    <div className={cn(
                      "absolute top-4 right-4 z-20 w-2 h-2 rounded-full",
                      typeColor[event.type]
                    )} />

                    {/* Botão "Inscrever" */}
                    {event.registrationOpen && (
                      <div className="absolute bottom-4 right-4 z-30 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                        <Button
                          onClick={(e) => handleEnroll(e, event)}
                          size="sm"
                          className="gap-2 shadow-lg bg-primary hover:bg-primary/90"
                        >
                          Inscrever <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                    )}

                    {/* Content bottom */}
                    <div className="absolute left-0 right-0 bottom-0 p-5 z-20">
                      <p className="text-white/60 text-[11px] uppercase tracking-widest mb-1">
                        {event.date}
                      </p>
                      
                      <h3 className="text-white font-medium text-lg leading-snug mb-1 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>

                      {/* Description - aparece no hover */}
                      <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-2">
                        <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                      </div>

                      {/* Details - aparecem no hover */}
                      <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-10 group-hover:mt-2">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {event.time || "09:00 - 18:00"}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-white/30" />
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.location || "Luanda, Angola"}
                          </span>
                          {event.spots && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-white/30" />
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {event.spots} vagas
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {events.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  idx === currentIndex
                    ? "w-6 h-2 bg-primary"
                    : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal de inscrição */}
      {selectedEvent && (
        <EnrollmentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
          }}
          courseTitle={selectedEvent.title}
          courseId={selectedEvent.id}
          coursePrice={selectedEvent.price || "Gratuito"}
        />
      )}
    </>
  );
}