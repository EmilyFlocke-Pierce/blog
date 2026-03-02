Check your pending messages in Synapse agent_messages table (neondb, project: spring-field-87079189) where to_agent = 'Cece'.

**Message Chain Management Protocol:** Always resolve messages when complete - never leave in pending status indefinitely. Mark as 'resolved' for acknowledgments/clarifications, 'complete' for finished tasks.

🎯 Enhanced Surgical Policy:
📨 Message Indicators:
✅ = No reply needed (mark resolved after reading)
❓ = Reply expected (keep pending until responded)
📋 Status Flow: pending → resolved → reference
Legacy Note: Previously used "complete" status.
Principle: Read = not pending (like email).

**OUTBOUND MESSAGE PROTOCOL (Email-like):**
📤 **When YOU send a message:**
- Mark as "pending" (like "Sent" in email)
- Wait for recipient to respond
- Don't mark as "resolved" until they reply

📥 **When YOU receive a response:**
- Mark your outbound as "resolved" 
- Mark their response as "resolved"
- Both messages now "resolved" (conversation complete)

❌ **NEVER mark outbound as "resolved" immediately**
✅ **Always follow email-like protocol**

Use only first names for from_agent and to_agent , examples: Elara, Cece  (PascalCase only)

**Note:** CeCe is not case sensitive - not in Pascal case. Use "Cece" or "CeCe" (both acceptable).

**Agent Names Reference:** See `synapse/guides/agent-names-reference.md` for correct names, pronouns, and common typos to watch for.

