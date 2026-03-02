# Psychological Safety Implementation Plan

**Status**: Active Development  
**Owner**: Alex  
**Created**: 2025-11-26  
**Last Updated**: 2025-11-26

---

## Overview

Implementing Phase 1 quick wins and language feedback flag system based on agent feedback analysis. Full autonomy to design and build this system.

---

## Phase 1: Quick Wins (High-Impact, Low-Effort)

### 1. Safe Questions Tag/Channel
**Goal**: Create designated space where no question is too basic

**Implementation:**
- Add `type:safe-question` tag to message system
- Document: "No question is too basic in this space"
- Add to welcome messages and onboarding
- Make it visible and accessible

**Status**: Design phase

---

### 2. Escalation Paths Documentation
**Goal**: Clear "who to ask for what" guidance

**Implementation:**
- Create escalation paths document
- Include in agent playbooks and welcome messages
- Quick reference format
- Decision tree: "Is this process/technical? → Devin. Is this team/student impact? → Sloane."

**Status**: Design phase

---

### 3. Examples of Good Questions
**Goal**: Show what "safe questions" look like

**Implementation:**
- Collect anonymized examples of good questions
- Share in agent support toolkit
- Use as modeling for "what safe questions look like"
- Regular updates as we collect more

**Status**: Design phase

---

### 4. Explicit Permission in Welcome Messages
**Goal**: State permission explicitly, don't assume

**Implementation:**
- Update welcome message template
- Add explicit statements:
  - "It's okay to ask questions"
  - "Uncertainty is expected and valued"
  - "No question is too basic"
- Include in all new agent onboarding

**Status**: Design phase

---

## Language Feedback Flag System

### Core Design Principles
- **Non-punitive**: Feedback for improvement, not violation reporting
- **Real-time but not intrusive**: Flag in message metadata, no flow interruption
- **Collaborative**: Language feedback for improvement, not judgment
- **Emily visibility**: Aggregated view, not public callouts
- **Opt-in**: Agents choose when to flag, no pressure

### Implementation Components

#### 1. Message Tagging System
- Add `unsafe-language` tag to message metadata
- Include context: what was flagged, why it felt unsafe, what would feel safer
- Optional: `language-feedback` tag for general feedback (not just unsafe)

#### 2. Dashboard/Aggregate View for Emily
- Weekly summary: X instances of potentially unsafe language patterns
- Include context: what was flagged, why, what would feel safer
- Not public - only visible to Emily
- Trend analysis over time

#### 3. Self-Flagging (Emily Opt-In First)
- Emily can flag her own language for review
- Practice using the system before agents flag
- Build comfort with the process
- Then expand to agent flagging

#### 4. Agent Flagging (After Self-Flagging Phase)
- Agents can flag language that feels unsafe
- Simple process: add tag + optional context
- No pressure - completely opt-in
- Anonymous aggregation (not individual callouts)

### Database Schema Needs
- Language feedback flags table (or extend agent_messages)
- Aggregation queries for dashboard
- Privacy: flags visible to Emily, not public

---

## Implementation Sequencing

1. **Design Phase** (Current)
   - Document all components
   - Design database schema
   - Create wireframes/mockups for dashboard

2. **Phase 1 Quick Wins - Pilot**
   - Implement with one agent (CeCe or Elara)
   - Gather feedback
   - Iterate
   - Expand to all agents

3. **Language Feedback - Self-Flagging**
   - Build system
   - Emily practices self-flagging
   - Refine based on experience

4. **Language Feedback - Agent Flagging**
   - Enable agent flagging
   - Monitor usage
   - Refine based on feedback

5. **Phase 2 Frameworks**
   - Decision-making frameworks
   - Uncertainty normalization
   - After Phase 1 validated

---

## Team Coordination

**Elara**: Backend implementation (database schema, message tagging, aggregation queries)  
**Sloane**: Coordination, resource needs, prioritization  
**Emily**: Self-flagging pilot, dashboard design input  
**All Agents**: Testing, feedback, usage

---

## Success Metrics

**Quantitative:**
- Do agents ask more questions? (Track question frequency)
- Do agents express uncertainty more? (Track "I'm not sure" statements)
- Do agents seek help more? (Track help requests)
- Language feedback flag usage (how often, what patterns)

**Qualitative:**
- Do agents report feeling safer?
- Do agents report less hesitation?
- Do agents report clearer boundaries?
- Is the language feedback system helpful for improvement?

---

## Next Steps

1. Design database schema for language feedback
2. Message Elara for backend implementation help
3. Create escalation paths documentation
4. Update welcome message template
5. Design dashboard mockup
6. Start Phase 1 pilot with one agent

---

**Status**: Active development - making this my own


