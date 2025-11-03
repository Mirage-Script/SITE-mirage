import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface UseSupabaseQueryOptions {
  enabled?: boolean;
  revalidateOnFocus?: boolean;
}

export function useSupabaseQuery<T>(
  table: string,
  query?: (q: any) => any,
  options: UseSupabaseQueryOptions = {}
) {
  const { enabled = true, revalidateOnFocus = true } = options;
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        let q = supabase.from(table).select('*');
        
        if (query) {
          q = query(q);
        }

        const { data: result, error: err } = await q;

        if (err) throw err;
        setData(result as T[]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    if (revalidateOnFocus) {
      window.addEventListener('focus', fetchData);
      return () => window.removeEventListener('focus', fetchData);
    }
  }, [table, enabled, revalidateOnFocus, query]);

  return { data, loading, error };
}

export function useSupabaseInsert<T>(table: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const insert = async (payload: T) => {
    try {
      setLoading(true);
      const { data, error: err } = await supabase
        .from(table)
        .insert([payload])
        .select();

      if (err) throw err;
      setError(null);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { insert, loading, error };
}

export function useSupabaseUpdate<T>(table: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = async (id: string, payload: Partial<T>) => {
    try {
      setLoading(true);
      const { data, error: err } = await supabase
        .from(table)
        .update(payload)
        .eq('id', id)
        .select();

      if (err) throw err;
      setError(null);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
}

export function useSupabaseDelete(table: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const remove = async (id: string) => {
    try {
      setLoading(true);
      const { error: err } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (err) throw err;
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
}

