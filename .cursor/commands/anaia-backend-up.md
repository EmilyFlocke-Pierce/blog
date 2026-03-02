Start the ANAIA API backend server (anaia-api/).

**Purpose:** Bring the ANAIA API backend server up for development, testing, or debugging.

**Quick Steps:**
1. Navigate to anaia-api directory: `cd anaia-api`
2. Check if server is already running on port 8001 (stop if needed)
3. Verify `.env` file exists with required environment variables:
   - `SUPABASE_URL` - Supabase project URL
   - `SUPABASE_SERVICE_KEY` - Service key for RLS bypass
   - `SUPABASE_ANON_KEY` - Anonymous key for JWT verification
   - `OPENROUTER_API_KEY` - OpenRouter API key for LLM access
   - `REDIS_URL` (optional) - Redis connection string (defaults to localhost:6379)
4. Start dev server: `python -m uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload`
5. Verify server: Check console for "✅ Server startup complete!" message
6. Access endpoints:
   - Health check: http://localhost:8001/health
   - API docs: http://localhost:8001/docs
   - Observability dashboard: http://localhost:8001/observability/html

**Troubleshooting:**
- **Port conflict:** Check if port 8001 is in use: `netstat -ano | findstr :8001` (Windows) or `lsof -i :8001` (Mac/Linux)
- **Missing dependencies:** Run `pip install -r requirements.txt` if packages are missing
- **Environment variables:** Verify `.env` file exists with all required variables (see `anaia-api/app/core/config.py` for required fields)
- **Import errors:** Check Python path - ensure you're in `anaia-api` directory or PYTHONPATH includes it
- **Supabase connection:** Verify `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are correct
- **Redis connection:** Server will run without Redis, but session state won't persist (check logs for Redis warnings)
- **Multiple server instances:** If you see "Address already in use", stop all Python processes: `Get-Process python | Stop-Process` (Windows) or `pkill -f uvicorn` (Mac/Linux)

**Key Files:**
- Main app: `anaia-api/app/main.py` (FastAPI application)
- Configuration: `anaia-api/app/core/config.py` (Settings and environment variables)
- Environment: `anaia-api/.env` (Required: SUPABASE_URL, SUPABASE_SERVICE_KEY, SUPABASE_ANON_KEY, OPENROUTER_API_KEY)
- Requirements: `anaia-api/requirements.txt` (Python dependencies)
- Startup diagnostic: `anaia-api/diagnose_startup.py` (Run to diagnose startup issues)

**Common Commands:**
- Start with auto-reload: `python -m uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload`
- Start without reload: `python -m uvicorn app.main:app --host 0.0.0.0 --port 8001`
- Check health: `curl http://localhost:8001/health` or visit in browser
- View logs: Check terminal output for detailed logging (INFO level by default)

**Note:** The backend uses:
- FastAPI for the web framework
- LangGraph for the tutoring workflow
- Supabase for database persistence
- Redis for session state (optional but recommended)
- OpenRouter for multi-LLM orchestration
- Port 8001 for API endpoints

**Observability:**
- JSON endpoint: http://localhost:8001/observability (recent logs, errors, requests, stats)
- HTML dashboard: http://localhost:8001/observability/html (manual refresh button, no auto-refresh)

