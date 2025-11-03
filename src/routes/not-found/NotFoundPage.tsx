import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
      <Helmet>
        <title>404 · MIRAGE</title>
      </Helmet>
      <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        Erro 404
      </span>
      <h1 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-50">Página não encontrada.</h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        O conteúdo que você procura pode ter sido removido ou renomeado. Utilize o menu ou volte para a página inicial.
      </p>
      <NavLink
        to="/"
        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Voltar para o início
      </NavLink>
    </div>
  );
}
