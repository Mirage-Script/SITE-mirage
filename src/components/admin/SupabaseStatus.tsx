import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface TableStats {
  name: string;
  count: number;
  status: 'loading' | 'success' | 'error';
}

export function SupabaseStatus() {
  const [stats, setStats] = useState<TableStats[]>([
    { name: 'contacts', count: 0, status: 'loading' },
    { name: 'newsletter_subscribers', count: 0, status: 'loading' },
    { name: 'blog_posts', count: 0, status: 'loading' },
    { name: 'cases', count: 0, status: 'loading' },
    { name: 'services', count: 0, status: 'loading' }
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      const newStats = [...stats];

      for (let i = 0; i < newStats.length; i++) {
        try {
          const { count, error } = await supabase
            .from(newStats[i].name)
            .select('*', { count: 'exact', head: true });

          if (error) throw error;

          newStats[i] = {
            ...newStats[i],
            count: count || 0,
            status: 'success'
          };
        } catch (error) {
          console.error(`Error fetching ${newStats[i].name}:`, error);
          newStats[i] = {
            ...newStats[i],
            status: 'error'
          };
        }
      }

      setStats(newStats);
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Supabase Database Status</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className={`p-4 rounded-lg border-2 ${
              stat.status === 'success'
                ? 'border-green-500 bg-green-50'
                : stat.status === 'error'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <div className="text-sm font-medium text-gray-600 capitalize">
              {stat.name.replace(/_/g, ' ')}
            </div>
            <div className="text-3xl font-bold mt-2">
              {stat.status === 'loading' ? '...' : stat.count}
            </div>
            <div className="text-xs mt-2">
              {stat.status === 'success' && (
                <span className="text-green-600">✓ Connected</span>
              )}
              {stat.status === 'error' && (
                <span className="text-red-600">✗ Error</span>
              )}
              {stat.status === 'loading' && (
                <span className="text-gray-600">Loading...</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Connection Info</h3>
        <p className="text-sm text-blue-800">
          Project ID: <code className="bg-white px-2 py-1 rounded">mwcfjleyruysmxhzpkoa</code>
        </p>
        <p className="text-sm text-blue-800 mt-1">
          URL: <code className="bg-white px-2 py-1 rounded text-xs">https://mwcfjleyruysmxhzpkoa.supabase.co</code>
        </p>
      </div>
    </div>
  );
}

