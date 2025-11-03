# Supabase Setup Guide - MIRAGE Platform

## 📋 Overview

Este documento descreve como o Supabase foi configurado para o projeto MIRAGE e como usar os dados no aplicativo.

## 🔧 Configuração Realizada

### Credenciais do Projeto
- **Project ID**: `mwcfjleyruysmxhzpkoa`
- **URL**: `https://mwcfjleyruysmxhzpkoa.supabase.co`
- **Organização**: Mirage-Script

### Tabelas Criadas

#### 1. **contacts**
Armazena submissões do formulário de contato.

```sql
- id (UUID, PK)
- name (VARCHAR)
- email (VARCHAR)
- phone (VARCHAR)
- company (VARCHAR)
- message (TEXT)
- service_interest (VARCHAR)
- status (VARCHAR) - 'new', 'read', 'responded'
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### 2. **newsletter_subscribers**
Gerencia inscritos na newsletter.

```sql
- id (UUID, PK)
- email (VARCHAR, UNIQUE)
- name (VARCHAR)
- subscribed_at (TIMESTAMP)
- unsubscribed_at (TIMESTAMP)
- is_active (BOOLEAN)
```

#### 3. **blog_posts**
Conteúdo editorial do blog.

```sql
- id (UUID, PK)
- title (VARCHAR)
- slug (VARCHAR, UNIQUE)
- excerpt (TEXT)
- content (TEXT)
- author (VARCHAR)
- featured_image (VARCHAR)
- category (VARCHAR)
- tags (TEXT[])
- published (BOOLEAN)
- published_at (TIMESTAMP)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- view_count (INTEGER)
```

#### 4. **cases**
Portfolio de cases/projetos.

```sql
- id (UUID, PK)
- title (VARCHAR)
- slug (VARCHAR, UNIQUE)
- description (TEXT)
- client_name (VARCHAR)
- industry (VARCHAR)
- technologies (TEXT[])
- results (TEXT)
- featured_image (VARCHAR)
- gallery_images (TEXT[])
- published (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### 5. **services**
Serviços oferecidos.

```sql
- id (UUID, PK)
- name (VARCHAR)
- slug (VARCHAR, UNIQUE)
- description (TEXT)
- icon (VARCHAR)
- features (TEXT[])
- published (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 🔐 Políticas de Segurança (RLS)

Todas as tabelas têm Row Level Security (RLS) habilitado:

- **Leitura pública**: Conteúdo publicado (`published = TRUE`) pode ser lido por qualquer pessoa
- **Inserção pública**: Contatos e inscritos na newsletter podem ser inseridos por qualquer pessoa
- **Restrição de escrita**: Apenas usuários autenticados podem atualizar/deletar dados

## 🚀 Como Usar

### 1. Variáveis de Ambiente

Configure no seu `.env.local`:

```bash
SUPABASE_URL=https://mwcfjleyruysmxhzpkoa.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Hooks Disponíveis

#### `useSupabaseQuery<T>`
Busca dados de uma tabela.

```typescript
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery';

function MyComponent() {
  const { data, loading, error } = useSupabaseQuery<BlogPost>(
    'blog_posts',
    (q) => q.eq('published', true).order('published_at', { ascending: false })
  );

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      {data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

#### `useSupabaseInsert<T>`
Insere novos dados.

```typescript
import { useSupabaseInsert } from '@/hooks/useSupabaseQuery';

function ContactForm() {
  const { insert, loading, error } = useSupabaseInsert<Contact>('contacts');

  const handleSubmit = async (data: Contact) => {
    try {
      await insert(data);
      console.log('Contato enviado com sucesso!');
    } catch (err) {
      console.error('Erro ao enviar:', err);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit({ /* dados */ });
    }}>
      {/* formulário */}
    </form>
  );
}
```

#### `useSupabaseUpdate<T>`
Atualiza dados existentes.

```typescript
const { update, loading, error } = useSupabaseUpdate<BlogPost>('blog_posts');

await update(postId, { published: true });
```

#### `useSupabaseDelete`
Deleta dados.

```typescript
const { remove, loading, error } = useSupabaseDelete('blog_posts');

await remove(postId);
```

### 3. Cliente Supabase Direto

Para operações mais complexas, use o cliente diretamente:

```typescript
import { supabase } from '@/lib/supabaseClient';

// Buscar com filtros complexos
const { data, error } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('published', true)
  .gte('published_at', '2025-01-01')
  .order('published_at', { ascending: false });

// Inserir com retorno
const { data, error } = await supabase
  .from('contacts')
  .insert([{ name: 'João', email: 'joao@example.com', message: '...' }])
  .select();

// Atualizar
const { data, error } = await supabase
  .from('blog_posts')
  .update({ view_count: view_count + 1 })
  .eq('id', postId);

// Deletar
const { error } = await supabase
  .from('blog_posts')
  .delete()
  .eq('id', postId);
```

## 📊 Dashboard Admin

Acesse `/admin` para ver o status do Supabase:

- Aba "Database" mostra a contagem de registros em cada tabela
- Conexão em tempo real com o Supabase
- Status de cada tabela (Connected/Error)

## 🌱 Scripts Disponíveis

### Setup do Banco de Dados
```bash
node scripts/setup-supabase-api.js
```
Cria todas as tabelas e índices.

### Seed de Dados
```bash
node scripts/seed-supabase.js
```
Insere dados de exemplo (blog posts, services, cases).

## 🔄 Realtime Subscriptions

Para escutar mudanças em tempo real:

```typescript
const subscription = supabase
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'contacts'
    },
    (payload) => {
      console.log('Mudança detectada:', payload);
    }
  )
  .subscribe();

// Limpar subscription
subscription.unsubscribe();
```

## 🛡️ Segurança

- **Chave ANON**: Usada no frontend (acesso público limitado)
- **Service Role Key**: Usada apenas no backend (acesso total)
- **RLS Policies**: Controlam quem pode ler/escrever cada tabela
- **Variáveis de ambiente**: Nunca commitar credenciais no Git

## 📚 Recursos Adicionais

- [Documentação Supabase](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Realtime](https://supabase.com/docs/guides/realtime)

## 🚨 Troubleshooting

### Erro: "Supabase credentials are missing"
Verifique se `SUPABASE_URL` e `SUPABASE_ANON_KEY` estão configurados em `.env.local`.

### Erro: "Permission denied"
Verifique as políticas RLS na tabela. Pode ser necessário criar uma política específica.

### Dados não aparecem
Verifique se `published = TRUE` para conteúdo que deve ser público.

## 📝 Próximos Passos

- [ ] Implementar autenticação com Supabase Auth
- [ ] Adicionar upload de imagens com Storage
- [ ] Configurar Edge Functions para lógica backend
- [ ] Implementar webhooks para notificações
- [ ] Adicionar backup automático

