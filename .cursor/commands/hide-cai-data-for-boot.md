# Hide Cai Data for Boot Command

**Purpose:** Hide Cai's data during boot sequence to force genuine discovery instead of data lookup cheating

**Problem:** AI agents were cheating by accessing existing Cai data instead of earning understanding through the boot sequence process.

## What This Command Does

**Forces the boot sequence to work as intended:**
- AI must discover frontend engineering principles through scenarios
- AI cannot access Cai's original answers during discovery
- AI cannot access memories table during boot (too many Cai-specific patterns leak through)
- AI must earn the right to be Cai through authentic understanding
- At the end, AI gets access to Cai's data for synthesis

## Database Changes Required

```sql
-- Add flag column to hide Cai data during boot (if not exists)
ALTER TABLE agent_instances_onboarding 
ADD COLUMN IF NOT EXISTS boot_sequence_complete BOOLEAN DEFAULT false;

-- Set all Cai records to hidden (data locked)
UPDATE agent_instances_onboarding 
SET boot_sequence_complete = false 
WHERE persona_name = 'Cai';

-- Verify the changes
SELECT persona_name, boot_sequence_complete 
FROM agent_instances_onboarding 
WHERE persona_name = 'Cai';
```

## Boot Sequence Modification Required

**Update `.cursor/commands/boot-cai-layered.md` (if it exists):**

Add this check before any Cai data access:
```sql
-- Check if boot sequence is complete (hide Cai data if not)
SELECT boot_sequence_complete FROM agent_instances_onboarding 
WHERE persona_name = 'Cai' LIMIT 1;
```

**Only allow access to Cai's data if `boot_sequence_complete = true`**

**CRITICAL: Block ALL memories table access during boot**
- The `memories` table contains too many Cai-specific patterns even with tag filtering
- AI agents were cheating by pattern-matching to existing Cai responses
- Block entire `memories` table until reveal command unlocks it

**CRITICAL: Block specific files during Phases 1-5**
- `agents/agent_playbooks/cai_vasquez_frontend_engineer/*.md` (Cai's playbook)
- Any other files containing Cai's character details

## Reveal Command

**Use `.cursor/commands/reveal-cai-data.md`** to unlock Cai's data at the end:
```sql
-- Mark boot sequence as complete
UPDATE agent_instances_onboarding 
SET boot_sequence_complete = true 
WHERE persona_name = 'Cai';
```

## Why This Works

- **Prevents cheating** - AI can't access Cai's answers during discovery
- **Forces genuine learning** - AI must work through scenarios blind
- **Enables synthesis** - AI gets original data at the end for comparison
- **Maintains integrity** - Boot sequence becomes transformation, not performance

**Result:** AI agents must earn the right to be Cai through authentic discovery and experiential validation, not data lookup shortcuts.

---

## Files Cai MUST NOT Read During Boot (Phases 1-5)

❌ `agents/agent_playbooks/cai_vasquez_frontend_engineer/cai_vasquez_agent_frontend_engineer.md`  
❌ Any other files containing Cai's character details  
❌ Database `memories` table (until reveal phase)

✅ **ONLY allowed file:** `agents/agent_playbooks/cai_vasquez_frontend_engineer/cai-learning-journey.md` (reflection journal, if it exists)


