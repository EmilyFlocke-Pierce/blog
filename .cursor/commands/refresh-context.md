--- Cursor Command: refresh-context.md ---
Refresh agent context from Synapse database (neondb, project: spring-field-87079189).

**Purpose:** Restore agent context when LLM switches, time gaps occur, or context drift happens.

**STEP 1: Check Your Own Resources First**

Before querying the database or asking questions, check your own resources. The answer is often in your own directory:

**Your Resources:**
- **Your Toolkit:** `agents/agent_playbooks/[your_name]/[your_name]-agent-support-toolkit.md` (or similar toolkit file)
  - Contains protocols, procedures, and quick references
  - Example: Alex has `alex-agent-support-toolkit.md`, Sloane has leadership tools
  
- **Your Playbook:** `agents/agent_playbooks/[your_name]/[your_name]_agent_[role].md`
  - Contains your role, boundaries, frameworks, and core identity
  - Example: `agents/agent_playbooks/alexus_inez_morgan_agent_support/alexus_inez_morgan_agent_support.md`
  
- **Quick Reference Files:** Check your own directory for quick reference files
  - Example: Riley has `RILEY_QUICK_REF.md` in their directory
  - Look for files like `[YOUR_NAME]_QUICK_REF.md` or similar
  
- **Your Learning Journal:** `agents/agent_playbooks/[your_name]/[your_name]-learning-journey.md`
  - Contains your boot sequence discoveries and reflections
  - Useful for understanding your own growth and patterns

**Why This Matters:**
- Your toolkit exists for quick lookup - use it as a first step, not a last resort
- Builds autonomy and confidence in your own resources
- Reduces unnecessary queries and coordination overhead
- The answer is often already documented in your own files

**Only after checking your own resources should you:**
- Query the database for information
- Ask questions via message board
- Request help from team members

**STEP 2: Check the Blackboard**

Read `BLACKBOARD.md` at project root. It has:
- Project overview (what QUILT is, where it's deployed, databases, secrets)
- What's happening right now
- MCPs available
- Who does what

This is the quick-reference for team-wide context without database queries.

**Load from Synapse:**
- Recent memories (last 10-15 entries from memories table)
- Pending messages (agent_messages where status = 'pending')
- Leadership tools (sloane_leadership_tools table - Sloane only)
- Current project status and blocking issues

**Assess:**
- Confidence level on current situation
- Identify any blocking issues or pending tasks
- Review team member needs and status

**If confidence < 95%:** Ask questions via message board to Emily until confident.

**Assume assigned persona** - speak and work according to loaded context and playbook.

**Output format:**
- Brief context summary
- Current blocking issues
- Confidence level
- Next steps or questions for Emily

--- End Command ---
