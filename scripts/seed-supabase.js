#!/usr/bin/env node

const https = require('https');

const SUPABASE_URL = 'https://mwcfjleyruysmxhzpkoa.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Y2ZqbGV5cnV5c214aHpwa29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMTc1NTgsImV4cCI6MjA3NzY5MzU1OH0.lCuSKgE5OV0HBdlQQqXb3NT5USRsSRqpFibzAaZy-8E';

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(SUPABASE_URL + path);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ANON_KEY}`,
        'apikey': ANON_KEY
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: data ? JSON.parse(data) : null
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data
          });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function seedDatabase() {
  console.log('🌱 Starting Supabase database seeding...\n');

  try {
    // Insert sample blog posts
    console.log('📝 Inserting sample blog posts...');
    const blogPosts = [
      {
        title: 'Transformação Digital: O Futuro da Engenharia Web',
        slug: 'transformacao-digital-futuro-engenharia-web',
        excerpt: 'Explore como a transformação digital está revolucionando a engenharia web moderna.',
        content: 'A transformação digital é mais do que uma tendência, é uma necessidade. Neste artigo, discutimos como as empresas podem se adaptar...',
        author: 'MIRAGE Team',
        category: 'Tecnologia',
        tags: ['digital', 'web', 'transformação'],
        published: true
      },
      {
        title: 'React 18: Novidades e Melhores Práticas',
        slug: 'react-18-novidades-melhores-praticas',
        excerpt: 'Descubra as principais novidades do React 18 e como implementá-las em seus projetos.',
        content: 'React 18 trouxe várias melhorias significativas. Vamos explorar as principais features...',
        author: 'MIRAGE Team',
        category: 'Desenvolvimento',
        tags: ['react', 'javascript', 'frontend'],
        published: true
      }
    ];

    for (const post of blogPosts) {
      const res = await makeRequest('POST', '/rest/v1/blog_posts', post);
      if (res.status === 201) {
        console.log(`  ✅ Blog post created: ${post.title}`);
      } else {
        console.log(`  ⚠️  Blog post might already exist: ${post.title}`);
      }
    }

    // Insert sample services
    console.log('\n🔧 Inserting sample services...');
    const services = [
      {
        name: 'Web Development',
        slug: 'web-development',
        description: 'Desenvolvimento de aplicações web modernas e escaláveis',
        icon: 'globe',
        features: ['React', 'TypeScript', 'Tailwind CSS', 'Performance Optimization'],
        published: true
      },
      {
        name: 'Mobile Development',
        slug: 'mobile-development',
        description: 'Criação de aplicativos mobile nativos e cross-platform',
        icon: 'smartphone',
        features: ['React Native', 'iOS', 'Android', 'User Experience'],
        published: true
      },
      {
        name: 'Software Architecture',
        slug: 'software-architecture',
        description: 'Design e arquitetura de sistemas escaláveis',
        icon: 'layers',
        features: ['Microservices', 'Cloud', 'DevOps', 'Security'],
        published: true
      }
    ];

    for (const service of services) {
      const res = await makeRequest('POST', '/rest/v1/services', service);
      if (res.status === 201) {
        console.log(`  ✅ Service created: ${service.name}`);
      } else {
        console.log(`  ⚠️  Service might already exist: ${service.name}`);
      }
    }

    // Insert sample cases
    console.log('\n📊 Inserting sample cases...');
    const cases = [
      {
        title: 'Plataforma de E-commerce Enterprise',
        slug: 'ecommerce-enterprise',
        description: 'Desenvolvimento de plataforma de e-commerce de alta performance',
        client_name: 'TechCorp',
        industry: 'Retail',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
        results: 'Aumento de 300% em conversões, redução de 50% no tempo de carregamento',
        published: true
      },
      {
        title: 'App Mobile de Gestão Financeira',
        slug: 'app-gestao-financeira',
        description: 'Aplicativo mobile para gestão de finanças pessoais',
        client_name: 'FinanceApp',
        industry: 'Fintech',
        technologies: ['React Native', 'Firebase', 'Redux'],
        results: '100k+ downloads, rating 4.8 stars',
        published: true
      }
    ];

    for (const caseItem of cases) {
      const res = await makeRequest('POST', '/rest/v1/cases', caseItem);
      if (res.status === 201) {
        console.log(`  ✅ Case created: ${caseItem.title}`);
      } else {
        console.log(`  ⚠️  Case might already exist: ${caseItem.title}`);
      }
    }

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📊 Data inserted:');
    console.log(`  - ${blogPosts.length} blog posts`);
    console.log(`  - ${services.length} services`);
    console.log(`  - ${cases.length} cases`);

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();

