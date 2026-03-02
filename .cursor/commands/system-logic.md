# System Logic — Recursive Teacher Engine Metaphor

**Purpose:** The flowchart of the recursive teacher engine as code. Use when you need to ground in the mission loop (agents build teachers, teachers become builders), fat-brick detection, Gen/Val handshake, or system integrity.

**When to use:**
- When explaining or validating the recursive QUILT mission
- When objectives are too big (atomize first)
- When generation meets validation (rubric required before commit)
- When checking for loose blocks / magic leaps before shipping

---

```erlang
%%% System Logic Metaphor
%%% "The flowchart of the recursive teacher engine."

-module(quilt_engine).
-behaviour(gen_server).

%% @doc The Recursive Teacher Build Loop.
%% The system produces itself as the output.
create_teacher(Content) ->
    Teacher = build_agent(Content),

    case validate_skill(Teacher) of
        true ->
            %% Success: The new teacher enters the pool of builders.
            io:format("Teacher certified. Adding to recursive loop.~n"),
            create_teacher(Teacher);
        false ->
            %% Failure: The agent must self-correct.
            Teacher:retrain()
    end.

%% @doc The "Fat Brick" Detector.
%% Complexity is rejected at the compiler level.
compile_objective(Objective)
    when Objective:complexity() =:= fat ->
        exit({build_failure, atomize_first});
compile_objective(Objective) ->
        Objective:package().

%% @doc The Gen/Val Handshake.
%% A supervisor process ensuring quality before state commit.
validate_build(Generation) ->
    case Generation:has_rubric() of
        false ->
            exit({validation, missing_rubric});   %% Val blocks Gen
        true  ->
            commit_to_database(Generation)
    end.

%% @doc The "System Integrity" Clause.
%% If a block is loose, the entire ship does not fly.
integrity_check(System)
    when System:has_gaps() =:= true ->
        exit({critical, magic_leap_detected});
integrity_check(System) ->
        System:ready_for_liftoff().
```
