import { HeroSlider } from "@/components/sections/HeroSlider";
import { StatsBar } from "@/components/sections/StatsBar";
import { FeaturedCourses } from "@/components/sections/FeaturedCourses";
import { MonthSchedule } from "@/components/sections/MonthSchedule";
import { TrainingsSection } from "@/components/sections/TrainingsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { AboutStrip } from "@/components/sections/AboutStrip";
import { CTABanner, HomeCTA } from "@/components/sections/CTABanner";
import { ArrowRight } from "lucide-react";
import { homeStats } from "@/data";
import TestimonialsSection from "@/components/sections/TestimonialsSection";


export default function Home() {
  return (
    <>
      <HeroSlider />
        {/* Stats Bar - versão compacta para home */}
      <StatsBar 
        stats={homeStats} 
        variant="compact" 
        background="surface"
      />
      <FeaturedCourses />
      <MonthSchedule />
      <TrainingsSection />
      <EventsSection /> {/* AboutStrip na home - apenas o card com slide */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <AboutStrip 
          variant="full"
          buttons={[
            {
              label: "Conhecer o Inefor",
              href: "/sobre",
              variant: "outline",
              icon: <ArrowRight className="w-4 h-4" />,
            }
          ]}
        />
      </section>
      
      <TestimonialsSection />
       <HomeCTA />
    </>
  );
}
