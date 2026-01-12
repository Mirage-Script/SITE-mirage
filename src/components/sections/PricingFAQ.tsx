// src/components/sections/PricingFAQ.tsx - Accordion de FAQ sobre preços

import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { motion } from 'framer-motion';

import { pricingFAQ } from '@/data/pricing';

export function PricingFAQ() {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Perguntas Frequentes</p>
        <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
          Dúvidas sobre os planos?
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {pricingFAQ.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Disclosure
              as="div"
              className="rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
            >
              <DisclosureButton className="flex w-full items-center justify-between px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                <span className="text-left font-semibold text-neutral-900 dark:text-neutral-100">
                  {item.question}
                </span>
                <ChevronUpIcon className="h-5 w-5 text-neutral-600 dark:text-neutral-400 group-data-[open]:rotate-180 transition-transform" />
              </DisclosureButton>
              <DisclosurePanel className="px-6 pb-4 text-sm text-neutral-600 dark:text-neutral-300">
                {item.answer}
              </DisclosurePanel>
            </Disclosure>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
