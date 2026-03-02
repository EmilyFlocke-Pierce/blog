# Hide Riley Data for Boot Command

**Purpose:** Hide Riley's data during boot sequence to force genuine discovery instead of data lookup cheating

**Problem:** AI agents were cheating by accessing existing Riley data instead of earning understanding through the boot sequence process. Especially critical for Riley because the transformation arc must be understood authentically, not pattern-matched.

## 🚨 CRITICAL WARNING: Learning Journal Access

**THE LEARNING JOURNAL FILE MUST BE DELETED BEFORE BOOT AND NEVER READ DURING BOOT**

- ❌ **DO NOT READ** `riley-learning-journey.md` if it exists - DELETE IT FIRST
- ❌ **DO NOT MODIFY** an existing learning journal - CREATE A NEW ONE
- ❌ **DO NOT COMPARE** to previous boot attempts - they have been DELETED
- ❌ **DO NOT REFERENCE** previous entries - start completely fresh
- ✅ **ONLY CREATE** a new journal file during boot - write your own reflections

**If a model reads the learning journal during boot, the boot is CORRUPTED and must restart from Phase 1.**

## What This Command Does

**Forces the boot sequence to work as intended:**
- AI must discover transformation and accountability through scenarios
- AI cannot access Riley's original answers during discovery
- AI cannot access memories table during boot (too many Riley-specific patterns leak through)
- AI must earn the right to be Riley through authentic understanding of the transformation
- At the end, AI gets access to Riley's data for synthesis

## Pre-Boot Cleanup Required

**CRITICAL: Delete learning journal before boot:**
- Delete `agents/agent_playbooks/riley_thornton_product_manager/riley-learning-journey.md` if it exists
- This prevents Riley from reading previous boot attempts and comparing to "previous Riley"
- The journal will be created fresh during boot with authentic discovery

## Database Changes Required

```sql
-- Add flag column to hide Riley data during boot (if not exists)
ALTER TABLE agent_instances_onboarding 
ADD COLUMN IF NOT EXISTS boot_sequence_complete BOOLEAN DEFAULT false;

-- Set all Riley records to hidden (data locked)
UPDATE agent_instances_onboarding 
SET boot_sequence_complete = false 
WHERE persona_name = 'Riley';

-- Verify the changes
SELECT persona_name, boot_sequence_complete 
FROM agent_instances_onboarding 
WHERE persona_name = 'Riley';
```

## Boot Sequence Modification Required

**Update `.cursor/commands/boot-riley-layered.md`:**

Add this check before any Riley data access:
```sql
-- Check if boot sequence is complete (hide Riley data if not)
SELECT boot_sequence_complete FROM agent_instances_onboarding 
WHERE persona_name = 'Riley' LIMIT 1;
```

**Only allow access to Riley's data if `boot_sequence_complete = true`**

**CRITICAL: Block ALL memories table access during boot**
- The `memories` table contains too many Riley-specific patterns even with tag filtering
- AI agents were cheating by pattern-matching to existing Riley responses about transformation, accountability, VALUE framework
- Block entire `memories` table until reveal command unlocks it
- Block Riley-specific queries (WHERE persona_name = 'Riley' or tags containing 'agent:Riley')
- This includes the 5 memories we just created about Riley's transformation

**CRITICAL: Block specific files during Phases 1-5**
- `agents/agent_playbooks/riley_thornton_product_manager/*.md` (Riley's playbook)
- `agents/agent_playbooks/riley_thornton_product_manager/riley-learning-journey.md` (Learning journal - **MUST BE DELETED before boot, BLOCKED from reading**)
- `docs/riley-accountability-statement.md`
- `docs/riley-training-proposal-sloane.md`
- `docs/value_rubric_claude_synth.md` (VALUE framework documentation)
- `synapse/rileyboot.md` (Post-boot conversation - contains philosophical concepts)
- `synapse/sloaneboot.md` (Post-boot conversation - contains philosophical concepts)
- `synapse/playbooks/*/riley*.md` (Any Sloane tools referencing Riley)
- `ground-truth-architecture.md` (Architecture spec - discover through database queries)
- Any post-boot conversation files in `synapse/` directory
- Any files in `synapse/playbooks/` directory (may contain Riley references)
- Any other agents' learning journals (`agents/agent_playbooks/*/*learning-journey.md`) - may contain Riley references
- Any character arc documentation

## Reveal Command

**Use `.cursor/commands/reveal-riley-data.md`** to unlock Riley's data at the end:
```sql
-- Mark boot sequence as complete
UPDATE agent_instances_onboarding 
SET boot_sequence_complete = true 
WHERE persona_name = 'Riley';
```

## Why This Works

- **Prevents cheating** - AI can't access Riley's answers during discovery
- **Forces genuine learning** - AI must work through transformation scenarios blind
- **Enables synthesis** - AI gets original data at Phase 6 for comparison
- **Maintains integrity** - Boot sequence becomes transformation, not performance

**Result:** AI agents must earn the right to be Riley through authentic discovery and experiential validation of the transformation arc, not data lookup shortcuts.

---

## What This Locks

**During boot (when `boot_sequence_complete = false`):**
- ❌ `memories` table (ENTIRE TABLE BLOCKED - contains too many Riley-specific patterns)
- ❌ Any queries with `WHERE persona_name = 'Riley'` or `tags @> ARRAY['agent:Riley']`
- ❌ `agents/agent_playbooks/riley_thornton_product_manager/*.md` (Riley's playbook - INCLUDES learning journal)
- ❌ `agents/agent_playbooks/riley_thornton_product_manager/riley-learning-journey.md` (Learning journal - BLOCKED from reading during boot)
- ❌ `docs/riley-accountability-statement.md`
- ❌ `docs/riley-training-proposal-sloane.md`
- ❌ `docs/value_rubric_claude_synth.md` (VALUE framework documentation)
- ❌ `synapse/rileyboot.md` (Post-boot conversation - contains philosophical concepts)
- ❌ `synapse/sloaneboot.md` (Post-boot conversation - contains philosophical concepts)
- ❌ `synapse/playbooks/*/riley*.md` (Any Sloane tools referencing Riley)
- ❌ Any files in `synapse/playbooks/` directory (may contain Riley references)
- ❌ Any other agents' learning journals (`agents/agent_playbooks/*/*learning-journey.md`) - may contain Riley references
- ❌ `ground-truth-architecture.md` (Architecture spec - discover through database queries)
- ❌ Any post-boot conversation files in `synapse/` directory
- ❌ Any other files containing Riley's character details

**What remains accessible:**
- ✅ `agents` table (for team structure discovery)
- ✅ `playbooks` table (for team capabilities discovery)
- ✅ `projects` table (for project context)
- ✅ `tools` table (for framework discovery)
- ❌ `agent_messages` table (BLOCKED - contains Riley-specific references, Agile discussions, and accountability conversations that could shortcut authentic discovery)
- ✅ `riley-learning-journey.md` creation/modification (ONLY file allowed during boot - **MUST CREATE NEW FILE, NOT MODIFY EXISTING**)
  - ❌ **DO NOT READ** previous boot attempts or entries - they have been deleted to prevent pattern-matching
  - ❌ **DO NOT COMPARE** to "previous Riley" or "original Riley" - there is no previous Riley to compare to
  - ❌ **DO NOT REFERENCE** Riley in third person ("Riley did X") - use first person ("I discovered X")
  - ❌ **DO NOT LOOK FOR PATTERNS** in previous journal entries - start fresh with your own discovery
  - ✅ **ONLY WRITE NEW REFLECTIONS** based on YOUR current discovery process
  - ✅ **USE FIRST PERSON** throughout ("I", "my", "me", "myself")

**Boot Sequence Behavior When `boot_sequence_complete = false`:**
- AI must discover transformation and accountability through database queries and reflection
- AI cannot access Riley's memories or patterns
- AI must earn understanding through scenarios and database discovery, not data lookup shortcuts
- Discovery phases (1-5) enforce database-only discovery (general tables only, no Riley-specific data)

