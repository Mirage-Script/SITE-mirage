import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabaseClient';

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  stack: string[];
  quote: string;
  author: string;
  role: string;
  published_at: string;
  created_at: string;
}

export function useCases() {
  return useQuery({
    queryKey: ['cases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      return (data || []) as CaseStudy[];
    }
  });
}

