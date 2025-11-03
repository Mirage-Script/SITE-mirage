import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { blogPosts, type BlogPost } from '@/data/blog';

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'software', label: 'Software' },
  { id: 'devops', label: 'DevOps' }
];

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const timeout = window.setTimeout(() => {
      setPosts(blogPosts);
      setIsLoading(false);
    }, 900);

    return () => window.clearTimeout(timeout);
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'all') {
      return posts;
    }
    return posts.filter((post) => post.category === activeFilter);
  }, [activeFilter, posts]);

  return (
    <div className="space-y-16">
      <Helmet>
        <title>Blog · MIRAGE</title>
        <meta
          name="description"
          content="Insights técnicos sobre desenvolvimento web, mobile, Supabase e governança em software." />
      </Helmet>

      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Conteúdo premium</p>
        <h1 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-50">
          Frameworks, padrões e análises para lideranças técnicas.
        </h1>
        <p className="max-w-3xl text-sm text-neutral-600 dark:text-neutral-300">
          Publicamos artigos com código, diagramas e guias operacionais para escalar produto com segurança, performance e
          previsibilidade.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 text-xs">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={clsx(
              'rounded-full border border-neutral-200 px-4 py-2 uppercase tracking-[0.3em] text-neutral-500 transition hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-300',
              activeFilter === filter.id && 'border-primary bg-primary/10 text-primary'
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3" aria-busy={isLoading} aria-live="polite">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`blog-skeleton-${index}`}
                className="rounded-3xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <Skeleton width={96} height={14} baseColor="#d1d5db" highlightColor="#f3f4f6" />
                <div className="mt-4 space-y-3">
                  <Skeleton count={2} height={24} baseColor="#e2e8f0" highlightColor="#f8fafc" />
                  <Skeleton count={3} height={16} baseColor="#e5e7eb" highlightColor="#f9fafb" />
                </div>
                <Skeleton className="mt-4" width="70%" height={14} baseColor="#d1d5db" highlightColor="#f9fafb" />
              </div>
            ))
          : filteredPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-3xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-accent">{post.category}</span>
                <h2 className="mt-3 text-xl font-semibold text-neutral-900 dark:text-neutral-100">{post.title}</h2>
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-neutral-500">
                  <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                  <span>{post.readingTime}</span>
                </div>
                <div className="mt-4 text-xs uppercase tracking-[0.4em] text-neutral-400">
                  {post.tags.join(' · ')}
                </div>
              </article>
            ))}
      </div>
    </div>
  );
}
