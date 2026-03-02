Start the board system (backend + frontend).

**Purpose:** Bring the progress board back up after context refresh or connection issues.

**Current Setup:**
- **Backend:** `synapse/routing-dashboard/server.js` (port 9001) - Express API
- **Frontend:** `synapse/board-simple/` (port 9002) - React app
- **Database:** NeonDB Falling Hall branch (br-falling-hall-advv61cc)

**Quick Steps:**

**1. Start Backend (Terminal 1):**
```bash
cd synapse/routing-dashboard
# Verify .env file exists with NEON_DATABASE_URL for Falling Hall branch
node server.js
```
Should see: `✅ Connected to NeonDB` and `🚀 QUILT Routing Dashboard running on http://localhost:9001`

**2. Start Frontend (Terminal 2):**
```bash
cd synapse/board-simple
npm run dev
```
Should start on port 9002 with Vite proxy to port 9001.

**3. Access Board:**
- Open http://localhost:9002 in browser
- Board will fetch data from backend API (port 9001)

**Troubleshooting:**
- **Port conflict:** 
  - Backend port 9001 in use? Change PORT in `synapse/routing-dashboard/.env`
  - Frontend port 9002 in use? Update `synapse/board-simple/vite.config.ts` server.port
- **Connection errors:** Verify NEON_DATABASE_URL in `.env` matches Falling Hall branch connection string
- **API calls failing:** Verify backend (9001) is running before starting frontend (9002)
- **No data showing:** Check browser console Network tab for API errors

**Key Files:**
- Backend: `synapse/routing-dashboard/server.js`
- Frontend: `synapse/board-simple/App.tsx`
- Environment: `synapse/routing-dashboard/.env`
- Setup Guide: `synapse/routing-dashboard/BOARD_INTEGRATION_SETUP.md`
- Quick Reference: `synapse/routing-dashboard/RILEY_QUICK_REF.md` (database/branch info)


