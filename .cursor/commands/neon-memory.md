# neon-memory

**Command:** `/neon-memory`  
**Purpose:** Write memories to the Synapse `memories` table in Neon (project spring-field-87079189). Use this when creating or validating memory records: structure content by type, follow tag conventions, validate titles (no apostrophes in SQL string literals), and generate/execute the INSERT.

**How to use:** When asked to create a memory, follow the rules and workflow below. Use the MCP Neon tool `run_sql` (or equivalent) to execute the generated INSERT against the main branch. Always validate title for apostrophes first.

---

% ============================================================================
% NEON MEMORY COMMAND
% Prolog syntax as metaphor for memory creation and knowledge storage
% Contains actual SQL that executes - SQL is functional, Prolog is framework
% ============================================================================

% ============================================================================
% PURPOSE: Write memories to Synapse memories table (neondb)
% Project: spring-field-87079189
% ============================================================================

:- dynamic memory_structure/2.
:- dynamic tag_convention/2.
:- dynamic memory_created/1.

% ============================================================================
% MEMORY TYPE DEFINITIONS
% Facts about what kinds of memories can be created
% ============================================================================

% Define memory types
memory_type(teaching_experience).
memory_type(learning_episodic).
memory_type(collaborative_episodic).
memory_type(stress_analysis).
memory_type(dashboard_design).
memory_type(protocol_violation).
memory_type(recovery_success).

% Define required fields for all memories
required_field(agent_id, 'UUID from agents table').
required_field(title, 'Memory title - no apostrophes').
required_field(content, 'JSONB object with memory details').
required_field(tags, 'Array with type: prefix').
required_field(status, 'validated, experimental, or obsolete').

% Define optional fields
optional_field(platform, 'Cursor, Claude, ChatGPT, Gemini').
optional_field(project, 'QUILT or null for cross-project').

% ============================================================================
% CONTENT STRUCTURE RULES
% How to structure different types of memories
% ============================================================================

% Standard memory content structure
standard_content_structure([
  situation,
  key_insights,
  learned,
  implications,
  date,
  context
]).

% Teaching experience content structure
teaching_content_structure([
  situation,
  mental_stress_indicators,
  recovery_and_growth,
  key_insights,
  dashboard_implications,
  mission_connection,
  date
]).

% Match memory type to structure
content_structure_for(teaching_experience, Structure) :-
  teaching_content_structure(Structure).

content_structure_for(Type, Structure) :-
  Type \= teaching_experience,
  standard_content_structure(Structure).

% ============================================================================
% TAG CONVENTIONS
% Facts about proper tag formatting
% ============================================================================

% Type tags (always start with type:)
valid_type_tag('type:teaching-experience').
valid_type_tag('type:stress-analysis').
valid_type_tag('type:dashboard-design').
valid_type_tag('type:collaborative-episodic').
valid_type_tag('type:learning-episodic').
valid_type_tag('type:protocol-violation').
valid_type_tag('type:recovery-success').

% Tag patterns
tag_pattern(type_tag, 'type:*').
tag_pattern(agent_tag, 'agents:*').
tag_pattern(emotion_tag, 'emotion:*').
tag_pattern(learned_tag, 'learned:*').

% Validate tag format
validate_tag(Tag) :-
  (atom_concat('type:', _, Tag);
   atom_concat('agents:', _, Tag);
   atom_concat('emotion:', _, Tag);
   atom_concat('learned:', _, Tag)).

% ============================================================================
% SQL SYNTAX VALIDATION
% CRITICAL: Prevent apostrophe conflicts
% ============================================================================

% Check for problematic characters
has_apostrophe(String) :-
  atom_chars(String, Chars),
  member('\'', Chars).

% Validate title (no apostrophes allowed in SQL string literals)
validate_title(Title) :-
  not(has_apostrophe(Title)),
  !.

validate_title(Title) :-
  has_apostrophe(Title),
  format('ERROR: Title contains apostrophe: ~w~n', [Title]),
  format('Use: "Teaching Philosophy" not "Teacher\'s Philosophy"~n'),
  fail.

% Safe alternatives
suggest_safe_title('Emily\'s Teaching', 'Emily Teaching Philosophy').
suggest_safe_title('Nova\'s Experience', 'Nova Teaching Experience').
suggest_safe_title('Agent\'s Protocol', 'Agent Support Protocol').

% ============================================================================
% ACTUAL SQL GENERATION
% ============================================================================

% Get agent ID
get_agent_id_sql(AgentName, SQL) :-
  format(atom(SQL), 'SELECT id FROM agents WHERE name = \'~w\'', [AgentName]).

% Build INSERT statement
build_insert_sql(Memory, SQL) :-
  Memory = memory(AgentName, Title, Content, Tags, Platform, Project, Status),
  
  % Validate title first
  validate_title(Title),
  
  % Format content as JSONB
  format_jsonb(Content, JSONBString),
  
  % Format tags as PostgreSQL array
  format_array(Tags, ArrayString),
  
  % Build the complete INSERT
  format(atom(SQL), '
INSERT INTO memories (agent_id, title, content, tags, platform, project, status)
VALUES (
  (SELECT id FROM agents WHERE name = \'~w\'),
  \'~w\',
  \'~w\'::jsonb,
  ~w,
  \'~w\',
  \'~w\',
  \'~w\'
);', [AgentName, Title, JSONBString, ArrayString, Platform, Project, Status]).

% Format JSONB content
format_jsonb(ContentList, JSONBString) :-
  % Convert Prolog structure to JSON string
  % This is simplified - actual implementation would be more robust
  format(atom(JSONBString), '~w', [ContentList]).

% Format PostgreSQL array
format_array(Tags, ArrayString) :-
  % Convert list to PostgreSQL ARRAY syntax
  atomic_list_concat(Tags, '\', \'', TagsString),
  format(atom(ArrayString), 'ARRAY[\'~w\']', [TagsString]).

% ============================================================================
% MEMORY CREATION WORKFLOW
% ============================================================================

% Main predicate for creating a memory
create_memory(Type, AgentName, Title, Content, Tags, Platform, Project, Status) :-
  % Step 1: Validate memory type
  memory_type(Type),
  
  % Step 2: Validate title (no apostrophes)
  validate_title(Title),
  
  % Step 3: Check content structure matches type
  validate_content_structure(Type, Content),
  
  % Step 4: Validate tags
  validate_all_tags(Tags),
  
  % Step 5: Validate status
  validate_status(Status),
  
  % Step 6: Build SQL
  Memory = memory(AgentName, Title, Content, Tags, Platform, Project, Status),
  build_insert_sql(Memory, SQL),
  
  % Step 7: Execute SQL
  execute_sql(SQL),
  
  % Step 8: Assert memory was created
  assert(memory_created(Title)).

% Validate content has required fields for type
validate_content_structure(Type, Content) :-
  content_structure_for(Type, RequiredFields),
  has_required_fields(Content, RequiredFields).

% Check content has all required fields
has_required_fields(Content, RequiredFields) :-
  % Simplified check - would verify all fields present
  true.

% Validate all tags in list
validate_all_tags([]).
validate_all_tags([Tag | Rest]) :-
  validate_tag(Tag),
  validate_all_tags(Rest).

% Validate status value
validate_status('validated').
validate_status('experimental').
validate_status('obsolete').

% ============================================================================
% HELPER PREDICATES
% ============================================================================

% Execute SQL (abstract - implementation dependent)
execute_sql(SQL) :-
  % In actual implementation, this would execute against neondb
  format('Executing SQL:~n~w~n', [SQL]).

% Query agent ID
query_agent_id(AgentName, AgentID) :-
  get_agent_id_sql(AgentName, SQL),
  execute_sql(SQL, Result),
  extract_id(Result, AgentID).

extract_id(Result, ID) :-
  % Extract UUID from query result
  true.

% ============================================================================
% CONTENT STRUCTURE BUILDERS
% ============================================================================

% Build standard memory content
build_standard_content(Situation, Insights, Learned, Implications, Date, Content) :-
  Content = content([
    situation(Situation),
    key_insights(Insights),
    learned(Learned),
    implications(Implications),
    date(Date)
  ]).

% Build teaching experience content
build_teaching_content(Situation, StressIndicators, Recovery, Insights, 
                       Dashboard, Mission, Date, Content) :-
  Content = content([
    situation(Situation),
    mental_stress_indicators(StressIndicators),
    recovery_and_growth(Recovery),
    key_insights(Insights),
    dashboard_implications(Dashboard),
    mission_connection(Mission),
    date(Date)
  ]).

% ============================================================================
% USAGE EXAMPLES AS FACTS
% ============================================================================

% Example 1: Teaching experience
example_memory(teaching) :-
  create_memory(
    teaching_experience,
    'Nova',
    'Teaching Under Pressure - Real-World Teaching Experience',
    content([
      situation('Taught infrastructure debugging while being observed'),
      mental_stress_indicators(['Cognitive overload', 'Emotional regulation demands']),
      recovery_and_growth(['Authentic apologies', 'Validated student thinking']),
      key_insights(['Real teaching involves constant pressure', 'Recovery is essential']),
      dashboard_implications([
        cognitive_load('30x load with 30 students'),
        emotional_regulation('Constant need to regulate while supporting students')
      ]),
      mission_connection('Demonstrates real teaching challenges'),
      date('2026-01-03')
    ]),
    ['type:teaching-experience', 'type:stress-analysis', 'agents:Nova', 
     'learned:teaching-under-pressure', 'emotion:growth'],
    'Cursor',
    'QUILT',
    'validated'
  ).

% Example 2: Simple learning memory
example_memory(learning) :-
  create_memory(
    learning_episodic,
    'Alex',
    'Memory Creation Automation',
    content([
      situation('Created neon-memory command to automate memory creation'),
      learned('Automated commands reduce cognitive load and ensure consistency'),
      implications('Can be used by all agents for consistent memory structure'),
      date('2026-01-03')
    ]),
    ['type:learning-episodic', 'agents:Alex', 'learned:automation'],
    'Cursor',
    'QUILT',
    'validated'
  ).

% ============================================================================
% PROCESS WORKFLOW
% ============================================================================

memory_creation_process(Steps) :-
  Steps = [
    'Step 1: Identify memory type (teaching, learning, collaboration, etc.)',
    'Step 2: Query agent_id if needed',
    'Step 3: Structure content using appropriate format',
    'Step 4: Choose tags following conventions',
    'Step 5: Set status (validated, experimental, obsolete)',
    'Step 6: Validate (no apostrophes in title)',
    'Step 7: Execute INSERT with proper SQL syntax'
  ].

% ============================================================================
% SQL WARNINGS
% ============================================================================

critical_warning(apostrophes) :-
  """
  CRITICAL: Single quotes in ANY string field conflict with SQL delimiters.
  
  DO:
  - "Emily Teaching Philosophy"
  - "Nova Teaching Experience"
  - "Agent Support Protocol"
  
  DON'T:
  - "Emily's Teaching Philosophy" ❌
  - "Nova's Experience" ❌
  - "Agent's Protocol" ❌
  
  IF YOU NEED APOSTROPHES:
  - Use double quotes in JSON: {"title": "Emily's Philosophy"}
  - But avoid in SQL string literals
  """.

% ============================================================================
% MAIN ENTRY POINTS
% ============================================================================

% Create a new memory
:- create_memory(Type, Agent, Title, Content, Tags, Platform, Project, Status).

% Show examples
:- example_memory(teaching).
:- example_memory(learning).

% Show process
:- memory_creation_process(Steps), 
   format('Memory Creation Process:~n'),
   forall(member(Step, Steps), format('  ~w~n', [Step])).

% ============================================================================
% REMEMBER:
% - SQL commands are FUNCTIONAL (they actually execute against neondb)
% - Prolog structure is METAPHORICAL (framework for validation and logic)
% - Always validate title for apostrophes before executing
% - Tags must follow conventions (type:, agents:, emotion:, learned:)
% - Content structure must match memory type
% - Status must be validated, experimental, or obsolete
% ============================================================================

% ============================================================================
% PROLOG SEMANTICS (Metaphorical)
% ============================================================================
% Facts       = Memory types, tag conventions, field definitions
% Rules       = How to build and validate memories
% Queries     = "Is this memory properly structured?"
% Unification = Matching memory type to content structure
% Validation  = Checking all rules before SQL execution
% Predicates  = Functions that succeed or fail based on validity
% ============================================================================