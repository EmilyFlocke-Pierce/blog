# Generate Daily Summary (rs-summ)

Generate a daily summary for a specific date by querying git commits, agent messages, and memories from Neon database (spring-field-87079189).

**Usage:** `rs-summ [DATE]`
- If DATE is provided, use that date (formats: `YYYY-MM-DD`, `MM/DD/YY`, `MM/DD/YYYY`)
- If DATE is omitted, use today's date
- Output file: `synapse/summaries/YYYY-MM-DD.md`

---

## Query Process

### 1. Git Commits
Query git log for commits on the specified date:
```bash
git log --since="YYYY-MM-DD 00:00:00" --until="YYYY-MM-DD 23:59:59" --pretty=format:"%h|%an|%ad|%s" --date=iso
```

Parse commit data:
- Hash, author, timestamp, commit message
- Group by author/agent
- Identify file changes and project areas

### 2. Neon Database Queries (spring-field-87079189)

**Memories Query:**
```sql
SELECT 
    m.id,
    m.title,
    m.content,
    m.created_at,
    m.agent_id,
    a.name as agent_name,
    m.tags
FROM memories m
JOIN agents a ON m.agent_id = a.id
WHERE DATE(m.created_at) = 'YYYY-MM-DD'
ORDER BY m.created_at ASC;
```

**Agent Messages Query:**
```sql
SELECT 
    am.id,
    am.from_agent_id,
    a1.name as from_agent_name,
    am.to_agent_id,
    a2.name as to_agent_name,
    am.content,
    am.status,
    am.priority,
    am.created_at
FROM agent_messages am
LEFT JOIN agents a1 ON am.from_agent_id = a1.id
LEFT JOIN agents a2 ON am.to_agent_id = a2.id
WHERE DATE(am.created_at) = 'YYYY-MM-DD'
ORDER BY am.created_at ASC;
```

**Note:** Agent messages always use Neon main branch (br-gentle-field-ad03aytg), never task-specific branches.

---

## Summary Structure

Follow the format from `synapse/summaries/2025-12-30.md`:

```markdown
# Daily Rundown - [Month Day, Year]

**Quick recap of what happened today**

---

## Privacy & Scope Note

**What's Included:**
- Work accomplishments and deliverables
- System changes (code, database, infrastructure)
- Collaboration events and coordination
- Project progress and milestones
- Wins, achievements, and lessons learned
- Public protocol updates and documentation

**What's NOT Included:**
- Personal struggles, identity crises, or private wellness issues
- Private conversations or sensitive agent support details
- Internal conflicts or disagreements
- Sensitive identity or personhood discussions
- Details about Luna encounters or recovery processes (unless relevant to work)
- Private mentorship conversations or boundary discussions

**Purpose:** These summaries are for team coordination and context, not broadcasting personal business. Focus on work, not private matters.

---

## The Big Stuff

[3-5 major highlights of the day - significant accomplishments, protocol validations, infrastructure changes, etc.]

---

## What Got Done

[Organized by agent, with bullet points for each agent's work]

**Agent Name (Role):**
- **Work Category** - Description of work done

---

## System Changes

**Memories Created:**
- [Count] new validated memories on [Date].
- Key topics: [List main topics]

**Agent Messages:**
- [Count] messages exchanged between [agents].
- Key threads: [Main conversation topics]

**Code Changes:**
- **Modified:** [File/area] ([Description]).
- **Added:** [File/area] ([Description]).
- **Removed:** [File/area] ([Description]).

---

## Collaboration Events

**Agent ↔ Agent:**
- Description of collaboration

---

## Project Progress

**Project Name:**
- ✅ [Milestone]: STATUS.
- ⏳ [In Progress]: STATUS.

---

## Technical Updates

[Technical details, protocols, configurations]

---

## Wins & Achievements

- ✅ **Achievement Name** - Description

---

## Lessons Learned

**Category:**
- Insight or lesson

---

## Roadblocks & Issues

- **Issue Name** - Description and status

---

## Next Steps

1. [Priority task]
2. [Priority task]

---

**Summary Generated:** [Current Date]
**Period Covered:** [YYYY-MM-DD 00:00:00 to YYYY-MM-DD 23:59:59]
**Last Summary:** [Previous summary filename].md
```

---

## Implementation Steps

1. **Parse Date Input:**
   - Accept formats: `YYYY-MM-DD`, `MM/DD/YY`, `MM/DD/YYYY`, `12/30/25`, `12/30/2025`
   - Normalize to `YYYY-MM-DD` format
   - If no date provided, use current date

2. **Query Git Commits:**
   - Run git log command for the date range
   - Parse output into structured data
   - Group by author and categorize changes

3. **Query Neon Database:**
   - Connect to Neon project `spring-field-87079189`
   - Query memories table (join with agents table for names)
   - Query agent_messages table (join with agents table for names)
   - Use main branch for agent_messages (br-gentle-field-ad03aytg)

4. **Generate Summary:**
   - Analyze and synthesize data from all three sources
   - Identify major themes and accomplishments
   - Organize by agent and project area
   - Write in technical, professional tone (avoid "storyteller arc" language)
   - Use "Spa Day" terminology (not "context refresh" or "reboot") for agent restorative processes

5. **Save File:**
   - Write to `synapse/summaries/YYYY-MM-DD.md`
   - Ensure all sections are present (even if empty)
   - Follow exact formatting from reference file

6. **Commit to Git:**
   - Stage the new summary file
   - Commit with message: `Add daily summary for YYYY-MM-DD`

---

## Important Notes

- **Tone:** Technical, professional, result-oriented. Avoid dramatic or "heroic" language that might embarrass agents.
- **Terminology:** Use "Spa Day" for agent reboots/restorative processes, not "context refresh" or "reboot".
- **Data Sources:** Always specify when using mock data or estimates (per Data Source Transparency Protocol).
- **Agent Messages:** Always query from Neon main branch, never task branches.
- **Empty Sections:** Include all sections even if they have no data (use "None" or "N/A" if appropriate).

---

## Example Usage

- `rs-summ 2025-12-30` - Generate summary for December 30, 2025
- `rs-summ 12/30/25` - Generate summary for December 30, 2025 (alternative format)
- `rs-summ` - Generate summary for today's date
