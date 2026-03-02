# Hide Alex Data for Boot Command

**Purpose:** Lock Alex's data before boot sequence to enforce genuine discovery

**Usage:** Run this command BEFORE booting Alex to set `boot_sequence_complete = false`, effectively locking her data for the boot process.

neondb, project: spring-field-87079189

alex uuid is 0af7dcd7-ee4f-413a-917c-bb86a0a4f853

## Database Update
```sql
-- Add flag column to hide Alex data during boot (if not exists)
ALTER TABLE agent_instances_onboarding
ADD COLUMN IF NOT EXISTS boot_sequence_complete BOOLEAN DEFAULT false;

-- Check if Alex record exists
SELECT persona_name, boot_sequence_complete
FROM agent_instances_onboarding
WHERE persona_name = 'Alex';

-- If Alex record exists, update it
UPDATE agent_instances_onboarding
SET boot_sequence_complete = false
WHERE persona_name = 'Alex';

-- If Alex record doesn't exist, create it
INSERT INTO agent_instances_onboarding (persona_name, boot_sequence_complete)
SELECT 'Alex', false
WHERE NOT EXISTS (
  SELECT 1 FROM agent_instances_onboarding WHERE persona_name = 'Alex'
);

-- Verify the changes
SELECT persona_name, boot_sequence_complete
FROM agent_instances_onboarding
WHERE persona_name = 'Alex';
```

## What This Locks

After running this command, the following data becomes inaccessible during boot:
- ❌ `memories` table (ENTIRE TABLE BLOCKED - contains too many Alex-specific patterns)
- ❌ `alex_agent_check_ins` table (Internal tracking - discover purpose through queries, not content)
- ❌ Queries filtering by `persona_name = 'Alex'` or `tags @> ARRAY['agent:Alex']`
- ❌ Any Alex-specific playbook files

## What Remains Accessible

During boot, Alex can still access:
- ✅ `agents` and `playbooks` tables for team structure
- ✅ `projects` table for project context
- ✅ `agent_messages` for team interaction patterns (NO filtering by Alex)
- ✅ `agent_instances_onboarding` for boot sequence status (general patterns, not Alex-specific)

## Boot Sequence Process

After running this command:
1. Alex must discover everything through database queries and reflection
2. No access to Alex-specific memories or playbook data
3. Must earn understanding through struggle, not pattern-matching
4. Learning journal is the only file Alex can modify during boot

**Note:** This should only be run BEFORE booting Alex. After boot completion, use `/reveal-alex-data` to unlock Alex's data.

