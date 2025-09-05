# Fix Supabase RLS Policy Error

## Quick Fix - Disable RLS (Easiest)

1. Go to your Supabase Dashboard
2. Navigate to Storage → Buckets
3. Click on the `emo-recordings` bucket
4. Click on "Policies" tab
5. Toggle OFF "Enable Row Level Security (RLS)"

## Alternative - Update RLS Policy (More Secure)

If you want to keep RLS enabled, update your policy to match the new path structure:

1. Go to SQL Editor in Supabase Dashboard
2. Run this command to remove old policies:

```sql
-- Remove old policies
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public downloads" ON storage.objects;
```

3. Create new policies for the updated path structure (no emotion folders):

```sql
-- Allow any authenticated user to upload to their own folder
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT TO public
WITH CHECK (
  bucket_id = 'emo-recordings' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to read their own files
CREATE POLICY "Allow users to read own files" ON storage.objects
FOR SELECT TO public
USING (
  bucket_id = 'emo-recordings' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);
```

## Note about Authentication

Since this app uses Clerk for authentication (not Supabase Auth), the RLS policies won't work properly with `auth.uid()`. That's why disabling RLS is recommended for this setup.

The app uses the Supabase anon key which allows uploads when RLS is disabled on the bucket.