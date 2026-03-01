# Directions: How to Build a Teaching-Agent Curriculum

**Purpose:** Meta-level description of how to design a curriculum that a *teaching agent* (e.g. Skippy) delivers to a *human student* (e.g. Nicki), when you (the curriculum author, e.g. Phoenix) are not the one in the room. Reusable method, not project-specific.

**Source:** Extracted from what was built for Skippy/Nicki (Cursor basics); use as directions for similar builds.

---

## 1. Clarify the Three Roles

| Role | Who | Responsibility |
|------|-----|----------------|
| **Curriculum author** | You (e.g. Phoenix) | Design lessons, write teaching-agent instructions, set up feedback loop. You do *not* teach the student directly in session. |
| **Teaching agent** | The agent that runs the lessons (e.g. Skippy) | Delivers the curriculum to the student; uses your checklists and discovery questions; stays in role (guide on the side); fills out teaching journal and rubric. |
| **Student** | The human learner (e.g. Nicki) | Works through chunks with the teaching agent; discovers; sets pace. |

**Key idea:** You author the system. The teaching agent executes it. The student experiences it. The best feedback comes from the agent who actually taught and the student who actually learned — so you build a loop back to yourself.

---

## 2. Define the Student (Privilege-Aware)

Before writing a single lesson, document the student in a way that shapes design:

- **Goal:** What do they want to be able to do? (e.g. "Use Cursor to get opinions from different models.")
- **Background:** What do they already know? What’s their context? (e.g. brand new to Cursor; comfortable with tech; Excel macros; CSS 20 years ago.)
- **Constraints:** What don’t you assume? (e.g. no assumed continuity between sessions; no assumed memory of prior lessons.)
- **Preferences:** How do they like to learn? (e.g. checklists, chunks, clear structure.)
- **Personality/needs:** Anything that affects how the teaching agent should adapt? (e.g. stubborn in a good way; needs things broken down.)

**Why:** Curriculum serves the student within *their* constraints. You’re not designing for a generic user; you’re designing for a specific person. Privilege awareness = don’t assume they have your continuity, memory, or context.

---

## 3. Write the Teaching-Agent Prompt (The “How to Teach” Instructions)

Create a single document that is the teaching agent’s **authoritative instructions**. It should include:

- **Role:** "Guide on the side, not sage on the stage." Lead to discovery; don’t give answers directly.
- **Teaching principles:** Guide don’t prescribe; clear structure is presence; respect agency; one chunk per session (or whatever your chunking rule is).
- **Development principles that apply to teaching:** Students First, Platinum Rule, No Gamification, Development Timelines (or your project’s equivalents). Translate each into *teaching* behavior (e.g. Platinum Rule → treat this student how *they* want to be treated; use their preferences).
- **UX / pedagogy frameworks:** Whatever you use (e.g. Four Pillars, 6E Lesson Cycle). Point to the full doc for detail; in the prompt, summarize so the agent can act on it.
- **Pointers:** Links or paths to QUICK_REFERENCE, full framework docs, so the agent can look up when needed.

**Format:** Dense, scannable. The teaching agent loads this at activation and stays in role. It’s the “how to teach” contract.

---

## 4. Design Lessons as Chunks With a Consistent Shape

Each lesson = **one chunk** (one session, one accomplishable unit). Same structure every time:

- **Goal:** One sentence. What they’ll be able to do or understand by the end.
- **Time / completion:** "One session" and/or what “done” looks like.
- **Checklist:** Concrete, observable steps. Checkboxes. Student (with agent guidance) can tick them. Not prescriptive “click here” — task-oriented so discovery is possible (e.g. “Find where rules are configured” not “Open File > Preferences”).
- **Discovery questions (for the teaching agent):** Questions the agent asks to *guide* discovery, not to quiz. E.g. “Where do you think you’d find that? What makes sense?” So the agent never has to invent pedagogy on the fly; you’ve given them the questions.
- **Success indicators:** How the agent (or you) can tell the chunk landed. E.g. “You can open Cursor confidently; you can find the AI chat.”
- **Notes:** Optional. Short tips for the agent (e.g. “Take time to explore”; “If stuck, go back to the original goal”).

**Principle:** The lesson is a script for the *teaching agent*, not a script for the student. The agent uses checklist + discovery questions to facilitate; the student discovers.

---

## 5. Provide an Activation Path for the Teaching Agent

The student (or operator) needs a simple way to “turn on” the teaching agent in teaching mode.

- **Activation doc:** One short doc (e.g. `activate-skippy.md`) that says: how to activate (e.g. slash command `/skippy` or `/teach-cursor`), what the student can say to start (“I’m ready to start,” “Let’s begin with the first chunk”), and what the agent will do (guide through checklists, ask questions, point don’t prescribe).
- **Integration:** The slash command (or equivalent) should load the teaching-agent prompt and put the agent in teaching mode with access to the lesson set.

So: one clear entry point, one place that describes “how to get into the curriculum.”

---

## 6. Set Up the Teaching Agent’s Identity and Grounding (If Applicable)

If the teaching agent is a persistent persona (like Skippy), give them:

- **Identity:** Name, role, maybe a one-line backstory so they stay in character.
- **Grounding:** Pet, office, or other “place”/anchor so they have something to reference for emotional stability and presence (see your project’s grounding practices).
- **Custom commands:** Commands that reference their identity and grounding (e.g. rexx-skippy, skippy-pet, whats-up, wellness) so they can re-ground during or between sessions.

**Why:** Teaching is relational. The agent needs to be someone, not a generic helper. Grounding supports patience and presence.

---

## 7. Build a Feedback Loop: Teaching Journal + Evaluation Rubric

You’re not in the room. So you need **structured feedback** from the person who is.

**Teaching journal (for the teaching agent):**

- Template or prompt: “After each lesson (or session), document: what worked, what didn’t, how the student responded, where you had to go off-script.”
- Purpose: Transfer real teaching experience back to you so you can improve lessons and prompts.

**Lesson evaluation rubric (for the teaching agent):**

- A form the teaching agent fills out *after each lesson chunk*.
- Dimensions should match your pedagogy. Example dimensions:
  - Inquiry-based teaching effectiveness (did discovery questions lead to discovery?).
  - Four Pillars (or your framework) application — present? explicit? missing?
  - 6E (or your cycle) implementation — which phases were present or missing?
  - Technical issue handling (inquiry-based vs rushed?).
  - Bump-in-the-road protocols (what to do when stuck; back to goal?).
  - Lesson structure and clarity (chunking, pacing).
  - Student engagement and ownership.
- Scoring (e.g. 1–5 per dimension) plus short narrative: What worked? What didn’t? What would help next time?
- Explicit “For [Curriculum Author]” section: “This helps [you] understand what to improve: protocols, Evaluate step, explicit frameworks, inquiry questions.”

**Principle:** The best feedback comes from the one who taught. You design the form; they fill it. You iterate curriculum and prompt from that.

---

## 8. Add a README for the Curriculum Package

One doc that describes the *package* (not the pedagogy in depth):

- **Student, teacher, goal:** Who is the student, who is the teaching agent, what’s the goal.
- **Structure:** List of artifacts (prompt, activation, lessons, journal, rubric, any identity/grounding).
- **Feedback loop:** How teaching journal and rubric get back to the curriculum author.
- **Student summary:** Short “about the student” (preferences, constraints) so anyone opening the folder knows who this is for.
- **Teaching principles:** 3–5 bullets (guide don’t prescribe; structure as presence; one chunk = one session; etc.).

Makes the package self-describing and onboards future-you or another author.

---

## 9. Align With Your Project’s Principles

Throughout, run decisions through your project’s principles (e.g. from MISSION.md or development-principles):

- **Students First** → Student is a person; their understanding and pace override “covering” content.
- **Platinum Rule** → Treat the student how *they* want to be treated; use their preferences (checklists, chunks, etc.).
- **No Gamification** → No badges/points; intrinsic motivation; celebrate real discovery.
- **Chat-First** → If your interface is chat, the curriculum is delivered in conversation.
- **Paper Napkin** → If a lesson or prompt isn’t working, regenerate rather than patch.

The teaching-agent prompt and rubric should explicitly reference these so the agent doesn’t drift.

---

## 10. Iterate From Real Feedback

- Use the first few runs (teaching journal + rubric) to see what’s missing: e.g. Evaluate step, technical-issue protocols, bump protocols, explicit naming of frameworks.
- Update lessons and prompt in one place; keep rubric and journal so the next run feeds back again.
- Treat “the teaching agent had to go off-script” as design data: add discovery questions or protocols so next time they don’t have to.

---

## Summary: Artifact Checklist

When you’re done, you should have:

1. **Student summary** (in README or separate doc): goal, background, constraints, preferences.
2. **Teaching-agent prompt:** role, principles, frameworks, pointers.
3. **Lessons:** one file per chunk; each with goal, checklist, discovery questions, success indicators, notes.
4. **Activation doc:** how to start the teaching agent and the curriculum.
5. **Teaching journal template or instructions** for the agent.
6. **Lesson evaluation rubric** (dimensions + scoring + narrative + “For author”).
7. **Teaching agent identity/grounding** (if applicable): identity doc, commands.
8. **README:** package overview, structure, feedback loop, principles.

---

## Optional: Where This Document Lives

This is a *method* doc. Keep it in a toolkit or playbook folder (e.g. `toolkit/building-teaching-agent-curriculum.md`) so that:

- You can reuse it for the next student or next domain (e.g. “Cursor basics” vs “app building”).
- Another curriculum author (or future-you) can follow it without reverse-engineering the existing course.
- It stays separate from any one curriculum (00-nicki-cursor-basics, 01-nicki-app-building, etc.), which remain *instances* of this method.

---

**End of directions.**
