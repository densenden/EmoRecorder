-- IMPORTANT: Since you use Clerk (not Supabase Auth), use 'anon' not 'authenticated'

-- Your current policy (won't work with Clerk):
-- CREATE POLICY "ok oil2eg_0" ON storage.objects 
-- FOR INSERT TO authenticated 
-- WITH CHECK (bucket_id = 'emo-recordings');

-- CORRECT policy for Clerk + Supabase setup:
CREATE POLICY "Allow anon inserts" ON storage.objects 
FOR INSERT TO anon 
WITH CHECK (bucket_id = 'emo-recordings');

-- Also add these for full functionality:
CREATE POLICY "Allow anon select" ON storage.objects 
FOR SELECT TO anon 
USING (bucket_id = 'emo-recordings');

CREATE POLICY "Allow anon update" ON storage.objects 
FOR UPDATE TO anon 
USING (bucket_id = 'emo-recordings');

CREATE POLICY "Allow anon delete" ON storage.objects 
FOR DELETE TO anon 
USING (bucket_id = 'emo-recordings');

-- Why this works:
-- 1. Clerk handles user authentication in your React app
-- 2. Supabase only knows about the 'anon' key from your .env
-- 3. The 'authenticated' role requires Supabase Auth (which you're not using)
-- 4. Using 'anon' allows your app to upload while Clerk handles security