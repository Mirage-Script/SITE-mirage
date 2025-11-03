import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SupabaseStatus } from '../../components/admin/SupabaseStatus';

const tabs = [
  { id: 'database', label: 'Database' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'posts', label: 'Publicações' },
  { id: 'comments', label: 'Comentários' },
  { id: 'subscribers', label: 'Newsletter' }
];

const analytics = [
  { label: 'Visitas (30d)', value: '48.2k', delta: '+18%' },
  { label: 'Leads qualificados', value: '126', delta: '+22%' },
  { label: 'Tempo médio', value: '04m21s', delta: '+9%' }
];

const tableRows = [
  { title: 'Arquitetando SPAs React...', status: 'Publicado', date: '12/08/2025' },
  { title: 'ScrollTrigger e GSAP', status: 'Rascunho', date: '01/09/2025' },
  { title: 'Supabase + RLS', status: 'Publicado', date: '18/04/2025' }
];

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 750);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="space-y-12">
      <Helmet>
        <title>Admin · MIRAGE</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Dashboard</p>
          <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
            Operações e conteúdo centralizados.
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Controle de artigos, comentários, pipeline editorial e analytics vinculados ao Supabase.
          </p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-xs uppercase tracking-[0.3em] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
          Próxima retro: 08/11 · Squad Mirage Ops
        </div>
      </header>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex flex-wrap gap-3 rounded-3xl bg-neutral-100 p-2 dark:bg-neutral-800">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }: { selected: boolean }) =>
                clsx(
                  'rounded-2xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition',
                  selected
                    ? 'bg-neutral-900 text-white shadow-subtle dark:bg-neutral-100 dark:text-neutral-900'
                    : 'text-neutral-500 hover:bg-white/60 dark:text-neutral-300 dark:hover:bg-neutral-700'
                )
              }
            >
              {tab.label}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-8" aria-busy={isLoading}>
          <Tab.Panel>
            <SupabaseStatus />
          </Tab.Panel>

          <Tab.Panel>
            <div className="grid gap-6 md:grid-cols-3">
              {isLoading
                ? Array.from({ length: analytics.length }).map((_, index) => (
                    <div
                      key={`analytics-skeleton-${index}`}
                      className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
                    >
                      <Skeleton width={120} height={14} baseColor="#d1d5db" highlightColor="#f3f4f6" />
                      <Skeleton className="mt-3" height={28} baseColor="#e2e8f0" highlightColor="#f9fafb" />
                      <Skeleton className="mt-2" width={80} height={14} baseColor="#d1d5db" highlightColor="#f3f4f6" />
                    </div>
                  ))
                : analytics.map((item) => (
                    <motion.div
                      key={item.label}
                      className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                    >
                      <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{item.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{item.value}</p>
                      <p className="mt-1 text-xs font-semibold text-primary">{item.delta}</p>
                    </motion.div>
                  ))}
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                <thead className="bg-neutral-50 text-left text-xs uppercase tracking-[0.3em] text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                  <tr>
                    <th className="px-6 py-3">Título</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Atualizado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-sm text-neutral-600 dark:divide-neutral-800 dark:text-neutral-300">
                  {isLoading
                    ? Array.from({ length: tableRows.length }).map((_, index) => (
                        <tr key={`table-skeleton-${index}`}>
                          <td className="px-6 py-4">
                            <Skeleton height={18} width="80%" baseColor="#e2e8f0" highlightColor="#f8fafc" />
                          </td>
                          <td className="px-6 py-4">
                            <Skeleton height={16} width="50%" baseColor="#e2e8f0" highlightColor="#f8fafc" />
                          </td>
                          <td className="px-6 py-4">
                            <Skeleton height={16} width="40%" baseColor="#e2e8f0" highlightColor="#f8fafc" />
                          </td>
                        </tr>
                      ))
                    : tableRows.map((row) => (
                        <tr key={row.title} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/60">
                          <td className="px-6 py-4 font-medium text-neutral-900 dark:text-neutral-100">{row.title}</td>
                          <td className="px-6 py-4">{row.status}</td>
                          <td className="px-6 py-4">{row.date}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-100">
              Conectar moderação de comentários via Supabase Edge Functions e triggers de moderação automática.
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6 text-sm text-primary dark:border-accent/40 dark:bg-accent/10 dark:text-accent">
              Integração com Supabase para newsletter em andamento. Utilize a página de contato para adicionar novos leads.
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
