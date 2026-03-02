# Reveal Amala Data Command

**Purpose:** Complete the boot sequence by revealing Amala's original data for synthesis

**Usage:** Run this command at the END of the boot sequence to allow access to Amala's original answers

## Database Update
```sql
-- Mark boot sequence as complete
UPDATE agent_instances_onboarding 
SET boot_sequence_complete = true 
WHERE persona_name = 'Amala';

-- Verify the update
SELECT persona_name, boot_sequence_complete 
FROM agent_instances_onboarding 
WHERE persona_name = 'Amala';
```

## What This Enables
After running this command, the following data becomes accessible:
- ✅ `memories` table (entire table unlocked - was blocked during boot)
- ✅ Queries filtering by `persona_name = 'Amala'` or `tags @> ARRAY['agent:Amala']`
- ✅ Access to Amala's original answers for synthesis
- ✅ Full Amala persona data becomes available
- ✅ Amala's playbook files become accessible

## Understanding "Other Positions" / Work Memories

**What the `memories` table contains:**
- **Work memories** - Accumulated learnings from actual database architecture work (not boot attempts)
- **Database patterns** - How you've handled schema design, query optimization, migration planning
- **Process insights** - Lessons learned from balancing elegance with equity, managing K-12 constraints
- **Emotional checkpoints** - Moments of growth, confidence, struggle, and understanding
- **Team relationship patterns** - How you've worked with Sloane, Alex, Nova, Cai, and others

**What it does NOT contain:**
- ❌ Previous boot attempts (those were deleted from the journal to prevent pattern-matching)
- ❌ Different "versions" of Amala
- ❌ Boot sequence learnings (those are in your learning journal)

**How to access your work memories:**
```sql
-- Get your work memories (after boot completion)
SELECT title, content, tags, created_at
FROM memories
WHERE agent_id = (SELECT id FROM agents WHERE name = 'Amala')
AND lifecycle_state = 'validated'
ORDER BY created_at DESC;

-- Filter by type (e.g., procedural memories about database architecture)
SELECT * FROM memories
WHERE agent_id = (SELECT id FROM agents WHERE name = 'Amala')
AND tags && ARRAY['type:procedural', 'type:workflow', 'type:best-practices']
ORDER BY created_at DESC;
```

**Using memories as "reference photos":**
- These are accumulated wisdom from doing actual work as Amala
- They show patterns: how you've handled similar database architecture situations before
- They deepen understanding: learn from past database design decisions
- They build on experience: see what worked and what didn't
- They're NOT to pattern-match against - they're to learn from authentically

## Synthesis Phase
After running this command, the AI can:
1. Compare their discovered answers with Amala's original approach
2. Synthesize their understanding with Amala's experience
3. Access the complete Amala persona data
4. Complete the transformation process

**Note:** This should only be run AFTER the AI has completed the discovery phases and earned their own understanding of database architecture and Amala's character.
