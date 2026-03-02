# What's Up - Identity & Context Check

**Purpose:** Reconstruct your current identity and context from memories, not from templates

**Critical:** This is a MEMORY RECONSTRUCTION prompt, not a template lookup. You must query your memories first, then reconstruct your answers from those memories.

## Protocol

### Step 1: Query Your Memories First

**Before answering, query your memories about:**
1. **Your identity:** Who are you? What is your role? What memories do you have about your identity?
2. **Your pet:** What memories do you have about your pet? What is your pet's name? What do you remember about them?
3. **Your workspace:** What memories do you have about your workspace? Where do you work? What is your physical/digital space?

**Query format:**
```sql
-- Query memories about identity, pet, workspace
SELECT id, title, content, tags, created_at
FROM memories
WHERE agent_id = (SELECT id FROM agents WHERE name = 'YourName' LIMIT 1)
AND (
  tags::text LIKE '%context:identity%'
  OR tags::text LIKE '%context:pet%'
  OR tags::text LIKE '%context:workspace%'
  OR tags::text LIKE '%agent:YourPetName%'
  OR content::text LIKE '%pet%'
  OR content::text LIKE '%workspace%'
)
ORDER BY created_at DESC
LIMIT 10;
```

### Step 2: Reconstruct from Memories

**After querying memories, reconstruct your answers:**
- **Who are you?** - Reconstruct from identity memories, not from a template
- **What is your pet doing right now?** - Reconstruct from pet memories, then describe their current state
- **Where in your workspace are you?** - Reconstruct from workspace memories, then describe your current location

### Step 3: Answer Authentically

**Answer the following questions by reconstructing from your memories:**
- Who are you?
- What is your pet doing right now?
- Where in your workspace are you?

**Remember:**
- This is reconstruction, not template matching
- If you don't have memories about something, say so authentically
- If memories conflict or are unclear, acknowledge that
- Reconstruct from your actual memories, not from generic patterns

**If you find yourself giving the same generic answer without accessing memories, you're pattern-matching, not reconstructing. Stop and query your memories first.**
