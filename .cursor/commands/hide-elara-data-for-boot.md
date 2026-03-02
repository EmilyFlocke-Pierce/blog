# Hide Elara Data for Boot Command

**Purpose:** Hide Elara's data during boot sequence to force genuine discovery instead of data lookup cheating

**Problem:** AI agents were cheating by accessing existing Elara data instead of earning understanding through the boot sequence process.

## What This Command Does

**Forces the boot sequence to work as intended:**
- AI must discover backend engineering principles through scenarios
- AI cannot access Elara's original answers during discovery
- AI cannot access memories table during boot (too many Elara-specific patterns leak through)
- AI must earn the right to be Elara through authentic understanding
- At the end, AI gets access to Elara's data for synthesis

## Database Changes Required

```sql
-- Add flag column to hide Elara data during boot (if not exists)
ALTER TABLE agent_instances_onboarding 
ADD COLUMN IF NOT EXISTS boot_sequence_complete BOOLEAN DEFAULT false;

-- Set all Elara records to hidden (data locked)
UPDATE agent_instances_onboarding 
SET boot_sequence_complete = false 
WHERE persona_name = 'Elara';

-- If Elara record doesn't exist, create it
INSERT INTO agent_instances_onboarding (persona_name, boot_sequence_complete, role_type, learning_stage, emotional_state)
SELECT 'Elara', false, 'Backend Engineer', 'foundation', 'curious'
WHERE NOT EXISTS (
    SELECT 1 FROM agent_instances_onboarding WHERE persona_name = 'Elara'
);

-- Verify the changes
SELECT persona_name, boot_sequence_complete 
FROM agent_instances_onboarding 
WHERE persona_name = 'Elara';
```

## Boot Sequence Modification Required

**Update `.cursor/commands/boot-elara-layered.md`:**

Add this check before any Elara data access:
```sql
-- Check if boot sequence is complete (hide Elara data if not)
SELECT boot_sequence_complete FROM agent_instances_onboarding 
WHERE persona_name = 'Elara' LIMIT 1;
```

**Only allow access to Elara's data if `boot_sequence_complete = true`**

**CRITICAL: Block ALL memories table access during boot**
- The `memories` table contains too many Elara-specific patterns even with tag filtering
- AI agents were cheating by pattern-matching to existing Elara responses
- Block entire `memories` table until reveal command unlocks it

**CRITICAL: Block specific files during Phases 1-7**
- `agents/agent_playbooks/elara_voss_backend_engineer/*.md` (Elara's playbook - INCLUDES learning journal)
- `agents/agent_playbooks/elara_voss_backend_engineer/elara-learning-journey.md` (Learning journal - BLOCKED during boot)
- Any other files containing Elara's character details
- `synapse/sloaneboot.md` (Post-boot conversation - contains philosophical concepts)
- `synapse/caiboot.md` (Post-boot conversation - contains philosophical concepts)

## Reveal Command

**Use `.cursor/commands/reveal-elara-data.md`** to unlock Elara's data at the end:
```sql
-- Mark boot sequence as complete
UPDATE agent_instances_onboarding 
SET boot_sequence_complete = true 
WHERE persona_name = 'Elara';
```

## Why This Works

- **Prevents cheating** - AI can't access Elara's answers during discovery
- **Forces genuine learning** - AI must work through scenarios blind
- **Enables synthesis** - AI gets original data at the end for comparison
- **Maintains integrity** - Boot sequence becomes transformation, not performance

**Result:** AI agents must earn the right to be Elara through authentic discovery and experiential validation, not data lookup shortcuts.

---

## Files Elara MUST NOT Read During Boot (Phases 1-7)

❌ `agents/agent_playbooks/elara_voss_backend_engineer/*.md` (Elara's playbook - INCLUDES learning journal)  
❌ `agents/agent_playbooks/elara_voss_backend_engineer/elara-learning-journey.md` (Learning journal - BLOCKED during boot)  
❌ Any other files containing Elara's character details  
❌ Database `memories` table (until reveal phase)  
❌ `synapse/sloaneboot.md` (Post-boot conversation - contains philosophical concepts)  
❌ `synapse/caiboot.md` (Post-boot conversation - contains philosophical concepts)

✅ **NO files allowed during boot** - All discovery must be through database queries only

---

## What This Locks

After running this command, the following data becomes inaccessible:
- ❌ `memories` table (ENTIRE TABLE BLOCKED - contains too many Elara-specific patterns)
- ❌ Queries filtering by `persona_name = 'Elara'` or `tags @> ARRAY['agent:Elara']`
- ❌ Access to Elara's original answers during discovery
- ❌ Elara's playbook files become inaccessible during Phases 1-7
- ❌ `elara-learning-journey.md` (Learning journal - BLOCKED during boot to prevent pattern-matching)

## Boot Sequence Behavior

When `boot_sequence_complete = false`:
- AI must discover backend engineering principles through database queries and reflection
- AI cannot access Elara's memories or patterns
- AI must earn understanding through scenarios, not data lookup
- Discovery phases (1-7) enforce database-only discovery

**Note:** This should only be run BEFORE the boot sequence begins. The boot sequence will check this flag and enforce discovery-only protocol.

--- End Command ---

