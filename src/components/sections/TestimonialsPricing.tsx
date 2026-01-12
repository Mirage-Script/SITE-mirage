// src/components/sections/TestimonialsPricing.tsx - Depoimentos sobre os planos

import { StarIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

import { testimonials } from '@/data/pricing';

export function TestimonialsPricing() {
  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Quem Confia na Gente</p>
        <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
          Veja o que nossos clientes dizem
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900"
          >
            {/* Avaliação */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-primary dark:text-accent" />
              ))}
            </div>

            {/* Depoimento */}
            <blockquote className="text-sm text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Autor */}
            <div>
              <p className="font-semibold text-neutral-900 dark:text-neutral-100">{testimonial.name}</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                {testimonial.role} • {testimonial.company}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
