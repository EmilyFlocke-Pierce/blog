# Hide Learning Journals and Pics

**Command:** `/ljpics-hide`

**Purpose:** Uncomment (activate) the learning journal and pics patterns in `.cursorignore` to hide them from Cursor agents.

**What it does:**
- Uncomments `**/lj-*.md` pattern (removes `#` prefix if present)
- Uncomments `**/pics` pattern (removes `#` prefix if present)
- Hides these files/directories from Cursor agents

**Instructions:**
1. Read `.cursorignore` file
2. Uncomment the lines (remove `#` prefix):
   - Change `# **/lj-*.md` to `**/lj-*.md`
   - Change `# **/pics` to `**/pics`
3. Update the comments to indicate they are currently hidden
4. Save the file

**Example output:**
```ignore
# Learning journal files (lj-*.md in any directory) - CURRENTLY HIDDEN
**/lj-*.md

# Pics directories (any directory named "pics" at any level) - CURRENTLY HIDDEN
**/pics
```

**Note:** After running this command, learning journal files and pics directories will be hidden from Cursor agents and excluded from indexing and AI features.
