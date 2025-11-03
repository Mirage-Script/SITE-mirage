import { Helmet } from 'react-helmet-async';

import { SmoothScrollReveal } from '@/components/effects/SmoothScrollReveal';
import { BlogHighlights } from '@/components/sections/BlogHighlights';
import { CaseShowcase } from '@/components/sections/CaseShowcase';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { DeliveryPlaybook } from '@/components/sections/DeliveryPlaybook';
import { HeroSection } from '@/components/sections/HeroSection';
import { OperationalHighlights } from '@/components/sections/OperationalHighlights';
import { PartnersShowcase } from '@/components/sections/PartnersShowcase';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { StatsCounter } from '@/components/sections/StatsCounter';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>MIRAGE · Engenharia de Software Full Stack</title>
        <meta
          name="description"
          content="Plataforma MIRAGE — engenharia enterprise-grade em React, mobile e software com Supabase, GSAP e RLS."
        />
      </Helmet>
      <div className="space-y-24">
        <HeroSection />
        <SmoothScrollReveal>
          <TechMarquee />
        </SmoothScrollReveal>
        <SmoothScrollReveal>
          <ServicesOverview />
        </SmoothScrollReveal>
        <SmoothScrollReveal>
          <StatsCounter />
        </SmoothScrollReveal>
        <SmoothScrollReveal>
          <OperationalHighlights />
        </SmoothScrollReveal>
        <SmoothScrollReveal>
          <DeliveryPlaybook />
        </SmoothScrollReveal>
        <SmoothScrollReveal>
          <CaseShowcase />
        </SmoothScrollReveal>
        <SmoothScrollReveal>
          <TestimonialsCarousel />
        </SmoothScrollReveal>
        <SmoothScrollReveal>
          <PartnersShowcase />
        </SmoothScrollReveal>
        <SmoothScrollReveal>
          <BlogHighlights />
        </SmoothScrollReveal>
        <ContactCTA />
      </div>
    </>
  );
}
