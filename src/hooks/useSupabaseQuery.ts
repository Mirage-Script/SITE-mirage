import { useEffect, useState } from 'react';

import { supabase } from '../lib/supabaseClient';

interface UseSupabaseQueryOptions {
  enabled?: boolean;
  revalidateOnFocus?: boolean;
}

type SupabaseSelectBuilder = ReturnType<typeof supabase.from> extends infer FromBuilder
  ? FromBuilder extends {
      select: (...args: infer _Args) => infer Result;
    }
    ? Result
    : never
  : never;

export function useSupabaseQuery<T>(
  table: string,
  query?: (builder: SupabaseSelectBuilder) => SupabaseSelectBuilder,
  options: UseSupabaseQueryOptions = {},
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

        const baseBuilder = supabase.from(table).select('*');
  const builder = query ? query(baseBuilder) : baseBuilder;
        const response = await builder;
        const { error: err } = response;

        if (err) throw err;
        if (Array.isArray(response.data)) {
          setData(response.data as T[]);
        } else {
          setData(null);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();

    if (revalidateOnFocus) {
      window.addEventListener('focus', fetchData);
      return () => window.removeEventListener('focus', fetchData);
    }
  }, [table, enabled, revalidateOnFocus, query]);

  return { data, loading, error };
}

export function useSupabaseInsert<T extends Record<string, unknown>>(table: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const insert = async (payload: T) => {
    try {
      setLoading(true);
      const response = await supabase.from(table).insert(payload).select('*');
      const { error: err } = response;

      if (err) throw err;
      setError(null);
      if (Array.isArray(response.data)) {
        return response.data as T[];
      }

      return [];
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

export function useSupabaseUpdate<T extends Record<string, unknown>>(table: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = async (id: string, payload: Partial<T>) => {
    try {
      setLoading(true);
      const response = await supabase
        .from(table)
        .update(payload)
        .eq('id', id)
        .select('*');
      const { error: err } = response;

      if (err) throw err;
      setError(null);
      if (Array.isArray(response.data)) {
        return response.data as T[];
      }

      return [];
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

