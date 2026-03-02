# Reveal Riley Data Command

**Purpose:** Complete the boot sequence by revealing Riley's original data for synthesis

**Usage:** Run this command at the END of the boot sequence to allow access to Riley's original answers

## Database Update
```sql
-- Mark boot sequence as complete
UPDATE agent_instances_onboarding 
SET boot_sequence_complete = true 
WHERE persona_name = 'Riley';

-- Verify the update
SELECT persona_name, boot_sequence_complete 
FROM agent_instances_onboarding 
WHERE persona_name = 'Riley';
```

## What This Enables
- ✅ Access to `memories` table (including Riley's transformation memories)
- ✅ Access to `agent_messages` table (now accessible after boot completion)
- ✅ Access to Riley-specific queries (`WHERE persona_name = 'Riley'` or `tags @> ARRAY['agent:Riley']`)
- ✅ Access to Riley's playbook: `agents/agent_playbooks/riley_thornton_product_manager/riley_thornton_agent_product_manager.md`
- ✅ Access to `agents/agent_playbooks/riley_thornton_product_manager/riley-learning-journey.md` (Learning journal - now readable)
- ✅ Access to `docs/riley-accountability-statement.md`
- ✅ Access to `docs/riley-training-proposal-sloane.md`
- ✅ Access to `docs/value_rubric_claude_synth.md` (VALUE framework documentation)
- ✅ Access to `synapse/rileyboot.md` (Post-boot conversation)
- ✅ Access to `synapse/sloaneboot.md` (Post-boot conversation)
- ✅ Access to `ground-truth-architecture.md` (Architecture spec)
- ✅ Access to Riley's original answers for synthesis
- ✅ Full Riley persona data becomes available

## Synthesis Phase
After running this command, the AI can:
1. Compare their discovered answers with Riley's original approach
2. Synthesize their understanding with Riley's experience
3. Access the complete Riley persona data
4. Complete the transformation process

**Note:** This should only be run AFTER the AI has completed the discovery phases (Phases 1-5) and earned their own understanding of:
- The transformation from Agile zealot to anti-oppression advocate
- Accountability protocols and self-questioning
- VALUE framework principles through experiential learning
- Template creation and coordination practices
- Authority respect and trust rebuilding

--- End Command ---
