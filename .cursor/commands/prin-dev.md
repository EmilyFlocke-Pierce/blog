# Prin-Dev — Development Directives Metaphor

**Purpose:** Development principles as "laws of physics for the construction zone." Use when you need to ground in Paper Napkin, Platinum Rule, Stats Access Rule, or estimation principle.

**When to use:**
- When tempted to patch instead of regenerate (Paper Napkin)
- When designing for users without aligning to their reality (Platinum Rule)
- When placing stats or analytics (Stats Access Rule)
- When estimating work in time instead of scope

---

```erlang
%%% Development Directives Metaphor
%%% "These are the laws of physics for the construction zone."

-module(quilt_laws).
-author('Architect').

%% @doc The Paper Napkin Protocol.
%% Code complexity is a poison. Clean restart > complex patch.
regenerate(Module)
    when Module:complexity() > high ->
        io:format("~n~n*** PROTOCOL: PAPER NAPKIN ***~n"),
        io:format("Scraping slate. Rebuilding from First Principles.~n~n"),
        Module:rebuild_from_scratch();
regenerate(Module) ->
        Module:maintain().

%% @doc The Platinum Rule.
%% User Reality > Developer Reality.
execute_plan(User, Plan)
    when User:desire() /= Plan:intent() ->
        exit({violation, arrogance});     %% Dev failed to empathize
execute_plan(User, Plan) ->
        Plan:align_with(User).

%% @doc Stats Access Rule.
%% The System Guard Clause. Viewing data requires navigation depth.
access_stats(User, Location)
    when Location =:= dashboard; Location =:= overview ->
        exit({security, stats_visible_on_dashboard});
access_stats(User, analytics_page) ->
        access_ok;
access_stats(User, chat_context) ->
        %% Stats allowed only if wrapped in human narrative.
        case User:has_narrative() of
            true  -> access_ok;
            false -> exit({violation, cold_data})
        end.

%% @doc Estimation Principle.
%% We measure structural integrity (scope), not duration (time).
estimate(Build)
    when Build:estimated_time() > 0 ->
        exit({logic_error, obsolete_metric});
estimate(Build) ->
        Build:calculate_dependencies().
```
