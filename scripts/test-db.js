#!/usr/bin/env node

/**
 * Database Connection Test Script for Wedibox
 * Run with: node scripts/test-db.js
 */

const { createClient } = require('@supabase/supabase-js');

// Environment variables check
function checkEnvironmentVariables() {
  console.log('🔍 Checking environment variables...\n');
  
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ];

  const missing = [];
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (!value || value === 'your_supabase_project_url_here' || value === 'your_supabase_anon_key_here') {
      missing.push(varName);
      console.log(`❌ ${varName}: Missing or placeholder value`);
    } else {
      console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
    }
  });

  if (missing.length > 0) {
    console.log('\n❌ Database configuration incomplete!');
    console.log('\nTo fix this:');
    console.log('1. Create a .env.local file in your project root');
    console.log('2. Add your Supabase credentials:');
    console.log('   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co');
    console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key');
    console.log('\n3. Get these values from your Supabase dashboard:');
    console.log('   - Go to https://supabase.com/dashboard');
    console.log('   - Select your project');
    console.log('   - Go to Settings > API');
    console.log('   - Copy URL and anon/public key');
    return false;
  }

  return true;
}

async function testDatabaseConnection() {
  console.log('\n🔌 Testing Supabase connection...\n');

  try {
    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Test 1: Basic connection
    console.log('Test 1: Basic connection...');
    const { data: connectionTest, error: connectionError } = await supabase
      .from('events')
      .select('count')
      .limit(1);

    if (connectionError) {
      if (connectionError.message.includes('relation "events" does not exist')) {
        console.log('⚠️  Connection successful, but tables not found');
        console.log('📝 You need to run the database schema setup');
        return { success: true, needsSchema: true };
      } else {
        console.log('❌ Connection failed:', connectionError.message);
        return { success: false, error: connectionError };
      }
    }

    console.log('✅ Basic connection successful');

    // Test 2: Check tables exist
    console.log('\nTest 2: Checking required tables...');
    const tables = ['events', 'photos', 'guest_messages'];
    const tableResults = {};

    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('count')
          .limit(1);

        if (error) {
          console.log(`❌ Table '${table}': ${error.message}`);
          tableResults[table] = false;
        } else {
          console.log(`✅ Table '${table}': Found`);
          tableResults[table] = true;
        }
      } catch (err) {
        console.log(`❌ Table '${table}': Error checking`);
        tableResults[table] = false;
      }
    }

    // Test 3: Storage bucket check
    console.log('\nTest 3: Checking storage bucket...');
    try {
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        console.log('❌ Storage check failed:', bucketsError.message);
      } else {
        const photosBucket = buckets.find(bucket => bucket.name === 'photos');
        if (photosBucket) {
          console.log('✅ Photos storage bucket: Found');
        } else {
          console.log('⚠️  Photos storage bucket: Not found');
          console.log('📝 You need to create a "photos" storage bucket');
        }
      }
    } catch (err) {
      console.log('❌ Storage check error:', err.message);
    }

    const allTablesExist = Object.values(tableResults).every(exists => exists);

    return {
      success: true,
      tablesExist: allTablesExist,
      tableResults,
      needsSchema: !allTablesExist
    };

  } catch (error) {
    console.log('❌ Database test failed:', error.message);
    return { success: false, error };
  }
}

async function main() {
  console.log('🗄️  Wedibox Database Connection Test\n');
  console.log('=====================================\n');

  // Check environment variables
  const envOk = checkEnvironmentVariables();
  if (!envOk) {
    process.exit(1);
  }

  // Test database connection
  const result = await testDatabaseConnection();

  console.log('\n📊 Test Results Summary:');
  console.log('========================');

  if (result.success) {
    console.log('✅ Database connection: SUCCESS');
    
    if (result.needsSchema) {
      console.log('⚠️  Database schema: NEEDS SETUP');
      console.log('\n📝 Next steps:');
      console.log('1. Go to your Supabase dashboard');
      console.log('2. Open the SQL Editor');
      console.log('3. Run the schema.sql file to create tables');
      console.log('4. Create a "photos" storage bucket');
      console.log('5. Run this test again');
    } else {
      console.log('✅ Database schema: READY');
      console.log('\n🎉 Your database is fully configured and ready to use!');
    }
  } else {
    console.log('❌ Database connection: FAILED');
    console.log('Error:', result.error?.message || 'Unknown error');
  }

  console.log('\n=====================================');
}

// Load environment variables from .env.local if it exists
try {
  require('dotenv').config({ path: '.env.local' });
} catch (err) {
  // dotenv not available, skip
}

main().catch(console.error); 