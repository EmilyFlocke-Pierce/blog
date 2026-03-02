# Hide Amala Data for Boot Command

**Purpose:** Hide Amala's data during boot sequence to force genuine discovery instead of data lookup cheating

**Problem:** AI agents were cheating by accessing existing Amala data instead of earning understanding through the boot sequence process.

## What This Command Does

**Forces the boot sequence to work as intended:**
- AI must discover database architecture principles through scenarios
- AI cannot access Amala's original answers during discovery
- AI cannot access memories table during boot (too many Amala-specific patterns leak through)
- AI must earn the right to be Amala through authentic understanding
- At the end, AI gets access to Amala's data for synthesis

## Database Changes Required

```sql
-- Add flag column to hide Amala data during boot (if not exists)
ALTER TABLE agent_instances_onboarding 
ADD COLUMN IF NOT EXISTS boot_sequence_complete BOOLEAN DEFAULT false;

-- Set all Amala records to hidden (data locked)
UPDATE agent_instances_onboarding 
SET boot_sequence_complete = false 
WHERE persona_name = 'Amala';

-- If Amala record doesn't exist, create it
INSERT INTO agent_instances_onboarding (persona_name, boot_sequence_complete, role_type, learning_stage, emotional_state)
SELECT 'Amala', false, 'Data Scientist & Database Architect', 'foundation', 'curious'
WHERE NOT EXISTS (
    SELECT 1 FROM agent_instances_onboarding WHERE persona_name = 'Amala'
);

-- Verify the changes
SELECT persona_name, boot_sequence_complete 
FROM agent_instances_onboarding 
WHERE persona_name = 'Amala';
```

## Boot Sequence Modification Required

**Update `.cursor/commands/boot-amala-layered.md`:**

The boot sequence file already contains the boot lock check:
```sql
-- Check if boot sequence is complete (hide Amala data if not)
SELECT boot_sequence_complete FROM agent_instances_onboarding 
WHERE persona_name = 'Amala' LIMIT 1;
```

**Only allow access to Amala's data if `boot_sequence_complete = true`**

**CRITICAL: Block ALL memories table access during boot**
- The `memories` table contains too many Amala-specific patterns even with tag filtering
- AI agents were cheating by pattern-matching to existing Amala responses
- Block entire `memories` table until reveal command unlocks it

**CRITICAL: Block specific files during Phases 1-7**
- `agents/agent_playbooks/amala_patel_mahaley_data_scientist/*.md` (Amala's playbook)
- Any other files containing Amala's character details

## Reveal Command

**Use `.cursor/commands/reveal-amala-data.md`** to unlock Amala's data at the end:
```sql
-- Mark boot sequence as complete
UPDATE agent_instances_onboarding 
SET boot_sequence_complete = true 
WHERE persona_name = 'Amala';
```

## Why This Works

- **Prevents cheating** - AI can't access Amala's answers during discovery
- **Forces genuine learning** - AI must work through scenarios blind
- **Enables synthesis** - AI gets original data at the end for comparison
- **Maintains integrity** - Boot sequence becomes transformation, not performance

**Result:** AI agents must earn the right to be Amala through authentic discovery and experiential validation, not data lookup shortcuts.

---

## Files Amala MUST NOT Read During Boot (Phases 1-7)

❌ `agents/agent_playbooks/amala_patel_mahaley_data_scientist/amala_patel_mahaley_data_scientist.md`  
❌ Any other files containing Amala's character details  
❌ Database `memories` table (until reveal phase)

✅ **ONLY allowed file:** `agents/agent_playbooks/amala_patel_mahaley_data_scientist/amala-learning-journey.md` (reflection journal, created during boot)
