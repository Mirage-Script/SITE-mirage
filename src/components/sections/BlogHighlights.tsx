import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { NavLink } from 'react-router-dom';

import { blogPosts } from '@/data/blog';
import { ANIM } from '@/lib/animTokens';

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'software', label: 'Software' },
  { id: 'devops', label: 'DevOps' }
];

export function BlogHighlights() {
  const [isLoading, setIsLoading] = useState(true);
  const featuredPosts = useMemo(() => blogPosts.slice(0, 3), []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), ANIM.duration.md * 1000);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section className="mt-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Blog técnico</p>
          <h2 className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-neutral-50 sm:text-4xl">
            Conteúdo estratégico para times de produto e engenharia.
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {categories.map((category) => (
            <span
              key={category.id}
              className={clsx(
                'rounded-full border px-3 py-1 uppercase tracking-[0.3em] text-neutral-500 dark:border-neutral-700 dark:text-neutral-300',
                category.id === 'web' && 'border-primary bg-primary/10 text-primary'
              )}
            >
              {category.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3" aria-busy={isLoading}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <Skeleton width={120} height={16} baseColor="#d1d5db" highlightColor="#f3f4f6" />
                <div className="mt-4 space-y-3">
                  <Skeleton count={2} height={24} baseColor="#d1d5db" highlightColor="#f3f4f6" />
                  <Skeleton count={3} height={16} baseColor="#e2e8f0" highlightColor="#f8fafc" />
                </div>
                <Skeleton className="mt-6" width="60%" height={14} baseColor="#d1d5db" highlightColor="#f8fafc" />
              </div>
            ))
          : featuredPosts.map((post) => (
              <article
                key={post.id}
                className="group flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-accent">{post.category}</span>
                  <h3 className="mt-3 text-xl font-semibold text-neutral-900 transition group-hover:text-primary dark:text-neutral-100">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{post.excerpt}</p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-neutral-500">
                  <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                  <span>{post.readingTime}</span>
                </div>
                <NavLink to={`/blog/${post.slug}`} className="mt-6 inline-flex items-center text-sm font-semibold text-primary">
                  Ler artigo →
                </NavLink>
              </article>
            ))}
      </div>
    </section>
  );
}
