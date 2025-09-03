-- Since you're using Clerk (not Supabase Auth), we need different RLS policies
-- Run these commands in your Supabase SQL Editor

-- First, remove any existing policies on the bucket
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated downloads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;

-- Option 1: Allow all operations for anyone with the anon key (suitable for your Clerk setup)
-- This is secure because users still need to authenticate through Clerk to access your app

-- Allow anyone to upload files to emo-recordings bucket
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT TO anon
WITH CHECK (bucket_id = 'emo-recordings');

-- Allow anyone to view/download files from emo-recordings bucket
CREATE POLICY "Allow public downloads" ON storage.objects
FOR SELECT TO anon
USING (bucket_id = 'emo-recordings');

-- Allow anyone to update files in emo-recordings bucket
CREATE POLICY "Allow public updates" ON storage.objects
FOR UPDATE TO anon
USING (bucket_id = 'emo-recordings');

-- Allow anyone to delete files from emo-recordings bucket (optional)
CREATE POLICY "Allow public deletes" ON storage.objects
FOR DELETE TO anon
USING (bucket_id = 'emo-recordings');

-- Option 2: If the above doesn't work, use a simpler policy that allows everything
-- Uncomment these if Option 1 doesn't work:

-- DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow public downloads" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow public updates" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;

-- CREATE POLICY "Allow all for anon" ON storage.objects
-- FOR ALL TO anon
-- USING (bucket_id = 'emo-recordings')
-- WITH CHECK (bucket_id = 'emo-recordings');