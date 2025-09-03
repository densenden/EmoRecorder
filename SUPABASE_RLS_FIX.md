# Fix Supabase RLS Error

## The Problem
"new row violates row-level security policy" means the bucket has RLS enabled without proper policies.

## Solution Options

### Option 1: Disable RLS (Easiest for Development)

1. Go to your Supabase Dashboard
2. Navigate to **Storage**
3. Click on the `emo-recordings` bucket
4. Click on **Configuration** tab
5. Toggle **RLS enabled** to **OFF**
6. Click **Save**

### Option 2: Add RLS Policies (More Secure)

If you want to keep RLS enabled, add these policies:

1. Go to **Storage** > `emo-recordings` bucket
2. Click on **Policies** tab
3. Click **New Policy**

#### Policy 1: Allow Authenticated Uploads
- **Name**: Allow authenticated uploads
- **Policy type**: INSERT
- **Target roles**: authenticated
- **Policy definition**:
```sql
(auth.role() = 'authenticated'::text)
```

#### Policy 2: Allow Authenticated Downloads
- **Name**: Allow authenticated downloads  
- **Policy type**: SELECT
- **Target roles**: authenticated
- **Policy definition**:
```sql
(auth.role() = 'authenticated'::text)
```

#### Policy 3: Allow Authenticated Updates
- **Name**: Allow authenticated updates
- **Policy type**: UPDATE
- **Target roles**: authenticated
- **Policy definition**:
```sql
(auth.role() = 'authenticated'::text)
```

#### Policy 4: Allow Authenticated Deletes (Optional)
- **Name**: Allow authenticated deletes
- **Policy type**: DELETE  
- **Target roles**: authenticated
- **Policy definition**:
```sql
(auth.role() = 'authenticated'::text)
```

### Option 3: Make Bucket Fully Public (Not Recommended)

For testing only:
1. Add a policy for anonymous access
2. **Policy type**: ALL
3. **Target roles**: anon
4. **Policy definition**: `true`

## Quick SQL Commands

If you prefer SQL, run these in the SQL Editor:

```sql
-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT TO authenticated
USING (bucket_id = 'emo-recordings');

-- Allow authenticated users to view/download
CREATE POLICY "Allow authenticated downloads" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'emo-recordings');

-- Allow authenticated users to update their files
CREATE POLICY "Allow authenticated updates" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'emo-recordings');

-- Allow authenticated users to delete their files
CREATE POLICY "Allow authenticated deletes" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'emo-recordings');
```

## Testing After Changes

1. Refresh your app
2. Try recording and uploading again
3. Check browser console for any errors

## Note on Authentication

Since you're using Clerk for authentication (not Supabase Auth), the RLS policies checking for `authenticated` role won't work properly. You have two options:

1. **Disable RLS** (recommended for your setup)
2. **Use service role key** (not recommended for client-side)

For your Clerk + Supabase setup, disabling RLS is the simplest solution.