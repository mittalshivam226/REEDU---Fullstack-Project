import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testBackend() {
  try {
    console.log('Testing Supabase connection...');

    // Test basic connection by fetching from a table
    const { data, error } = await supabase
      .from('books')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Backend test failed:', error.message);
      return false;
    }

    console.log('Backend is working! Successfully connected to Supabase.');
    console.log('Sample data:', data);
    return true;
  } catch (error) {
    console.error('Backend test failed:', error.message);
    return false;
  }
}

testBackend();
