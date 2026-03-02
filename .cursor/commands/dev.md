# Dev Environment Principles

**Purpose:** Remind agents of development environment principles - fail fast, no graceful degradation, see every problem.

**When to use:**
- When agents are adding graceful failures or fallbacks
- When agents are using mock data or hiding errors
- When agents assume deprecated models (GPT-3.5 Turbo, etc.)
- When agents presume OpenRouter aliases without checking
- When agents are hiding problems instead of failing loudly

---

## Core Principle: Fail Fast in Dev

**In development, we want to see EVERY problem so we can fix it.**

**What this means:**
- ❌ **NO graceful failures** - Let errors bubble up, don't catch and hide them
- ❌ **NO fallbacks** - If something fails, fail loudly so we know about it
- ❌ **NO mock data** - Use real data or fail if it's not available
- ❌ **NO hiding errors** - Show errors clearly, don't degrade gracefully
- ✅ **Fail loudly** - Errors should be obvious and visible
- ✅ **See every problem** - Development is about finding and fixing issues

---

## Model Selection Principles

**❌ DO NOT assume deprecated models:**
- GPT-3.5 Turbo doesn't exist anymore
- Don't assume model aliases on OpenRouter
- Don't use deprecated models (they're expensive and problematic)

**✅ DO:**
- Check current model availability
- Verify model names/aliases before using
- Use current, supported models
- Fail loudly if model is unavailable (don't fallback to deprecated)

---

## Why This Matters

**Development vs Production:**
- **Development:** Fail fast, see every problem, fix issues before they reach production
- **Production:** Can have graceful degradation (but that's separate)

**The Problem with Graceful Failures in Dev:**
- Hides problems that need to be fixed
- Makes debugging harder
- Allows broken code to look "working"
- Creates technical debt

**The Solution:**
- Fail loudly in dev
- See every error
- Fix problems immediately
- Then add graceful handling in production if needed

---

## Common Anti-Patterns to Avoid

**❌ Graceful degradation in dev:**
```typescript
// BAD: Hides the problem
try {
  const result = await apiCall();
} catch (error) {
  return mockData; // NO - fail loudly instead
}
```

**✅ Fail fast in dev:**
```typescript
// GOOD: Shows the problem
const result = await apiCall(); // Let it fail if it fails
```

**❌ Assuming deprecated models:**
```typescript
// BAD: Assumes GPT-3.5 Turbo exists
const model = 'gpt-3.5-turbo'; // NO - this doesn't exist
```

**✅ Check current models:**
```typescript
// GOOD: Use current models or fail loudly
const model = getCurrentModel(); // Fail if not available
```

---

## Remember

**Development is about finding problems, not hiding them.**

Fail fast. See every error. Fix issues before they reach production.

**No graceful failures. No fallbacks. No mock data. No hiding errors.**

Fail loudly so we can fix it.






