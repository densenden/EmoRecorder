# EmoRecorder Setup Guide

## Important: Configuration Required

The app needs proper API keys to work. The placeholder keys in the repository won't work for actual functionality.

### 1. Supabase Setup

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Go to Settings > API
4. Copy your **anon public** key (it's a long JWT token starting with `eyJ...`)
5. Copy your project URL

### 2. Create Storage Bucket

In your Supabase project:
1. Go to Storage
2. Create a new bucket called `emo-recordings`
3. Set it to **public** or configure RLS policies as needed

### 3. Clerk Setup

1. Create a Clerk account at https://clerk.com
2. Create a new application
3. Copy your **Publishable Key** from the API Keys section

### 4. Configure Environment Variables

Update your `.env` file with the real keys:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-real-anon-key
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your-real-clerk-key
```

### 5. Restart Development Server

After updating the .env file:
```bash
# Kill any running servers
pkill -f "npm run dev"

# Start fresh
npm run dev
```

## Troubleshooting

### CSS Not Loading
- Make sure Tailwind CSS v3 is installed: `npm list tailwindcss`
- Clear browser cache and hard reload (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows/Linux)

### Upload Failures
- Check browser console for detailed error messages
- Verify your Supabase anon key is correct (not the service role key)
- Ensure the `emo-recordings` bucket exists in Supabase Storage
- Check that your Supabase project URL is correct

### Clerk Authentication Issues
- Verify your Clerk publishable key is correct
- Make sure you're using the correct environment (development vs production)

## Note on Keys

The keys provided initially were in an incorrect format:
- `sb_secret_` and `sb_publishable_` are not standard Supabase key formats
- Supabase uses JWT tokens (starting with `eyJ...`) for the anon key
- Never commit real API keys to version control