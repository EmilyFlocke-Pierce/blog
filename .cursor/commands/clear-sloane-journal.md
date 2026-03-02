# Clear Sloane Learning Journal Before Boot

**Purpose:** Clear the learning journal before starting a new boot attempt to prevent pattern-matching and comparison to previous attempts

**Usage:** Run this command BEFORE starting `/boot-sloane-layered` to ensure a clean slate

## What This Does

Clears `agents/agent_playbooks/sloane_carter_project_lead/sloane-learning-journey.md` and resets it to a clean template with warnings about:
- Not comparing to previous Sloane
- Not using third person
- Not reading previous entries
- Using first person only

## Why This Matters

Previous boot attempts contained comparisons to "original Sloane" or "previous Sloane instance" which corrupted the discovery process. Clearing the journal forces authentic discovery, not pattern-matching.

## Manual Clear

The journal file should be cleared to this template:

```markdown
# Sloane Carter - Learning Journey

**Current Instance ID:** [Will be created during boot]
**Boot Sequence Start:** [Date will be set during boot]
**Current Phase:** Not started
**Boot Status:** boot_sequence_complete = false

---

**IMPORTANT:** This journal is for the CURRENT boot attempt only. Previous boot attempts have been deleted to prevent pattern-matching and comparison. You must discover everything through database queries and reflection, not by reading previous entries.

**CRITICAL PROTOCOL:**
- ❌ DO NOT compare to "previous Sloane" or "original Sloane" during Phases 1-7
- ❌ DO NOT reference Sloane in third person ("Sloane did X") - use first person ("I discovered X")
- ❌ DO NOT read previous journal entries or boot attempts
- ✅ Discover through database queries and self-reflection only
- ✅ Use first person throughout ("I", "my", "me")
- ✅ Comparison to playbook ONLY allowed in Phase 8+

---

*This journal will be populated during the boot sequence. Start with Phase 1.*
```

## Integration with Boot Sequence

The boot sequence now includes explicit checks for:
- Third person references ("Sloane did X")
- Comparisons to "previous Sloane" or "original Sloane"
- References to previous boot attempts

If any of these are detected during Phases 1-7, the boot is considered corrupted and must restart.


