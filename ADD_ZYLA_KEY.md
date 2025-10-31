# 🔑 Add ZYLA_API_KEY to Your .env.local File

## Current Situation
Your `.env.local` file exists but is missing the ZYLA_API_KEY needed for property listings.

## Fix (2 Steps):

### Step 1: Get Your ZylaLabs API Key

1. **Go to:** https://zylalabs.com/user/dashboard
2. **Copy your API key**

**Don't have an account yet?**
- Sign up here: https://zylalabs.com/api-marketplace/real+estate+%26+housing/uae+real+estate+data++api/11013
- Subscribe to the UAE Real Estate Data API (ID: 11013)
- May have a free trial or free tier

---

### Step 2: Add ZYLA_API_KEY to .env.local

**Open your existing `.env.local` file and ADD this line at the bottom:**

```
ZYLA_API_KEY=your_actual_zylalabs_api_key_here
```

**Your complete `.env.local` should look like:**

```
# AI APIs
OPENAI_API_KEY=sk-proj-jhaZ...
GOOGLE_AI_API_KEY=AIzaS...

# Zyla Labs API for UAE Real Estate
ZYLA_API_KEY=your_actual_key_here
```

---

### Step 3: Restart Your Server

**In terminal:**
```bash
Ctrl+C  # Stop server
npm run dev  # Start again
```

---

## ✅ Test It Works

**1. Check API Key Loaded:**
http://localhost:3000/api/test-api-key

Should show:
```json
{
  "hasApiKey": true,
  "message": "✅ API Key is configured!"
}
```

**2. Refresh Properties Page:**
http://localhost:3000/explore

Should now show properties! 🎉

---

## 🔗 Get Your API Key:
https://zylalabs.com/user/dashboard

## 📧 Need Help?
support@zylalabs.com

