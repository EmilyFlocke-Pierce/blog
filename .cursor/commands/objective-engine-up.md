Start the ARELI Objective Engine API server (areli-objective-engine/).

**Purpose:** Bring the Objective Engine API server up for development, testing, or director use.

**Quick Steps:**
1. Navigate to areli-objective-engine directory: `cd areli-objective-engine`
2. Check if server is already running on port 8005 (stop if needed)
3. Verify `.env` file exists with required environment variables:
   - `OPENROUTER_API_KEY` - OpenRouter API key for LLM access
   - Optional: `OPENROUTER_BASE_URL`, `DEFAULT_MODEL`, `ALLOWED_ORIGINS`, `LOG_LEVEL`
4. Start dev server: `python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8005`
5. Verify server: Check console for startup message and test health endpoint: http://localhost:8005/health
6. Access API docs: http://localhost:8005/docs

**Troubleshooting:**
- **Port conflict:** Check if port 8005 is in use: `netstat -ano | findstr :8005` (Windows) or `lsof -i :8005` (Mac/Linux)
- **Missing dependencies:** Run `pip install -r requirements.txt` if packages are missing
- **Environment variables:** Verify `.env` file exists with `OPENROUTER_API_KEY` (see `areli-objective-engine/app/core/config.py` for required fields)
- **Import errors:** Check Python path - ensure you're in `areli-objective-engine` directory or PYTHONPATH includes it
- **Multiple server instances:** If you see "Address already in use", stop all Python processes: `Get-Process python | Stop-Process` (Windows) or `pkill -f uvicorn` (Mac/Linux)

**Key Files:**
- Main app: `areli-objective-engine/app/main.py` (FastAPI application)
- Configuration: `areli-objective-engine/app/core/config.py` (Settings and environment variables)
- Environment: `areli-objective-engine/.env` (Required: OPENROUTER_API_KEY)

**API Endpoints (Director-only):**
- **POST** `/api/objective-engine/runs` — Create new run from info-dump
- **GET** `/api/objective-engine/runs/:id` — Get run detail
- **POST** `/api/objective-engine/runs/:id/sign-off` — Director sign-off
- **GET** `/api/objective-engine/runs?status=pending_review` — List runs
- **GET** `/health` — Health check

**Note:** Runs are in-memory (no database). Service restarts will clear all runs.
