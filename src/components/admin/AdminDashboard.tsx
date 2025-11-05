import Skeleton from 'react-loading-skeleton';
import { Cell, CartesianGrid, Legend, LineChart, Line, PieChart, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { useBlogPosts } from '@/lib/hooks/useBlogPosts';
import { useCases } from '@/lib/hooks/useCases';
import { useContacts } from '@/lib/hooks/useContacts';
import { useNewsletter } from '@/lib/hooks/useNewsletter';

const COLORS = ['#3b82f6', '#22d3ee', '#8b5cf6', '#ec4899'];

export function AdminDashboard() {
  const { data: contacts, isLoading: contactsLoading } = useContacts();
  const { data: newsletter, isLoading: newsletterLoading } = useNewsletter();
  const { data: blogPosts, isLoading: blogLoading } = useBlogPosts();
  const { data: cases, isLoading: casesLoading } = useCases();

  const isLoading = contactsLoading || newsletterLoading || blogLoading || casesLoading;

  // KPI Cards
  const kpis = [
    { label: 'Total de Contatos', value: contacts?.length || 0 },
    { label: 'Newsletter Subscribers', value: newsletter?.length || 0 },
    { label: 'Blog Posts', value: blogPosts?.length || 0 },
    { label: 'Cases', value: cases?.length || 0 }
  ];

  // Série temporal: contatos por dia (últimos 30 dias)
  const getContactsByDay = () => {
    if (!contacts) return [];
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    return last30Days.map((day) => ({
      date: day,
      count: contacts.filter((c) => c.created_at.startsWith(day)).length
    }));
  };

  // Distribuição por serviço
  const getServiceDistribution = () => {
    if (!contacts) return [];
    const distribution: Record<string, number> = {};
    contacts.forEach((c) => {
      const service = c.service_interest || 'Não especificado';
      distribution[service] = (distribution[service] || 0) + 1;
    });
    return Object.entries(distribution).map(([name, value]) => ({ name, value }));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height={100} />
          ))}
        </div>
        <Skeleton height={300} />
        <Skeleton height={300} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{kpi.label}</p>
            <p className="mt-2 text-3xl font-bold text-primary dark:text-accent">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Série Temporal */}
      <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Contatos por Dia (Últimos 30 dias)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getContactsByDay()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" name="Contatos" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Distribuição por Serviço */}
      <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Distribuição por Serviço</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={getServiceDistribution()} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${String(name)}: ${String(value)}`} outerRadius={80} fill="#8884d8" dataKey="value">
              {getServiceDistribution().map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

