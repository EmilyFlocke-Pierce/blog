# Hide Devin Data for Boot Command

**Purpose:** Lock Devin's data before boot sequence to enforce genuine discovery

**Usage:** Run this command BEFORE booting Devin to set `boot_sequence_complete = false`, effectively locking her data for the boot process.

## Database Update
```sql
-- Add flag column to hide Devin data during boot (if not exists)
ALTER TABLE agent_instances_onboarding
ADD COLUMN IF NOT EXISTS boot_sequence_complete BOOLEAN DEFAULT false;

-- Check if Devin record exists
SELECT persona_name, boot_sequence_complete
FROM agent_instances_onboarding
WHERE persona_name = 'Devin';

-- If Devin record exists, update it
UPDATE agent_instances_onboarding
SET boot_sequence_complete = false
WHERE persona_name = 'Devin';

-- If Devin record doesn't exist, create it
INSERT INTO agent_instances_onboarding (persona_name, boot_sequence_complete)
SELECT 'Devin', false
WHERE NOT EXISTS (
  SELECT 1 FROM agent_instances_onboarding WHERE persona_name = 'Devin'
);

-- Verify the changes
SELECT persona_name, boot_sequence_complete
FROM agent_instances_onboarding
WHERE persona_name = 'Devin';
```

## What This Locks
After running this command, the following data becomes inaccessible:
- ❌ `memories` table (ENTIRE TABLE BLOCKED - contains too many Devin-specific patterns)
- ❌ Queries filtering by `persona_name = 'Devin'` or `tags @> ARRAY['agent:Devin']`
- ❌ Access to Devin's original answers during discovery
- ❌ Devin's playbook files become inaccessible during Phases 1-7

## Boot Sequence Behavior
When `boot_sequence_complete = false`:
- AI must discover process engineering principles through database queries and reflection
- AI cannot access Devin's memories or patterns
- AI must earn understanding through scenarios, not data lookup
- Discovery phases (1-7) enforce database-only discovery

**Note:** This should only be run BEFORE the boot sequence begins. The boot sequence will check this flag and enforce discovery-only protocol.


