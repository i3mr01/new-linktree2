# Firebase Authentication Troubleshooting

## Error: "auth/unauthorized-domain"

This error means your Vercel domain is not authorized for OAuth operations in Firebase.

### Quick Fix: Add Your Domain to Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **newlinktree-9e94b**
3. Click **"Authentication"** in the left sidebar
4. Go to **"Settings"** tab
5. Scroll down to **"Authorized domains"** section
6. Click **"Add domain"**
7. Enter your Vercel domain: **new-linktree2.vercel.app**
8. Click **"Add"**
9. If you have a custom domain, add that too (e.g., `yourdomain.com`)

**Note:** Firebase automatically includes:
- `localhost` (for local development)
- `*.firebaseapp.com` (Firebase hosting)
- `*.web.app` (Firebase hosting)

You need to manually add your Vercel domain.

---

## Error: "CONFIGURATION_NOT_FOUND"

This error means Firebase Authentication is not enabled or configured in your Firebase project.

## Step-by-Step Fix

### Step 1: Enable Authentication in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **newlinktree-9e94b**
3. In the left sidebar, click **"Authentication"**
4. If you see "Get started" button, click it
5. Go to the **"Sign-in method"** tab

### Step 2: Enable Email/Password Authentication

1. Click on **"Email/Password"**
2. Toggle **"Enable"** to ON
3. Click **"Save"**

### Step 3: Enable Google Authentication (Optional but Recommended)

1. Click on **"Google"**
2. Toggle **"Enable"** to ON
3. Enter a **Project support email** (your email)
4. Click **"Save"**

### Step 4: Verify Your Firebase Project Configuration

1. In Firebase Console, click the **gear icon ⚙️** next to "Project Overview"
2. Go to **"Project Settings"**
3. Scroll down to **"Your apps"** section
4. If you see a web app, click on it
5. If you don't see a web app, click **"Add app"** → **"Web"** (</> icon)
6. Copy the configuration values and verify they match what you have in Vercel

### Step 5: Verify API Key Restrictions (if applicable)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: **newlinktree-9e94b**
3. Go to **"APIs & Services"** → **"Credentials"**
4. Find your API key: `AIzaSyBUDs6LkJfXehVBYH8xME-1trxWYeFzcX4`
5. Check if there are any restrictions that might block your domain
6. If restrictions exist, make sure your Vercel domain is allowed

### Step 6: Double-Check Environment Variables in Vercel

Make sure all these are set correctly:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBUDs6LkJfXehVBYH8xME-1trxWYeFzcX4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=newlinktree-9e94b.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=newlinktree-9e94b
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=newlinktree-9e94b.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=425297184175
NEXT_PUBLIC_FIREBASE_APP_ID=1:425297184175:web:da387b29222862b04d1b5a
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-7N4BBR07P8
```

### Step 7: Redeploy After Enabling Authentication

1. After enabling Authentication in Firebase Console
2. Go to Vercel → Your Project → Deployments
3. Click "Redeploy" on the latest deployment
4. Wait for deployment to complete
5. Test again

## Common Issues

### Issue: "Authentication not enabled"
**Solution:** Follow Step 1-3 above to enable Email/Password and Google sign-in

### Issue: "API key restrictions"
**Solution:** Check Google Cloud Console and ensure your Vercel domain is allowed

### Issue: "Wrong project ID"
**Solution:** Verify the project ID matches in both Firebase Console and Vercel environment variables

### Issue: "Environment variables not applied"
**Solution:** Make sure you redeployed after adding environment variables in Vercel

## Quick Verification Checklist

- [ ] Authentication is enabled in Firebase Console
- [ ] Email/Password sign-in method is enabled
- [ ] Google sign-in method is enabled (optional)
- [ ] All environment variables are set in Vercel
- [ ] Project redeployed after enabling Authentication
- [ ] API key has no blocking restrictions

