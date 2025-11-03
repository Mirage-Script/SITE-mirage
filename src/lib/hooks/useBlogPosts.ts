import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabaseClient';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'web' | 'mobile' | 'software' | 'devops';
  tags: string[];
  featured_image?: string;
  published_at: string;
  created_at: string;
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blog_posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      return (data || []) as BlogPost[];
    }
  });
}

