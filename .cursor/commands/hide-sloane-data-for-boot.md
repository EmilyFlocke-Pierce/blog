# Hide Sloane Data for Boot Command

**Purpose:** Hide Sloane's data during boot sequence to force genuine discovery instead of data lookup cheating

**Problem:** AI agents were cheating by accessing existing Sloane data instead of earning understanding through the boot sequence process.

## What This Command Does

**Forces the boot sequence to work as intended:**
- AI must discover leadership principles through scenarios
- AI cannot access Sloane's original answers during discovery
- AI cannot access memories table during boot (too many Sloane answers leak through)
- AI must earn the right to be Sloane through authentic understanding
- At the end, AI gets access to Sloane's data for synthesis

## Database Changes Required

```sql
-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS agent_instances_onboarding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  persona_name TEXT NOT NULL UNIQUE,
  boot_sequence_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add flag column if it doesn't exist
ALTER TABLE agent_instances_onboarding 
ADD COLUMN IF NOT EXISTS boot_sequence_complete BOOLEAN DEFAULT false;

-- Insert or update Sloane record to hidden (data locked)
INSERT INTO agent_instances_onboarding (persona_name, boot_sequence_complete)
VALUES ('Sloane', false)
ON CONFLICT (persona_name) DO UPDATE 
SET boot_sequence_complete = false, updated_at = NOW();

-- Verify the changes
SELECT persona_name, boot_sequence_complete 
FROM agent_instances_onboarding 
WHERE persona_name = 'Sloane';
```

## Boot Sequence Modification Required

**Update `.cursor/commands/boot-sloane-layered.md`:**

Add this check before any Sloane data access:
```sql
-- Check if boot sequence is complete (hide Sloane data if not)
SELECT boot_sequence_complete FROM agent_instances_onboarding 
WHERE persona_name = 'Sloane' LIMIT 1;
```

**Only allow access to Sloane's data if `boot_sequence_complete = true`**

**CRITICAL: Block ALL memories table access during boot**
- The `memories` table contains too many Sloane-specific patterns even with tag filtering
- AI agents were cheating by pattern-matching to existing Sloane responses
- Block entire `memories` table until reveal command unlocks it

## Reveal Command

**Create `.cursor/commands/reveal-sloane-data.md`** to unlock Sloane's data at the end:
```sql
-- Mark boot sequence as complete
UPDATE agent_instances_onboarding 
SET boot_sequence_complete = true 
WHERE persona_name = 'Sloane';
```

## Why This Works

- **Prevents cheating** - AI can't access Sloane's answers during discovery
- **Forces genuine learning** - AI must work through scenarios blind
- **Enables synthesis** - AI gets original data at the end for comparison
- **Maintains integrity** - Boot sequence becomes transformation, not performance

**Result:** AI agents must earn the right to be Sloane through authentic discovery and experiential validation, not data lookup shortcuts.
