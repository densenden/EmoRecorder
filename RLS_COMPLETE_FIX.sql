-- Run this complete script in Supabase SQL Editor
-- Make sure to select all and run at once

-- Step 1: Remove any existing policies that might conflict
DROP POLICY IF EXISTS "ok oil2eg_0" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated downloads" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon inserts" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon select" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon update" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon delete" ON storage.objects;

-- Step 2: Create new policies for anon role (since you use Clerk, not Supabase Auth)

-- Allow INSERT for anon users
CREATE POLICY "Enable insert for anon" 
ON storage.objects FOR INSERT 
TO anon 
WITH CHECK (bucket_id = 'emo-recordings');

-- Allow SELECT for anon users  
CREATE POLICY "Enable select for anon" 
ON storage.objects FOR SELECT 
TO anon 
USING (bucket_id = 'emo-recordings');

-- Allow UPDATE for anon users
CREATE POLICY "Enable update for anon" 
ON storage.objects FOR UPDATE 
TO anon 
USING (bucket_id = 'emo-recordings');

-- Allow DELETE for anon users (optional)
CREATE POLICY "Enable delete for anon" 
ON storage.objects FOR DELETE 
TO anon 
USING (bucket_id = 'emo-recordings');