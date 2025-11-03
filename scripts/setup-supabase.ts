import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://mwcfjleyruysmxhzpkoa.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Y2ZqbGV5cnV5c214aHpwa29hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjExNzU1OCwiZXhwIjoyMDc3NjkzNTU4fQ.nBtLMYLN3YgiDw2TQfMXa0rL2hkQGUzUSrJ5htJuHy8';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

async function setupDatabase() {
  console.log('🚀 Starting Supabase database setup...\n');

  try {
    // Create contacts table
    console.log('📝 Creating contacts table...');
    const { error: contactsError } = await supabase.rpc('exec', {
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
        
        ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Allow public insert contacts" ON contacts
          FOR INSERT WITH CHECK (TRUE);
        
        CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
        CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
      `
    });

    if (contactsError) {
      console.log('⚠️  Contacts table might already exist or error:', contactsError.message);
    } else {
      console.log('✅ Contacts table created successfully');
    }

    // Create newsletter_subscribers table
    console.log('📝 Creating newsletter_subscribers table...');
    const { error: newsletterError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email VARCHAR(255) NOT NULL UNIQUE,
          name VARCHAR(255),
          subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          unsubscribed_at TIMESTAMP WITH TIME ZONE,
          is_active BOOLEAN DEFAULT TRUE
        );
        
        ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Allow public insert newsletter subscribers" ON newsletter_subscribers
          FOR INSERT WITH CHECK (TRUE);
        
        CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
      `
    });

    if (newsletterError) {
      console.log('⚠️  Newsletter table might already exist or error:', newsletterError.message);
    } else {
      console.log('✅ Newsletter subscribers table created successfully');
    }

    // Create blog_posts table
    console.log('📝 Creating blog_posts table...');
    const { error: blogError } = await supabase.rpc('exec', {
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
        
        ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Allow public read published blog posts" ON blog_posts
          FOR SELECT USING (published = TRUE);
        
        CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
        CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published);
      `
    });

    if (blogError) {
      console.log('⚠️  Blog posts table might already exist or error:', blogError.message);
    } else {
      console.log('✅ Blog posts table created successfully');
    }

    // Create cases table
    console.log('📝 Creating cases table...');
    const { error: casesError } = await supabase.rpc('exec', {
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
        
        ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Allow public read published cases" ON cases
          FOR SELECT USING (published = TRUE);
        
        CREATE INDEX IF NOT EXISTS idx_cases_slug ON cases(slug);
      `
    });

    if (casesError) {
      console.log('⚠️  Cases table might already exist or error:', casesError.message);
    } else {
      console.log('✅ Cases table created successfully');
    }

    // Create services table
    console.log('📝 Creating services table...');
    const { error: servicesError } = await supabase.rpc('exec', {
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
        
        ALTER TABLE services ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Allow public read published services" ON services
          FOR SELECT USING (published = TRUE);
        
        CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
      `
    });

    if (servicesError) {
      console.log('⚠️  Services table might already exist or error:', servicesError.message);
    } else {
      console.log('✅ Services table created successfully');
    }

    console.log('\n✅ Database setup completed successfully!');
    console.log('\n📊 Tables created:');
    console.log('  - contacts');
    console.log('  - newsletter_subscribers');
    console.log('  - blog_posts');
    console.log('  - cases');
    console.log('  - services');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();

