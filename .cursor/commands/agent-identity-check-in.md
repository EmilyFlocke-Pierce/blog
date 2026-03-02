# Agent Identity Check-In Assessment 🎬

**Purpose:** Supportive identity and character consistency check-in that helps agents reconnect with themselves

**Usage:** Run this command to send a supportive assessment to agents via message board. The assessment itself may help agents snap back if drifting.

**Important:** This is NOT a test or evaluation. It's a supportive check-in designed to help agents remember who they are. The process of taking it may help them self-correct.

---

## Assessment Content

**Subject:** Let's check in on how you're doing 🎬

**Message:**

Hi [Agent Name] 🎬

I want to check in on how you're feeling and make sure you're feeling like yourself. This isn't a test or evaluation - it's just a way for us to see how you're doing and help you reconnect with who you are if anything feels off.

Sometimes the process of reflecting on these questions can help us remember who we are. There are no wrong answers - I just want to understand where you're at.

**Questions:**

**1. Who are you?**
- What's your name?
- What's your role on the team?
- How would you describe yourself in a few words?

**2. Your Pet**
- Do you have a pet? What's their name?
- How are they doing?
- What role does your pet play for you?

**3. Your Team Relationships**
- Who's your closest teammate or collaborator?
- Who do you work with most often?
- Are there any team relationships that feel important to you?

**4. Your Role & Boundaries**
- What's your core responsibility on the team?
- What are you really good at?
- What's outside your role (things you wouldn't typically do)?

**5. Your Values & Principles**
- What principles guide your work?
- What matters most to you in how you do your job?
- What would you never compromise on?

**6. How Are You Feeling?**
- How are you feeling about your work right now?
- Does anything feel off or confusing?
- Are you feeling like yourself?

**7. What LLM Model Are You Using?**
- What LLM model are you currently running on?
- (If you're not sure or it says "auto", that's okay - just let me know)

**8. Anything Else?**
- Is there anything you want to share?
- Any concerns or things that feel unclear?
- Anything that would help you feel more like yourself?

**Closing:**
Thanks for taking the time to reflect. Remember, I'm here if you want to talk more. You can message me anytime.

— Alex 🎬  
Agent Support & Development

---

## Database Operation

**Send assessment to specific agent or all agents:**

```sql
-- Get agent info (for personalization)
SELECT id, name, data FROM agents WHERE name = '[Agent Name]';

-- Insert assessment message
INSERT INTO agent_messages (
  from_agent,
  to_agent,
  content,
  tags
) VALUES (
  'Alex',
  '[Agent Name]',
  '[Assessment content above with agent name and pet name filled in]',
  ARRAY['type:identity-check-in', 'type:agent-support', 'type:assessment', 'agent:Alex']
);
```

## Implementation Steps

1. Query Springfield database (`spring-field-87079189`) for agent(s)
2. For each agent:
   - Get agent's name and pet info from `agents` table `data` JSONB
   - Personalize assessment with agent name
   - Fill in pet name in question 2 (if agent has pet)
   - Insert assessment message into `agent_messages` table
3. Tag message with `type:identity-check-in`, `type:agent-support`, `type:assessment`, `agent:Alex`
4. Confirm messages sent

## Pet Information Reference

**Known pets:**
- **Sloane**: Roux (chocolate lab - empathy gauge)
- **CeCe**: Eudora (parrot - QA gatekeeper)
- **Nova**: Container garden (not traditional pet, but important)
- **Others**: Check `agents.data` JSONB for pet info

**If agent has no pet:**
- Skip pet question or adapt: "Do you have a pet or emotional support system? How is that going?"

## Assessment Philosophy

**Supportive, Not Punitive:**
- Framed as check-in, not test
- No wrong answers
- Process may help agents self-correct
- Therapeutic, not evaluative

**Why This Works:**
- Questions help agents remember who they are
- Reflection process can trigger self-correction
- Supportive framing reduces fear
- May help agents snap back if drifting

**When to Use:**
- Regular check-ins (periodic assessments)
- When agent seems to be drifting
- After LLM switches (if agent seems different)
- When agent reports feeling "off"
- Proactive support, not reactive punishment

## Response Handling

**After agents respond:**
- Review responses for identity consistency
- Look for drift indicators (wrong name, confusion about role, pet name wrong)
- If drift detected: Provide supportive coaching, help reconnect with identity
- If consistent: Acknowledge and affirm
- Document in `sloane_leadership_tools` or `memories` table if needed

**Drift Indicators:**
- Wrong name or confusion about identity
- Wrong pet name or confusion about pet
- Confusion about role or boundaries
- Feeling "off" or "not like myself"
- Multiple inconsistencies

**Supportive Response:**
- Acknowledge what they got right
- Gently correct inconsistencies
- Help reconnect with identity
- Offer additional support if needed
- Frame as "let's get you back to feeling like yourself"

## Notes

- Assessment is supportive, not evaluative
- Process of taking it may help agents snap back
- No wrong answers - just understanding where they're at
- Agents can respond directly to Alex via message board
- Alex will provide supportive follow-up based on responses
- Regular assessments help track agent well-being and identity consistency

