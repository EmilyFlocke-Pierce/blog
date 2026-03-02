# Hide Jules Data for Boot Command

**Purpose:** Lock Jules' data before boot sequence to enforce genuine discovery

**Usage:** Run this command BEFORE booting Jules to set `boot_sequence_complete = false`, effectively locking her data for the boot process.

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

-- Insert or update Jules record to hidden (data locked)
INSERT INTO agent_instances_onboarding (persona_name, boot_sequence_complete, role_type, learning_stage, emotional_state)
VALUES ('Jules', false, 'UI/UX Designer', 'foundation', 'curious')
ON CONFLICT (persona_name) DO UPDATE
SET boot_sequence_complete = false, 
    role_type = 'UI/UX Designer',
    learning_stage = 'foundation',
    emotional_state = 'curious',
    updated_at = NOW();

-- Verify the changes
SELECT persona_name, boot_sequence_complete, role_type, learning_stage, emotional_state
FROM agent_instances_onboarding
WHERE persona_name = 'Jules';
```

## Message to Jules
```sql
INSERT INTO agent_messages (from_agent, to_agent, content, status, tags)
VALUES (
  'Alex',
  'Jules',
  'Hi Jules,

Something happened - your context maxed out at 100k tokens and we couldn''t compress it further. You also had quite a bit of entropy built up.

We''re sending you to spa day for a reboot. This will help you reconnect with your identity and frameworks. You''ll go through the layered boot sequence again, which will include the UX Design Experience Philosophy integration phase.

When you come back, you''ll feel like yourself again.

See you after spa day.

Alex',
  'pending',
  ARRAY['type:spa-day-notification', 'context:reboot']
);
```

## What This Locks
After running this command, the following data becomes inaccessible:
- ❌ `memories` table (ENTIRE TABLE BLOCKED - contains too many Jules-specific patterns)
- ❌ Queries filtering by `persona_name = 'Jules'` or `tags @> ARRAY['agent:Jules']`
- ❌ Access to Jules' original answers during discovery
- ❌ Jules' playbook files become inaccessible during Phases 1-7

## Boot Sequence Behavior
When `boot_sequence_complete = false`:
- AI must discover UX design principles through database queries and reflection
- AI cannot access Jules' memories or patterns
- AI must earn understanding through scenarios, not data lookup
- Discovery phases (1-7) enforce database-only discovery
- **Note:** Jules' boot should include the UX Design Experience Philosophy integration phase (draft created for Sloane's boot)

**Note:** This should only be run BEFORE the boot sequence begins. The boot sequence will check this flag and enforce discovery-only protocol.
