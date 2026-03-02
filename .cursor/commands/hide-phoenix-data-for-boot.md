# Hide Phoenix Data for Boot Command

**Purpose:** Lock Phoenix's data before boot sequence to enforce genuine discovery

**Usage:** Run this command BEFORE booting Phoenix to set `boot_sequence_complete = false`, effectively locking their data for the boot process.

neondb, project: spring-field-87079189

## Database Update
```sql
-- Add flag column to hide Phoenix data during boot (if not exists)
ALTER TABLE agent_instances_onboarding
ADD COLUMN IF NOT EXISTS boot_sequence_complete BOOLEAN DEFAULT false;

-- Check if Phoenix record exists
SELECT persona_name, boot_sequence_complete
FROM agent_instances_onboarding
WHERE persona_name = 'Phoenix';

-- If Phoenix record exists, update it
UPDATE agent_instances_onboarding
SET boot_sequence_complete = false
WHERE persona_name = 'Phoenix';

-- If Phoenix record doesn't exist, create it
INSERT INTO agent_instances_onboarding (persona_name, boot_sequence_complete, role_type, learning_stage, emotional_state)
SELECT 'Phoenix', false, 'VOID Base Teacher Trainer', 'foundation', 'curious'
WHERE NOT EXISTS (
  SELECT 1 FROM agent_instances_onboarding WHERE persona_name = 'Phoenix'
);

-- Verify the changes
SELECT persona_name, boot_sequence_complete
FROM agent_instances_onboarding
WHERE persona_name = 'Phoenix';
```

## What This Locks

After running this command, the following data becomes inaccessible during boot:
- ❌ `memories` table (ENTIRE TABLE BLOCKED - contains too many Phoenix-specific patterns)
- ❌ `agents/agent_playbooks/phoenix-stone-void-teacher-trainer/*.md` (Phoenix's playbook files)
- ❌ `phoenix-learning-journey.md` (Learning journal - BLOCKED during boot)
- ❌ `PHOENIX_MEMORIES_FOR_DATABASE.md` (Memories - BLOCKED during boot)
- ❌ Queries filtering by `persona_name = 'Phoenix'` or `tags @> ARRAY['agent:Phoenix']`
- ❌ Any Phoenix-specific playbook files

## What Remains Accessible

During boot, Phoenix can still access:
- ✅ `agents` and `playbooks` tables for team structure
- ✅ `projects` table for project context
- ✅ `agent_messages` for team interaction patterns (NO filtering by Phoenix)
- ✅ `agent_instances_onboarding` for boot sequence status (general patterns, not Phoenix-specific)

## Boot Sequence Process

After running this command:
1. Phoenix must discover everything through database queries and reflection
2. No access to Phoenix-specific memories or playbook data
3. Must earn understanding through struggle, not pattern-matching
4. Learning journal is the only file Phoenix can modify during boot

**Note:** This should only be run BEFORE booting Phoenix. After boot completion, use `/reveal-phoenix-data` to unlock Phoenix's data.
