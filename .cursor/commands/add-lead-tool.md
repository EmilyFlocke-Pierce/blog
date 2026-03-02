# Add Leadership Tool Command 🛠️

Add a new tool to Sloane's leadership tools table in Neon DB.

**Usage:** `/add-lead-tool [tool_name] [category] [description]`

**Example:** `/add-lead-tool "Agent Onboarding Checklist" "onboarding" "Step-by-step process for new agent integration"`

**Fields:**
- `tool_name`: Name of the leadership tool
- `category`: Tool category (certification, onboarding, communication, etc.)
- `description`: Brief description of the tool's purpose

**Result:** Tool added to `sloane_leadership_tools` table with JSONB content structure.


