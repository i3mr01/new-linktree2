# Firebase Setup Instructions

## Step 1: Add Firebase Configuration to `.env.local`

Create a `.env.local` file in the root of your project (if it doesn't exist) and add your Firebase configuration:

```env
# Firebase Client Configuration (from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBUDs6LkJfXehVBYH8xME-1trxWYeFzcX4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=newlinktree-9e94b.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=newlinktree-9e94b
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=newlinktree-9e94b.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=425297184175
NEXT_PUBLIC_FIREBASE_APP_ID=1:425297184175:web:da387b29222862b04d1b5a
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-7N4BBR07P8

# Database (your existing PostgreSQL connection)
DATABASE_URL="postgresql://postgres.hkugpeethudjasncoplt:sdEXVWUxvj0GDp1n@aws-1-eu-north-1.pooler.supabase.com:6543/postgres"

# Firebase Admin SDK (for server-side authentication)
# See Step 2 below for how to get this
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"newlinktree-9e94b",...}'
```

## Step 2: Get Firebase Service Account Key (for Server-Side Auth)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **newlinktree-9e94b**
3. Click the gear icon ⚙️ next to "Project Overview"
4. Go to **Project Settings**
5. Click on the **Service Accounts** tab
6. Click **Generate new private key**
7. A JSON file will download
8. Copy the entire JSON content and paste it as a string in your `.env.local`:

```env
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"newlinktree-9e94b","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'
```

**Important:** Make sure to:
- Wrap the entire JSON in single quotes `'...'`
- Keep all the `\n` characters for the private key (they're needed)
- Don't add any line breaks in the middle

## Step 3: Enable Authentication Methods

1. In Firebase Console, go to **Authentication**
2. Click **Get Started** (if you haven't already)
3. Go to the **Sign-in method** tab
4. Enable the following providers:
   - **Email/Password** - Click it, toggle "Enable", and save
   - **Google** - Click it, toggle "Enable", add your support email, and save

## Step 4: Test Your Setup

1. Restart your Next.js dev server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/login`
3. Try signing up with email/password or Google
4. You should be redirected to `/dashboard` after successful authentication

## Troubleshooting

### "Firebase is not configured" error
- Make sure all `NEXT_PUBLIC_FIREBASE_*` variables are set in `.env.local`
- Restart your dev server after adding environment variables

### "Firebase Admin not initialized" error
- Make sure `FIREBASE_SERVICE_ACCOUNT_KEY` is set correctly
- The JSON should be wrapped in single quotes
- Check that the private key has `\n` characters preserved

### Authentication not working
- Make sure Email/Password and Google are enabled in Firebase Console
- Check the browser console for any error messages
- Verify your Firebase project ID matches in both client and admin configs

