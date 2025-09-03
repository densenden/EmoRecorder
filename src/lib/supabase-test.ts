// Test file to verify Supabase connection
import { supabase } from './supabase';

export async function testSupabaseConnection() {
  console.log('Testing Supabase connection...');
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('Anon Key (first 20 chars):', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20));
  
  try {
    // Try to list buckets (this will fail if auth is wrong)
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    
    console.log('Successfully connected to Supabase!');
    console.log('Available buckets:', data);
    
    // Check if emo-recordings bucket exists
    const bucketExists = data?.some(bucket => bucket.name === 'emo-recordings');
    if (!bucketExists) {
      console.warn('Bucket "emo-recordings" does not exist. Please create it in Supabase.');
    } else {
      console.log('✓ Bucket "emo-recordings" exists');
    }
    
    return true;
  } catch (err) {
    console.error('Unexpected error:', err);
    return false;
  }
}

// Add this to window for easy testing in browser console
if (typeof window !== 'undefined') {
  (window as any).testSupabase = testSupabaseConnection;
}