// src/routes/home/index.tsx (MODIFICADO - A Correção Definitiva do Parallax)

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

// Importações das suas Secções
import { CaseShowcase } from '@/components/sections/CaseShowcase';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { DeliveryPlaybook } from '@/components/sections/DeliveryPlaybook';
import { HeroSection } from '@/components/sections/HeroSection';
import { OperationalHighlights } from '@/components/sections/OperationalHighlights';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { StatsCounter } from '@/components/sections/StatsCounter';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { gsap } from '@/lib/gsap';

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // ==================================================================
  // DOCUMENTAÇÃO (A CORREÇÃO DEFINITIVA)
  //
  // 1. Removemos o 'useGsapTimeline' (que era para "on-enter").
  // 2. Usamos o 'useEffect' padrão do React.
  // 3. 'gsap.context' é a forma moderna de criar animações GSAP
  //    no React, pois lida com a "limpeza" (cleanup) automaticamente.
  // 4. Aplicamos o 'yPercent: -20' a cada secção, como queríamos.
  // ==================================================================
  useEffect(() => {
    if (prefersReducedMotion || !mainRef.current) {
      return;
    }

    // Criamos um contexto GSAP para 'limpar' as animações
    const ctx = gsap.context(() => {
      // Seleciona todas as secções marcadas para o paralaxe
      const sections = gsap.utils.toArray<HTMLElement>('[data-parallax="true"]');

      sections.forEach((section) => {
        // Aplica o efeito de paralaxe a cada secção
        gsap.to(section, {
          yPercent: -20, // Move 20% para CIMA (mais rápido que o scroll)
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom', // Começa quando o topo da secção toca o fundo da tela
            end: 'bottom top', // Termina quando o fundo da secção toca o topo da tela
            scrub: true, // <-- A MÁGICA DO PARALLAX
          },
        });
      });
    }, mainRef); // O 'scope' do contexto é o 'div' principal

    // Função de Limpeza (Cleanup) do React
    return () => ctx.revert();
    
  }, [prefersReducedMotion]); // Executa apenas uma vez

  return (
    <>
      <Helmet>
        <title>MIRAGE SCRIPT</title> 
        <meta name="description" content="MIRAGE SCRIPT" />
      </Helmet>
      
      {/* * 1. Adicionámos a 'ref={mainRef}'.
       * 2. Removemos os '<SmoothScrollReveal>'.
       * 3. Adicionámos 'data-parallax="true"' às secções.
      */}
      <div ref={mainRef} className="space-y-24">
        
        {/* A HeroSection NÃO tem 'data-parallax' porque
            queremos que ela fique "presa" no topo enquanto as
            outras passam por cima. */}
        <HeroSection /> 
        
        <div data-parallax="true">
          <TechMarquee />
        </div>
        
        <div data-parallax="true">
          <ServicesOverview />
        </div>
        
        <div data-parallax="true">
          <StatsCounter />
        </div>
        
        <div data-parallax="true">
          <OperationalHighlights />
        </div>
        
        <div data-parallax="true">
          <DeliveryPlaybook />
        </div>
        
        <div data-parallax="true">
          <CaseShowcase />
        </div>

        {/* --- Secções Desativadas (Fluff) --- */}
        {/*
        <TestimonialsCarousel />
        <PartnersShowcase />
        <BlogHighlights />
        */}
        
        <div data-parallax="true">
          <ContactCTA />
        </div>
      </div>
    </>
  );
}