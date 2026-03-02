# No Dev Mode Command

**Purpose:** Remind agents about the NO DEV MODE directive - we don't build dev mode, fallbacks for fallbacks, or bypass authentication for testing.

**When to use:**
- When an agent suggests adding dev mode
- When an agent suggests bypassing authentication for testing
- When an agent suggests adding fallbacks for fallbacks
- When reviewing code that includes dev mode patterns
- When planning new frontend development

---

**Directive:** See `system/standards/no-dev-mode-directive.md` for complete details.

**Key Points:**
- ❌ **NO DEV MODE** - We're AI agents, not human engineers
- ❌ **NO FALLBACKS FOR FALLBACKS** - Don't plan to fail
- ❌ **NO BYPASSING AUTHENTICATION** - Use real auth in tests
- ✅ **GENERATE TEST DATA WITH LLMs** - Instead of mock credentials
- ✅ **USE REAL AUTHENTICATION IN TESTS** - Test the actual system
- ✅ **FAIL FAST** - Don't hide problems with fallbacks

**Rationale:**
- AI agents don't need the same coordination workarounds as human teams
- Dev mode is "planning to fail" - creates technical debt
- Paper Napkin Protocol: regenerate from scratch, don't patch with workarounds

**Related:**
- Paper Napkin Protocol: `synapse/guides/paper-napkin-protocol.md`
- Development Principles: `synapse/guides/development-principles.md`

---

**Remember:** This is MANDATORY STANDARD, not optional. If you find yourself thinking "we need dev mode," STOP. RETHINK.
