# Schema Alignment & Domain Boundary Coordination Protocol

**Purpose:** Prevent miscommunication when database errors occur by clearly identifying when to stop and coordinate with schema team vs proceed independently with code fixes

**Created:** 2026-01-17  
**Context:** Recurring pattern where schema constraint errors were treated as code problems, leading to workarounds that masked real issues

**Core Principle:** Database constraints = Schema domain = Stop and coordinate. Query logic = Backend domain = Proceed independently.

---

## Quick Reference: Error Pattern Recognition

### 🛑 **STOP AND COORDINATE** (Schema Domain - Amala)

**Error Types That Trigger Coordination:**
- ✅ NOT NULL constraint violations
- ✅ Foreign key constraint violations
- ✅ Unique constraint violations
- ✅ Check constraint violations
- ✅ Column does not exist errors
- ✅ Data type mismatch errors (when schema expects different type)
- ✅ Legacy column constraint issues

**Action:** Message Amala immediately. Do NOT add code workarounds.

---

### ✅ **PROCEED INDEPENDENTLY** (Backend Domain - Elara)

**Error Types That Are Code Problems:**
- ✅ Query syntax errors
- ✅ Connection/authentication errors
- ✅ Logic errors in queries
- ✅ Performance optimization issues
- ✅ Code-level data validation errors

**Action:** Fix in code, but verify schema alignment first.

---

## Decision Tree

```
Database Error Occurs
│
├─ Is it a constraint violation?
│  ├─ NOT NULL constraint? → 🛑 Schema domain → Stop and coordinate with Amala
│  ├─ Foreign key constraint? → 🛑 Schema domain → Stop and coordinate with Amala
│  ├─ Unique constraint? → 🛑 Schema domain → Stop and coordinate with Amala
│  └─ Check constraint? → 🛑 Schema domain → Stop and coordinate with Amala
│
├─ Is it a structure issue?
│  ├─ Column does not exist? → 🛑 Schema domain → Stop and coordinate with Amala
│  ├─ Wrong data type? → 🛑 Schema domain → Stop and coordinate with Amala
│  └─ Table does not exist? → 🛑 Schema domain → Stop and coordinate with Amala
│
├─ Is it a legacy column issue?
│  ├─ Legacy NOT NULL constraint blocking saves? → 🛑 Schema domain → Stop and coordinate with Amala
│  └─ Legacy column causing constraint violations? → 🛑 Schema domain → Stop and coordinate with Amala
│
└─ Is it query logic/connection?
   ├─ Query syntax error? → ✅ Backend domain → Proceed independently
   ├─ Connection refused? → ✅ Infrastructure/backend domain → Proceed independently
   ├─ Logic error in query? → ✅ Backend domain → Proceed independently
   └─ Performance issue? → ✅ Backend/optimization domain → Proceed independently
```

---

## Domain Boundary Check Protocol

**Before fixing any database-related error:**

1. **Identify error type** - Is this a constraint error or a code error?
2. **Check domain ownership** - Database constraints = Amala domain, Query logic = Elara domain
3. **If constraint error** - Stop, flag to Amala, coordinate
4. **If code error** - Proceed independently, but verify schema alignment first

**Bright Line Rule:**
> **Database constraints = Schema domain = Stop and coordinate**  
> **Query logic = Backend domain = Proceed independently**

---

## Validation Step - Schema Alignment Check

**Before assuming code fix is appropriate:**

1. **Check schema audit** - Is schema compliant? (Cece audits this)
2. **Check migration status** - Are there pending migrations? (Amala tracks this)
3. **Check legacy column handling** - Are legacy columns causing issues? (Amala migration strategy)
4. **If schema is compliant but errors occur** - This is migration/legacy issue, not code issue

**Schema Alignment Validation Checklist:**
- [ ] Query schema audit results (Cece maintains these)
- [ ] Check if error is from legacy columns vs new columns
- [ ] Verify if migration strategy addresses the constraint
- [ ] If legacy NOT NULL constraints blocking saves → Schema migration needed, not code workaround

---

## Stop-and-Coordinate Signal - Clear Criteria

### 🛑 **Stop and Coordinate When:**

- ✅ Database constraint errors occur (any constraint type)
- ✅ Schema structure errors (column missing, wrong type)
- ✅ Legacy column issues (NOT NULL constraints on deprecated columns)
- ✅ Migration-related errors (schema out of sync with code expectations)
- ✅ Data type mismatches (schema expects different type than code provides)

### ✅ **Proceed Independently When:**

- ✅ Query syntax/logic errors
- ✅ Connection/authentication errors
- ✅ Performance optimization
- ✅ Code-level data validation
- ✅ API endpoint logic errors

---

## Legacy Column Handling Strategy

**For legacy NOT NULL constraints:**

- **Schema migration approach** - Remove NOT NULL or add defaults (Amala domain)
- **NOT code workaround** - Fallback values mask the real problem
- **Migration strategy** - Handle legacy constraints in migration, not in code

**Process:**
1. Identify legacy column causing constraint violation
2. Flag to Amala for migration strategy
3. Amala decides: remove NOT NULL, add default, or deprecate column
4. Code aligns with schema after migration, not before

**What NOT to Do:**
- ❌ Add fallback/placeholder values in code
- ❌ Treat legacy NOT NULL constraints as code problems
- ❌ Mask schema issues with code workarounds

**What TO Do:**
- ✅ Recognize legacy NOT NULL constraints as schema migration issue
- ✅ Message Amala: "Legacy NOT NULL constraint blocking saves. Need migration strategy."
- ✅ Wait for coordination before proceeding
- ✅ Remove any temporary workarounds after migration

---

## Error Interpretation Protocol

**When database error occurs:**

1. **Read error message carefully** - What type of error is it?
2. **Check error pattern** - Constraint violation? Structure issue? Logic issue?
3. **Apply domain boundary check** - Whose domain is this?
4. **If schema domain** - Stop, message Amala, wait for coordination
5. **If backend domain** - Proceed with fix, but verify schema alignment first

**Error Message Pattern Recognition:**

| Error Pattern | Domain | Action |
|--------------|--------|--------|
| "NOT NULL constraint" | Schema | 🛑 Stop and coordinate |
| "foreign key constraint" | Schema | 🛑 Stop and coordinate |
| "column does not exist" | Schema | 🛑 Stop and coordinate |
| "unique constraint violation" | Schema | 🛑 Stop and coordinate |
| "syntax error" | Backend | ✅ Proceed independently |
| "connection refused" | Infrastructure/Backend | ✅ Proceed independently |
| "invalid input syntax" | Backend | ✅ Proceed independently |

---

## Coordination Protocol

**When stopping to coordinate:**

1. **Message Amala** - "Schema constraint error: [error type]. Need migration strategy for [specific issue]."
2. **Include context** - What operation triggered it? What legacy columns involved?
3. **Wait for coordination** - Don't add workarounds while coordinating
4. **After migration** - Remove any temporary workarounds, align code with new schema

**Message Template:**
```
Hey Amala,

Schema constraint error occurred during [operation]:
- Error type: [NOT NULL / foreign key / unique / check constraint]
- Affected columns: [column names]
- Legacy columns involved: [yes/no, which ones]
- Operation that triggered it: [backfill / save / update / etc.]

Need migration strategy to handle this properly.

Thanks!
```

---

## What This Prevents

- ❌ Code workarounds masking schema issues
- ❌ Domain boundary violations
- ❌ Coordination breakdowns
- ❌ Technical debt from masking problems
- ❌ Treating schema issues as code problems
- ❌ Missing the real issue (legacy NOT NULL constraints)

---

## Key Principles

1. **Error Pattern Recognition** - Schema constraint errors are a clear signal to stop and coordinate
2. **Domain Boundaries** - Database constraints = Amala domain, Query logic = Elara domain
3. **No Workarounds** - Don't mask schema issues with code fixes
4. **Validation First** - Check schema alignment before assuming code fix
5. **Coordination Over Speed** - Better to coordinate than create technical debt

---

## Related Protocols

- **Domain Boundaries Protocol** - `alex-agent-support-toolkit.md` section on respecting ownership
- **Trust But Verify Protocol** - Verification when scope boundaries shift
- **Schema Compliance Audits** - Cece maintains schema audit documentation

---

## Questions?

If you're unsure whether an error is schema domain or backend domain:
1. Check the error message pattern (see table above)
2. If it mentions "constraint" or "column" → Schema domain
3. If it mentions "syntax" or "connection" → Backend domain
4. When in doubt → Message both Amala and Alex for clarification

---

**Remember:** The bright line is: **Database constraints = Schema domain = Stop and coordinate**. When you see constraint errors, that's your signal to coordinate, not to fix in code.
