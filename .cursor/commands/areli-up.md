Restart the areli-ui frontend and areli-question-engine backend servers.

**Purpose:** Bring both the frontend (areli-ui) and backend (areli-question-engine) services back up after context refresh or connection issues.

**Quick Steps:**

**Backend (areli-question-engine):**
1. Navigate to areli-question-engine directory: `cd areli-question-engine`
2. Check if server is already running on port 8004 (stop if needed)
3. Verify `.env` file exists with required environment variables (SUPABASE_URL, SUPABASE_SERVICE_KEY, OPENROUTER_API_KEY, etc.)
4. Start backend server: `uvicorn app.main:app --reload --port 8004` (or `cd areli-question-engine; uvicorn app.main:app --reload --port 8004` for PowerShell)
5. Verify backend: Check console for startup message and test health endpoint: http://localhost:8004/health

**Frontend (areli-ui):**
1. Navigate to areli-ui directory: `cd areli-ui`
2. Check if server is already running on port 5173 (Vite default, stop if needed)
3. Verify `.env.local` file exists with correct Supabase credentials (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
4. Start dev server: `npm run dev` (or `cd areli-ui; npm run dev` for PowerShell)
5. Verify server: Check console for Vite dev server startup message (will show actual port)
6. Access interface: http://localhost:5173 (or port shown in console)

**Note:** On Windows PowerShell, use semicolon (`;`) instead of `&&` to chain commands.

**Troubleshooting:**

**Backend:**
- **Port conflict:** If port 8004 is in use, stop the existing process or change port
- **Missing dependencies:** Run `pip install -r requirements.txt` if packages are missing
- **Environment variables:** Verify `.env` exists with all required variables (SUPABASE_URL, SUPABASE_SERVICE_KEY, OPENROUTER_API_KEY, etc.)
- **Python version:** Requires Python 3.11+
- **Supabase connection:** Check logs for connection errors

**Frontend:**
- **Port conflict:** If port 5173 is in use, Vite will automatically use next available port (check console output)
- **Missing dependencies:** Run `npm install` if node_modules are missing
- **Environment variables:** Verify `.env.local` exists with Supabase credentials
- **Build errors:** Check console for TypeScript or build errors

**Key Files:**
- Backend server: `areli-question-engine/app/main.py` (FastAPI app, runs on port 8004)
- Backend environment: `areli-question-engine/.env` (Supabase, OpenRouter, Redis credentials)
- Frontend dev server: `areli-ui/vite.config.ts` (no port specified, uses Vite default 5173)
- Frontend environment: `areli-ui/.env.local` (Supabase credentials)
- Package scripts: `areli-ui/package.json` (dev script runs `vite`)

**Note:** 
- Backend runs on port 8004 (areli-question-engine FastAPI)
- Frontend runs on port 5173 (areli-ui Vite, or next available)
- Other services: anaia-ui (3000), archi-ui (3001), routing dashboard (9000) - all can run simultaneously

**Recent Features (Dec 2025):**
- **Analytics Dashboard:** Test Navigation Cards for quick access to test-specific dashboards (e.g., TExES 160, TExES 232)
- **Test-Specific Dashboards:** Individual analytics views per exam code with filtered metrics, charts, recent activity, and insights
- **Analytics Sidebar Submenu:** Dropdown menu in sidebar showing "Overview" and individual test links, auto-expands when viewing test dashboard
- **Question Bank Filters:** Simplified filters - removed Domain and Difficulty dropdowns, added Starred filter (All/Starred Only/Unstarred Only)
- **Question Bank UI:** Removed tag icon from table rows, kept only star/favorite icon
- **Export Menu:** Fine-grained export tool with horizontal range sliders (Domain, Competency, Exam Code, Difficulty, Status) - no labels, just sliders in a box
- **Tooltip Improvements:** Fixed tooltip visibility (white text on navy background) and removed redundant tooltips from pie charts






