#!/usr/bin/env node

const https = require('https');

const SUPABASE_URL = 'https://mwcfjleyruysmxhzpkoa.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Y2ZqbGV5cnV5c214aHpwa29hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjExNzU1OCwiZXhwIjoyMDc3NjkzNTU4fQ.nBtLMYLN3YgiDw2TQfMXa0rL2hkQGUzUSrJ5htJuHy8';

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
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'apikey': SERVICE_ROLE_KEY
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

async function setupDatabase() {
  console.log('🚀 Starting Supabase database setup via API...\n');

  try {
    // Test connection
    console.log('🔗 Testing connection to Supabase...');
    const testRes = await makeRequest('GET', '/rest/v1/');
    if (testRes.status !== 200) {
      throw new Error(`Connection failed: ${testRes.status}`);
    }
    console.log('✅ Connected to Supabase\n');

    // Create contacts table
    console.log('📝 Creating contacts table...');
    const contactsRes = await makeRequest('POST', '/rest/v1/rpc/exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS contacts (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20),
          company VARCHAR(255),
          message TEXT NOT NULL,
          service_interest VARCHAR(100),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          status VARCHAR(50) DEFAULT 'new'
        );
      `
    });
    console.log(`✅ Contacts table: ${contactsRes.status === 200 ? 'Created' : 'Already exists'}`);

    // Create newsletter_subscribers table
    console.log('📝 Creating newsletter_subscribers table...');
    const newsletterRes = await makeRequest('POST', '/rest/v1/rpc/exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email VARCHAR(255) NOT NULL UNIQUE,
          name VARCHAR(255),
          subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          unsubscribed_at TIMESTAMP WITH TIME ZONE,
          is_active BOOLEAN DEFAULT TRUE
        );
      `
    });
    console.log(`✅ Newsletter table: ${newsletterRes.status === 200 ? 'Created' : 'Already exists'}`);

    // Create blog_posts table
    console.log('📝 Creating blog_posts table...');
    const blogRes = await makeRequest('POST', '/rest/v1/rpc/exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS blog_posts (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL UNIQUE,
          excerpt TEXT,
          content TEXT NOT NULL,
          author VARCHAR(255),
          featured_image VARCHAR(500),
          category VARCHAR(100),
          tags TEXT[],
          published BOOLEAN DEFAULT FALSE,
          published_at TIMESTAMP WITH TIME ZONE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          view_count INTEGER DEFAULT 0
        );
      `
    });
    console.log(`✅ Blog posts table: ${blogRes.status === 200 ? 'Created' : 'Already exists'}`);

    // Create cases table
    console.log('📝 Creating cases table...');
    const casesRes = await makeRequest('POST', '/rest/v1/rpc/exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS cases (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL UNIQUE,
          description TEXT,
          client_name VARCHAR(255),
          industry VARCHAR(100),
          technologies TEXT[],
          results TEXT,
          featured_image VARCHAR(500),
          gallery_images TEXT[],
          published BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });
    console.log(`✅ Cases table: ${casesRes.status === 200 ? 'Created' : 'Already exists'}`);

    // Create services table
    console.log('📝 Creating services table...');
    const servicesRes = await makeRequest('POST', '/rest/v1/rpc/exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS services (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL UNIQUE,
          description TEXT,
          icon VARCHAR(100),
          features TEXT[],
          published BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });
    console.log(`✅ Services table: ${servicesRes.status === 200 ? 'Created' : 'Already exists'}`);

    console.log('\n✅ Database setup completed successfully!');
    console.log('\n📊 Tables created:');
    console.log('  - contacts');
    console.log('  - newsletter_subscribers');
    console.log('  - blog_posts');
    console.log('  - cases');
    console.log('  - services');

  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  }
}

setupDatabase();

