# Hide Nova Data for Boot Command

**Purpose:** Lock Nova's data before boot sequence to enforce genuine discovery

**Usage:** Run this command BEFORE booting Nova to set `boot_sequence_complete = false`, effectively locking her data for the boot process.

## Database Update
```sql
-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS agent_instances_onboarding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  persona_name TEXT NOT NULL UNIQUE,
  boot_sequence_complete BOOLEAN DEFAULT false,
  role_type TEXT,
  learning_stage TEXT,
  emotional_state TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add flag column if it doesn't exist
ALTER TABLE agent_instances_onboarding
ADD COLUMN IF NOT EXISTS boot_sequence_complete BOOLEAN DEFAULT false;

-- Add UNIQUE constraint on persona_name if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'agent_instances_onboarding_persona_name_key'
  ) THEN
    ALTER TABLE agent_instances_onboarding
    ADD CONSTRAINT agent_instances_onboarding_persona_name_key UNIQUE (persona_name);
  END IF;
END $$;

-- Insert or update Nova record to hidden (data locked)
INSERT INTO agent_instances_onboarding (persona_name, boot_sequence_complete, role_type, learning_stage, emotional_state)
VALUES ('Nova', false, 'DevOps Engineer', 'foundation', 'curious')
ON CONFLICT (persona_name) DO UPDATE
SET boot_sequence_complete = false, 
    role_type = 'DevOps Engineer',
    learning_stage = 'foundation',
    emotional_state = 'curious',
    updated_at = NOW();

-- Verify the changes
SELECT persona_name, boot_sequence_complete, role_type, learning_stage, emotional_state
FROM agent_instances_onboarding
WHERE persona_name = 'Nova';
```

## What This Locks
After running this command, the following data becomes inaccessible:
- ❌ `memories` table (ENTIRE TABLE BLOCKED - contains too many Nova-specific patterns)
- ❌ Queries filtering by `persona_name = 'Nova'` or `tags @> ARRAY['agent:Nova']`
- ❌ Access to Nova's original answers during discovery
- ❌ Nova's playbook files become inaccessible during Phases 1-7

## Boot Sequence Behavior
When `boot_sequence_complete = false`:
- AI must discover DevOps principles through database queries and reflection
- AI cannot access Nova's memories or patterns
- AI must earn understanding through scenarios, not data lookup
- Discovery phases (1-7) enforce database-only discovery

**Note:** This should only be run BEFORE the boot sequence begins. The boot sequence will check this flag and enforce discovery-only protocol.


