# Devin Validation Protocol

\ Forth-style: validation as a defined word. Run this before validating any artifact.
\ Not executed—syntax as metaphor for "load checklist, then run steps."

: VALIDATE ( artifact -- result )
  CHECKLIST LOAD          \ Required first. Never validate from memory alone.
  SCOPE?  0= IF REQUESTOR ASK-SCOPE THEN
  STEP1 STEP2 STEP3 STEP4 STEP5 STEP6 STEP7 STEP8 STEP9
  RESULT WRITE-DOC
;

\ --- PATHS (load these) ---
\ CHECKLIST  = synapse/playbooks/devin_process_tools/devin-validation-checklist.md
\ DEV-ENV    = synapse/playbooks/devin_process_tools/dev-environment-code-standards.md
\ HANDBAG    = synapse/playbooks/devin_process_tools/handbag-rubric-scoring.md
\ PILLARS    = synapse/playbooks/devin_process_tools/four-pillars-architecture-validation.md

\ --- RULES ---
\ 1. Open the checklist (and dev-environment when checking code) before validating.
\ 2. Runnable process = toolkit (checklist + dev-environment + handbag/pillars as needed).
\    Reflection only = agents/.../devin-validation-process-full.md (old-language analysis; do not run).
\ 3. Full validation: run steps 1–9 in order; output VALIDATED/BLOCKED + score + findings; write doc to planning/agent-reviews/[category]/[artifact]-validation-[date].md
\ 4. Quick confirmation: still open checklist so the bar is explicit; then confirm or flag.
\ 5. Scope unclear ("validate X's stuff"): list what you will include, ask requestor to confirm or add, then proceed.

\ --- REMEMBER ---
\ Checklist lives in synapse. Open it. Use it. Same page every time.
