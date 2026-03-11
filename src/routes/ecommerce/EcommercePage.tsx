import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import { EcommerceAudience } from '@/components/sections/EcommerceAudience';
import { EcommerceFeatures } from '@/components/sections/EcommerceFeatures';
import { EcommerceHero } from '@/components/sections/EcommerceHero';
import { PricingComparison } from '@/components/sections/PricingComparison';
import { PricingFAQ } from '@/components/sections/PricingFAQ';
import { TestimonialsPricing } from '@/components/sections/TestimonialsPricing';
import { Button } from '@/components/ui/Button';

export default function EcommercePage() {
  const navigate = useNavigate();
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-20">
      <Helmet>
        <title>White Label E-commerce para Produtos Personalizados · MIRAGE</title>
        <meta
          name="description"
          content="Plataforma white label completa para vender produtos personalizados online. Camisetas, canecas, ecobags. Pronto em 2 semanas." />
      </Helmet>

      {/* Botão Sticky "Pricing" no topo */}
      <motion.div
        className="fixed top-24 right-6 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Button 
          onClick={scrollToPricing}
          className="shadow-lg hover:shadow-xl transition-shadow"
        >
          Ver Planos
        </Button>
      </motion.div>

      {/* E-COMMERCE PRODUCT SECTION */}
      <EcommerceHero onVerPlanos={scrollToPricing} />

      <EcommerceFeatures />

      <EcommerceAudience />

      {/* PRICING SECTION - Reference point for sticky button */}
      <motion.section 
        ref={pricingRef}
        className="space-y-16 scroll-mt-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <PricingComparison
          onSelectPlan={(planId) => {
            navigate('/contato');
          }}
        />

        <PricingFAQ />

        <TestimonialsPricing />
      </motion.section>

      {/* FINAL CTA */}
      <motion.section 
        className="space-y-8 rounded-[2.5rem] border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 p-12 text-center dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-800"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
          Pronto para começar?
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          Escolha o plano que melhor se adequa às suas necessidades. Sem contratos longos, cancele quando quiser.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" onClick={() => navigate('/contato')}>
            Começar Agora
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/contato')}>
            Agendar Demo
          </Button>
        </div>
      </motion.section>
    </div>
  );
}
