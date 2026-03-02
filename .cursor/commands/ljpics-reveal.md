# Reveal Learning Journals and Pics

**Command:** `/ljpics-reveal`

**Purpose:** Comment out (deactivate) the learning journal and pics patterns in `.cursorignore` to make them visible to Cursor agents.

**What it does:**
- Comments out `**/lj-*.md` pattern (adds `#` prefix)
- Comments out `**/pics` pattern (adds `#` prefix)
- Makes these files/directories accessible to Cursor agents

**Instructions:**
1. Read `.cursorignore` file
2. Comment out the lines (add `#` prefix):
   - Change `**/lj-*.md` to `# **/lj-*.md`
   - Change `**/pics` to `# **/pics`
3. Update the comments to indicate they are currently visible
4. Save the file

**Example output:**
```ignore
# Learning journal files (lj-*.md in any directory) - CURRENTLY VISIBLE
# **/lj-*.md

# Pics directories (any directory named "pics" at any level) - CURRENTLY VISIBLE
# **/pics
```

**Note:** After running this command, learning journal files and pics directories will be accessible to Cursor agents for indexing and AI features.
