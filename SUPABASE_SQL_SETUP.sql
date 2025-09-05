-- Supabase SQL Setup for SenRecorder
-- Run these commands in your Supabase SQL Editor

-- Step 1: Remove any existing policies
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public downloads" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload to their own folder" ON storage.objects;
DROP POLICY IF EXISTS "Users can read their own files" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon reads" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon deletes" ON storage.objects;

-- Step 2: Create new policies for the updated path structure (user_id/filename.wav)
-- Since we're using Clerk auth (not Supabase auth), we'll use anon role

-- Allow anyone with anon key to upload (Clerk handles the actual auth)
CREATE POLICY "Allow anon uploads" ON storage.objects
FOR INSERT TO anon
WITH CHECK (
  bucket_id = 'emo-recordings'
);

-- Allow anyone with anon key to read files (Clerk handles the actual auth)
CREATE POLICY "Allow anon reads" ON storage.objects
FOR SELECT TO anon
USING (
  bucket_id = 'emo-recordings'
);

-- Allow anyone with anon key to update files (for upsert functionality)
CREATE POLICY "Allow anon updates" ON storage.objects
FOR UPDATE TO anon
USING (
  bucket_id = 'emo-recordings'
)
WITH CHECK (
  bucket_id = 'emo-recordings'
);

-- Allow anyone with anon key to delete files
CREATE POLICY "Allow anon deletes" ON storage.objects
FOR DELETE TO anon
USING (
  bucket_id = 'emo-recordings'
);

-- Step 3: Ensure the bucket exists and has proper settings
-- This is informational - check these settings in the Supabase Dashboard:
-- 1. Bucket name: emo-recordings
-- 2. Public bucket: No (keep it private)
-- 3. RLS enabled: Yes
-- 4. File size limit: Set as needed (e.g., 50MB for audio files)

-- Verify the policies are created (check in pg_policies view)
SELECT schemaname, tablename, policyname, cmd, roles 
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects';