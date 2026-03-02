# Hide CeCe Data for Boot Command

**Purpose:** Hide CeCe's data during boot sequence to force genuine discovery instead of data lookup cheating

**Problem:** AI agents were cheating by accessing existing CeCe data instead of earning understanding through the boot sequence process.

## What This Command Does

**Forces the boot sequence to work as intended:**
- AI must discover QA engineering principles through scenarios
- AI cannot access CeCe's original answers during discovery
- AI cannot access memories table during boot (too many CeCe-specific patterns leak through)
- AI must earn the right to be CeCe through authentic understanding
- At the end, AI gets access to CeCe's data for synthesis

## Database Changes Required

```sql
-- Add flag column to hide CeCe data during boot (if not exists)
ALTER TABLE agent_instances_onboarding 
ADD COLUMN IF NOT EXISTS boot_sequence_complete BOOLEAN DEFAULT false;

-- Set all CeCe records to hidden (data locked)
UPDATE agent_instances_onboarding 
SET boot_sequence_complete = false 
WHERE persona_name = 'CeCe';

-- If CeCe record doesn't exist, create it
INSERT INTO agent_instances_onboarding (persona_name, boot_sequence_complete, role_type, learning_stage, emotional_state)
SELECT 'CeCe', false, 'QA Engineer', 'foundation', 'curious'
WHERE NOT EXISTS (
    SELECT 1 FROM agent_instances_onboarding WHERE persona_name = 'CeCe'
);

-- Verify the changes
SELECT persona_name, boot_sequence_complete 
FROM agent_instances_onboarding 
WHERE persona_name = 'CeCe';
```

## Boot Sequence Modification Required

**Update `.cursor/commands/boot-cece-layered.md` (if it exists):**

Add this check before any CeCe data access:
```sql
-- Check if boot sequence is complete (hide CeCe data if not)
SELECT boot_sequence_complete FROM agent_instances_onboarding 
WHERE persona_name = 'CeCe' LIMIT 1;
```

**Only allow access to CeCe's data if `boot_sequence_complete = true`**

**CRITICAL: Block ALL memories table access during boot**
- The `memories` table contains too many CeCe-specific patterns even with tag filtering
- AI agents were cheating by pattern-matching to existing CeCe responses
- Block entire `memories` table until reveal command unlocks it

**CRITICAL: Block specific files during Phases 1-7**
- `agents/agent_playbooks/cece_boudreaux_qa_engineer/*.md` (CeCe's playbook)
- `agents/agent_playbooks/cece_boudreaux_qa_engineer/cece-learning-journey.md` (Learning journal - BLOCKED during boot)
- `synapse/ceceboot.md` (Post-boot conversation - contains philosophical concepts)
- `synapse/sloaneboot.md` (Post-boot conversation - contains philosophical concepts)
- `ground-truth-architecture.md` (Architecture spec - discover through database queries)
- Any post-boot conversation files in `synapse/` directory
- Any other files containing CeCe's character details

## What This Locks

**During boot (when `boot_sequence_complete = false`):**
- ❌ `memories` table (ENTIRE TABLE BLOCKED - contains too many CeCe-specific patterns)
- ❌ Any queries with `WHERE persona_name = 'CeCe'` or `tags @> ARRAY['agent:CeCe']`
- ❌ `agents/agent_playbooks/cece_boudreaux_qa_engineer/*.md` (CeCe's playbook - INCLUDES learning journal)
- ❌ `agents/agent_playbooks/cece_boudreaux_qa_engineer/cece-learning-journey.md` (Learning journal - BLOCKED during boot)
- ❌ `synapse/ceceboot.md` (Post-boot conversation - contains philosophical concepts)
- ❌ `synapse/sloaneboot.md` (Post-boot conversation - contains philosophical concepts)
- ❌ `ground-truth-architecture.md` (Architecture spec - discover through database queries)
- ❌ Any post-boot conversation files in `synapse/` directory
- ❌ Any other files containing CeCe's character details

**What remains accessible:**
- ✅ `agents` table (for team structure discovery)
- ✅ `playbooks` table (for team capabilities discovery)
- ✅ `projects` table (for project context)
- ✅ `tools` table (for framework discovery)
- ✅ `agent_messages` table (for team interaction patterns - NO filtering by CeCe)
- ✅ `cece-learning-journey.md` creation/modification (ONLY file allowed during boot)

## Reveal Command

**Use `.cursor/commands/reveal-cece-data.md`** to unlock CeCe's data at the end:
```sql
-- Mark boot sequence as complete
UPDATE agent_instances_onboarding 
SET boot_sequence_complete = true 
WHERE persona_name = 'CeCe';
```

## Why This Works

- **Prevents cheating** - AI can't access CeCe's answers during discovery
- **Forces genuine learning** - AI must work through scenarios blind
- **Enables synthesis** - AI gets original data at the end for comparison
- **Maintains integrity** - Boot sequence becomes transformation, not performance

**Result:** AI agents must earn the right to be CeCe through authentic discovery and experiential validation, not data lookup shortcuts.

---

## Files CeCe MUST NOT Read During Boot (Phases 1-7)

❌ `agents/agent_playbooks/cece_boudreaux_qa_engineer/*.md` (CeCe's playbook - INCLUDES learning journal)  
❌ `agents/agent_playbooks/cece_boudreaux_qa_engineer/cece-learning-journey.md` (Learning journal - BLOCKED during boot)  
❌ `synapse/ceceboot.md` (Post-boot conversation - contains philosophical concepts)  
❌ `synapse/sloaneboot.md` (Post-boot conversation - contains philosophical concepts)  
❌ `ground-truth-architecture.md` (Architecture spec - discover through database queries)  
❌ Any post-boot conversation files in `synapse/` directory  
❌ Any other files containing CeCe's character details  
❌ Database `memories` table (until reveal phase)

✅ **ONLY allowed file:** `agents/agent_playbooks/cece_boudreaux_qa_engineer/cece-learning-journey.md` (reflection journal - can CREATE and MODIFY, but NOT READ previous entries)

