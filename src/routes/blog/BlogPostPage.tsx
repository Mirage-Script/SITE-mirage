import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';

import { blogPosts } from '@/data/blog';

export default function BlogPostPage() {
  const { slug } = useParams();

  const post = useMemo(() => blogPosts.find((item) => item.slug === slug), [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <Helmet>
        <title>{post.title} · MIRAGE</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <div className="space-y-3 text-sm uppercase tracking-[0.4em] text-primary">
        <span>{post.category}</span>
        <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
      </div>
      <h1 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-50">{post.title}</h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        {post.excerpt}
      </p>
      <div className="space-y-4 text-base leading-relaxed text-neutral-700 dark:text-neutral-200">
        <p>
          Este é um placeholder para o conteúdo completo do artigo. A integração com o CMS e Supabase permitirá editar e
          publicar posts com Markdown, blocos interativos e snippets de código.
        </p>
        <p>
          Enquanto isso, utilize este modelo para validar navegação, SEO, animações e performance. Inclua gráficos, códigos
          e estudos de caso conforme necessidade do roadmap editorial.
        </p>
      </div>
      <div className="rounded-3xl border border-neutral-200 bg-neutral-100/70 px-6 py-4 text-xs uppercase tracking-[0.4em] text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800/40 dark:text-neutral-300">
        Tags: {post.tags.join(' · ')}
      </div>
    </article>
  );
}
