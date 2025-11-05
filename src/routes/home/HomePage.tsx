// src/routes/home/index.tsx (CORRIGIDO - Título e Descrição)

import { Helmet } from 'react-helmet-async';

import { SmoothScrollReveal } from '@/components/effects/SmoothScrollReveal';
import { CaseShowcase } from '@/components/sections/CaseShowcase';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { DeliveryPlaybook } from '@/components/sections/DeliveryPlaybook';
import { HeroSection } from '@/components/sections/HeroSection';
import { OperationalHighlights } from '@/components/sections/OperationalHighlights';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { StatsCounter } from '@/components/sections/StatsCounter';
import { TechMarquee } from '@/components/sections/TechMarquee';

export default function HomePage() {
  return (
    <>
      {/* ==================================================================
       * DOCUMENTAÇÃO (CORREÇÃO DO TÍTULO/DESCRIÇÃO)
       * Corrigimos o título e a descrição para usar o nome completo da empresa.
       * ================================================================== */}
      <Helmet>
        <title>MIRAGE SCRIPT</title> 
        <meta
          name="description"
          content="MIRAGE SCRIPT"
        />
      </Helmet>
      
      {/* O resto do código da página inicial permanece o mesmo (removendo o fluff) */}
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

        {/* Secções de fluff comentadas (TestimonialsCarousel, PartnersShowcase, BlogHighlights) */}
        
        <ContactCTA />
      </div>
    </>
  );
}