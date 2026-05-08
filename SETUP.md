# Setup Instructions - BGMI Configs

## 1. Supabase Setup (Free - 5 min)

1. Go to https://supabase.com and sign up
2. Create a new project (choose a name, set a secure DB password)
3. Wait 1-2 min for project to spin up
4. Go to **SQL Editor** → paste content of `lib/setup.sql` → Run
5. Go to **Project Settings** → **API** → copy:
   - `Project URL` → paste in `.env.local` as `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key (keep secret!) → paste as `SUPABASE_SERVICE_ROLE_KEY`
6. (Optional) Go to **Storage** → Create bucket `config-images` for image uploads

## 2. Local Config

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_EMAIL=admin@bgmiconfigs.com
ADMIN_PASSWORD=choose-a-strong-password
```

## 3. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` → public site
Visit `http://localhost:3000/admin/login` → admin panel (login with your email/password)

## 4. Deploy to Vercel (Free)

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   # Create repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USER/bgmi-configs.git
   git push -u origin main
   ```

2. Go to https://vercel.com → Import GitHub repo
3. Add all environment variables from `.env.local` in Vercel dashboard
4. Deploy — done!

## 5. PropellerAds Setup

1. Sign up at https://propellerads.com
2. Get your ad codes
3. Replace the placeholder ad spots in `pages/index.js` and `pages/config/[id].js`
4. Redeploy

## Project Structure

```
bgmi-configs-next/
├── pages/
│   ├── index.js              → Public homepage
│   ├── config/[id].js        → Config detail
│   ├── admin/
│   │   ├── login.js          → Admin login
│   │   ├── dashboard.js      → Manage configs
│   │   ├── new.js            → Add config
│   │   └── edit/[id].js      → Edit config
│   └── api/
│       ├── configs.js        → GET all configs
│       ├── config/[id].js    → GET single config
│       └── admin/
│           ├── login.js      → POST login
│           ├── configs.js    → POST insert
│           └── config/[id].js → PUT/DELETE
├── lib/
│   ├── supabase.js           → DB client
│   └── setup.sql             → Run this in Supabase SQL Editor
├── styles/globals.css        → Tailwind + custom styles
├── .env.local                → Environment variables
├── package.json
├── tailwind.config.js
├── next.config.js
└── vercel.json
```
