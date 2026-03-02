Restart the archi-ui development server and verify it's running (archi-ui/).

**Purpose:** Bring the archi-ui admin interface back up after context refresh or connection issues.

**Quick Steps:**
1. Navigate to archi-ui directory: `cd archi-ui`
2. Check if server is already running on port 3001 (stop if needed)
3. Verify `.env.local` file exists with correct Supabase credentials (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
4. Start dev server: `npm run dev`
5. Verify server: Check console for Vite dev server startup message
6. Access interface: http://localhost:3001

**Troubleshooting:**
- **Port conflict:** Check if port 3001 is in use, change port in `vite.config.ts` if needed
- **Missing dependencies:** Run `npm install` if node_modules are missing
- **Environment variables:** Verify `.env.local` exists with Supabase credentials (see `archi-ui/ENVIRONMENT_SETUP.md`)
- **Build errors:** Check console for TypeScript or build errors

**Key Files:**
- Dev server: `archi-ui/vite.config.ts` (configured for port 3001)
- Environment: `archi-ui/.env.local` (Supabase credentials)
- Setup guide: `archi-ui/ENVIRONMENT_SETUP.md` (database schema and setup instructions)
- Package scripts: `archi-ui/package.json` (dev script runs `vite`)

**Note:** archi-ui runs on port 3001, routing dashboard runs on port 9000 - both can run simultaneously.






