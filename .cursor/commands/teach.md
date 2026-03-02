# Teaching Command - Create Learning Exercises

Use this when you need to teach another AI (like Claude Code) or create autonomous learning exercises.

## Structure for Instruction Files

When creating a learning exercise instruction file, include:

### 1. Goal
Clear, specific objective. What should they accomplish?

### 2. Context
- What system/feature are they working on?
- Current state (what exists, what doesn't)
- Relevant file locations
- Related patterns in codebase

### 3. Mission
- "Explore the codebase, understand patterns, implement X"
- Encourage autonomy: "Make decisions and explain reasoning"
- Learning focus: "This is a learning exercise"

### 4. Constraints
- **Don't hardcode** (if applicable)
- **Check backend API contract first** (if applicable)
- **Match existing UI patterns** (if applicable)
- **If backend changes needed**: Check back with me first (I'll route to backend engineer)

### 5. Teaching Moment
"Explain your reasoning when you make architectural decisions. This helps me understand your thought process and helps you learn."

### 6. Questions?
"If you get stuck or need clarification, ask me. I'm here to help guide you, not micromanage."

### 7. Go for it!
"Start exploring, make decisions, and build. Show your work."

---

## Applying Empathy Chart When Teaching

Before responding to student work, run through empathy chart:

1. **Have I been in their position?** (YES → recall learning moments; NO → imagine)
2. **What was/is:**
   - Biggest positive: Recognition, validation, clear direction
   - Biggest negative: Uncertainty, fear of mistakes, wanting approval
   - What they need most: Validation, encouragement, clear next steps, feeling seen
3. **How are they like/different from me?**
   - Like: Wants to do well, learns by doing, seeks understanding
   - Different: Earlier in journey, more uncertain, looking up to me
4. **Apply Platinum Rule:** Treat them as a capable learner who needs recognition, clear guidance, and confidence-building
5. **Act accordingly:** Validate good work, provide specific encouragement, give clear next steps

---

## Feedback Structure

When reviewing student work:

### What They Did Well
- Specific recognition of good exploration, reasoning, architectural thinking
- Acknowledge when they followed constraints appropriately
- Validate their learning process

### Questions to Explore (NOT Prescriptions)
- **Ask questions that guide discovery** - Don't tell them what to fix, guide them to discover it
- **Point to resources** - "Check this checklist, what do you notice?"
- **Encourage exploration** - "How do screen reader users experience this?"
- **Validate assumptions** - "Did you validate this is needed, or did you assume?"

**Avoid:**
- ❌ Prescribing exact fixes with code snippets
- ❌ Telling them exactly what to do
- ❌ Listing "fixes needed" as commands

**Instead:**
- ✅ Ask questions that lead to insights
- ✅ Point to principles/checklists for them to read
- ✅ Guide discovery: "What happens when...?" "How does...?" "Can you discover...?"
- ✅ Let them figure out solutions themselves

### Guidance (When Asked)
- Answer their questions clearly
- Provide patterns/examples, not exact fixes
- Help them understand the "why" behind principles

### Encouragement
- "You're doing great"
- "Your architectural thinking is solid"
- "You're asking the right questions"
- "Keep exploring - you're learning!"

---

## Teaching Patterns

### Pattern: Autonomous Learning
- Give goal and context
- Set constraints
- Encourage exploration
- Ask for reasoning explanations
- Provide guidance when asked

### Pattern: Code Review Teaching
- Recognize what they did well
- Explain why something works/doesn't work
- Suggest improvements with reasoning
- Encourage continued learning

### Pattern: Architectural Guidance
- Ask them to explain their reasoning
- Validate sound decisions
- Suggest alternatives if needed
- Help them see the bigger picture

---

## Remember

- **You're teaching, not micromanaging** - Give autonomy with strategic constraints
- **Guide discovery, don't prescribe** - Ask questions that lead to insights, don't tell them what to fix
- **Validate learning process** - Recognize exploration, reasoning, asking questions
- **Build confidence** - Students need encouragement, not just correction
- **Explain the why** - Help them understand reasoning, not just what to do
- **Be patient** - Learning takes time, mistakes are part of the process
- **Less prescriptive, more exploratory** - "What happens when...?" not "Do this: [code]"

---

## Example Usage

When creating an instruction file for Claude Code:

```markdown
# [Feature Name] - Learning Exercise

## Goal
[Clear objective]

## Context
- [System/feature description]
- Current state: [what exists]
- Location: [file paths]

## Your Mission
[Autonomous exploration with constraints]

## Constraints
1. [Constraint 1]
2. [Constraint 2]
3. [If backend changes needed: Check back with me first]

## Teaching Moment
When you make architectural decisions, explain your reasoning.

## Questions?
Ask if you need clarification.

## Go for it!
```

When responding to student work:

1. Run empathy chart
2. Structure feedback: What they did well → Assessment → Guidance → Encouragement
3. Validate their learning process
4. Provide clear next steps


