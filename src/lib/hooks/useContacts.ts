import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabaseClient';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest?: string;
  message?: string;
  created_at: string;
}

export function useContacts() {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as Contact[];
    }
  });
}

