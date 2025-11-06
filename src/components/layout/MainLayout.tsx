// src/components/layout/MainLayout.tsx (Modificado)

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation } from 'react-router-dom';

import { ScrollProgressBar } from '@/components/effects/ScrollProgressBar';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useTheme } from '@/providers/ThemeProvider';

import { Footer } from '../navigation/Footer';
import { Navbar } from '../navigation/Navbar';
import { ScrollToTop } from '../navigation/ScrollToTop';

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export function MainLayout() {
  const location = useLocation();
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  useSmoothScroll(!prefersReducedMotion);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="bg-white text-neutral-900 transition-colors duration-300 dark:bg-neutral-900 dark:text-neutral-50">
      <ScrollToTop />
      <ScrollProgressBar />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '9999px',
            padding: '12px 18px',
            fontSize: '0.9rem',
            border:
              theme === 'dark'
                ? '1px solid rgba(148,163,184,0.25)'
                : '1px solid rgba(15,58,102,0.18)',
            background: theme === 'dark' ? '#0f172a' : '#ffffff',
            color: theme === 'dark' ? '#f8fafc' : '#0f172a',
            boxShadow: '0 28px 60px -30px rgba(74,123,167,0.45)',
          },
        }}
      />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          // ==================================================================
          // DOCUMENTAÇÃO (MODIFICAÇÃO)
          // Removi as classes `mx-auto`, `max-w-7xl` e os paddings `px-`
          // para permitir que o conteúdo ocupe 100% da largura.
          // Mantive apenas os paddings verticais (pt- e pb-).
          // ==================================================================
          className="w-full pb-24 pt-24"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}