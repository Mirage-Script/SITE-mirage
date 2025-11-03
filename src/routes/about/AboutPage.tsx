import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const values = [
  {
    title: 'Obsessão por excelência técnica',
    description: 'Processos com revisão pair, arquitetura evolutiva, métricas DORA e documentação viva.'
  },
  {
    title: 'Transparência radical',
    description: 'Sprints com reports semanais, dashboards de indicadores e SLAs claros.'
  },
  {
    title: 'Segurança como padrão',
    description: 'RLS, auditoria, encryption, threat modeling e treinamentos contínuos.'
  }
];

const timeline = [
  { year: '2021', event: 'Fundação da Mirage com foco em produtos digitais enterprise' },
  { year: '2022', event: 'Operação de squads remotos para scale-ups e corporações' },
  { year: '2023', event: 'Lançamento do framework Mirage Delivery Playbook (MDP)' },
  { year: '2024', event: 'Integrações Supabase e pipelines multi-cloud com governança' }
];

export default function AboutPage() {
  return (
    <div className="space-y-24">
      <Helmet>
        <title>Sobre · MIRAGE</title>
        <meta
          name="description"
          content="Conheça a equipe MIRAGE, nossos valores e diferenciais em engenharia de software enterprise." />
      </Helmet>

      <section className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">DNA Mirage</p>
          <h1 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-50">
            Engenharia + produto + operação. Um time único para entregar ponta a ponta.
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Atuamos como parceiro estratégico, co-criando roadmaps, estruturando squads e escalando operações. Cultura de
            aprendizado contínuo, mentorias semanais e rituais de revisão técnica em todas as frentes.
          </p>
        </div>
        <div className="rounded-3xl border border-neutral-200 bg-neutral-100/70 p-6 text-sm text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800/40 dark:text-neutral-200">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">Indicadores</p>
          <ul className="mt-4 space-y-3">
            <li>+1200 horas em arquitetura e auditoria em 2024</li>
            <li>Roadmaps alinhados com OKRs trimestrais</li>
            <li>Times com NPS &gt; 82</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">Nossos valores</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <motion.article
              key={value.title}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{value.title}</h3>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{value.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="cases" className="rounded-[2.5rem] border border-neutral-200 bg-neutral-900 px-10 py-14 text-white shadow-2xl dark:border-neutral-800">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">Cases & impacto</p>
        <h2 className="mt-4 text-3xl font-semibold">+70 produtos digitais lançados nos últimos 36 meses.</h2>
        <p className="mt-4 max-w-2xl text-sm text-neutral-200">
          Atuação como partner técnico em setores como fintech, health, energia e indústria. Times distribuídos entre
          Brasília, São Paulo, Recife, Lisboa e remoto global.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">Linha do tempo</h2>
        <ol className="mt-8 grid gap-6 text-sm text-neutral-600 dark:text-neutral-300 md:grid-cols-2">
          {timeline.map((item) => (
            <li key={item.year} className="rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <span className="text-xs uppercase tracking-[0.4em] text-primary">{item.year}</span>
              <p className="mt-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">{item.event}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
