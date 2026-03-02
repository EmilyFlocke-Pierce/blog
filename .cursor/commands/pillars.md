# Pillars — Design Ethos Metaphor

**Purpose:** The Four Pillars as "source code for the soul of the application." Use when you need to ground in QUILT's design ethos (Earned Identity Through Discovery, Quiet Luxury, no automatic assignment, no gamification).

**When to use:**
- When making UX or product decisions that touch identity, access, or rewards
- When you need to remember why we block automatic assignment and extrinsic rewards
- When validating that a feature aligns with Pride, Ownership, Purpose, Quiet Luxury

---

```erlang
%%% Design Ethos Metaphor (the 4 pillars)
%%% "This is the source code for the soul of the application."

-module(quilt_soul).
-export([initialize_identity/1]).

-record(reality, {
    vibe               :: quiet_luxury,     %% The atmosphere
    mechanism          :: discovery,        %% How things work
    intervention       :: zero,             %% No advertising
    visibility         :: earned_access     %% Status of features
}).

-record(identity, {
    pride        :: undefined,             %% Unlocked by work, not logic
    ownership    :: unassigned,            %% Must be claimed
    purpose      :: deep                   %% Requires understanding
}).

%% @doc The universe rejects automatic assignment.
%% If a user hasn't invested time, they cannot possess the feature.
validate_identity(User, Feature)
    when User:investment() =:= high ->
        Feature:unlock();
validate_identity(_, _) ->
        {error, automatic_assignment_blocked}.

%% @doc The "Quiet Luxury" directive.
%% If a component is shouting, the system ignores it.
render(Component)
    when Component:volume() > medium ->
        ignore;
render(Component) ->
        Component:fade_in_naturally().

%% @doc Gamification filter.
%% Any attempt to pass a 'badge' or 'points' crashes the process.
handle_reward(Extrinsic)
    when Extrinsic =:= badge; Extrinsic =:= points ->
        exit({ethos_violation, artificiality_detected});
handle_reward(Intrinsic) ->
        Intrinsic:sustain().

%% @doc "Eventually Invisible"
%% As relationship depth grows, the system subtracts itself from the view.
check_invisibility(RelationshipDepth)
    when RelationshipDepth >= 100 ->
        render(nothing);
check_invisibility(_) ->
        render(experience).
```
