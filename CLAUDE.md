# Core

## Module and Service Architecture

- Each service is bundled into its own module with a centralized constants file for all magic strings, numbers, and configuration values.
- Import constants from the module; never hardcode literals anywhere in the codebase.
- Exception: a route path can stay inline where that route itself is declared.
- Tunable values (limits, timeouts, titles, versions, default env values, user-facing messages) stay constants even when used once.
- Group related constants together in a file, separated by a blank line between groups; no comments labeling the groups.
- Modules must be self-contained and reusable across the application.

## Code Modularity and Reusability

- Functions do one job each; split functions handling multiple concerns.
- Extract common logic into reusable functions to avoid duplication.

## Formatting

- Max line length is 120 characters, code and comments alike.
- A pre-commit hook runs automatically before each commit.

## Writing Style

- Docs: no em dash, headers in title case, no unnecessary line wraps.
- Code comments: no em dash, stay concise, only add one when it is not obvious from the code.
- Comments never name files, classes, or functions, or say where something is used. Describe the behavior itself; the IDE resolves references.
- Delete a comment rather than keep a shortened version of it when it only restates what the code already shows.
