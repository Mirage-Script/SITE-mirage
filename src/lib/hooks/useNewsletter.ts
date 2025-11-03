import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabaseClient';

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

export function useNewsletter() {
  return useQuery({
    queryKey: ['newsletter_subscribers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      return (data || []) as NewsletterSubscriber[];
    }
  });
}

