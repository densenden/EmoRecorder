-- CORRECT RLS POLICIES FOR SUPABASE STORAGE
-- Run each statement separately in Supabase SQL Editor

-- 1. First, clean up any existing policies
DROP POLICY IF EXISTS "Enable insert for anon" ON storage.objects;
DROP POLICY IF EXISTS "Enable select for anon" ON storage.objects;
DROP POLICY IF EXISTS "Enable update for anon" ON storage.objects;
DROP POLICY IF EXISTS "Enable delete for anon" ON storage.objects;

-- 2. INSERT Policy (only WITH CHECK, no USING)
CREATE POLICY "Allow anon insert" 
ON storage.objects 
FOR INSERT 
TO anon 
WITH CHECK (bucket_id = 'emo-recordings');

-- 3. SELECT Policy (only USING, no WITH CHECK)
CREATE POLICY "Allow anon select" 
ON storage.objects 
FOR SELECT 
TO anon 
USING (bucket_id = 'emo-recordings');

-- 4. UPDATE Policy (both USING and WITH CHECK)
CREATE POLICY "Allow anon update" 
ON storage.objects 
FOR UPDATE 
TO anon 
USING (bucket_id = 'emo-recordings')
WITH CHECK (bucket_id = 'emo-recordings');

-- 5. DELETE Policy (only USING, no WITH CHECK)
CREATE POLICY "Allow anon delete" 
ON storage.objects 
FOR DELETE 
TO anon 
USING (bucket_id = 'emo-recordings');

-- IMPORTANT NOTES:
-- INSERT: Only WITH CHECK (checks data being inserted)
-- SELECT: Only USING (filters what can be viewed)
-- UPDATE: Both USING (what can be updated) and WITH CHECK (new values)
-- DELETE: Only USING (what can be deleted)