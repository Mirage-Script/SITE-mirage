import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabaseClient';

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  deliverables: string[];
  investment: string;
  badge?: string;
  published_at: string;
}

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return (data || []) as Service[];
    }
  });
}

