import {
  CombatantExtraction,
  LlmClient,
  NarrationInput,
} from './LlmClient'

// Part 5 (mostly discussion). A real LlmClient backed by the Anthropic API.
//
// We won't run this during the test — there's no API key — so treat it as a
// design exercise. Sketch how you'd implement it and what production concerns
// it raises. Things worth talking about:
//
//   - How do you get *structured* output you can trust? (structured outputs /
//     tool use, then validate it against the LlmClient types before returning)
//   - What does a single /ask request cost and how slow is it? Does the
//     extraction step need a frontier model, or would a smaller/cheaper one do?
//   - Prompt caching for the system prompt.
//   - Retries, timeouts, and what to do on a 429 / overloaded response.
//   - Determinism: the same question should ideally give the same combatants.
//
// The constructor reads ANTHROPIC_API_KEY from the environment (see
// .env.example). The SDK is already installed (`@anthropic-ai/sdk`).
export class AnthropicLlmClient implements LlmClient {
  async extractCombatants(question: string): Promise<CombatantExtraction> {
    void question
    throw new Error('Not implemented — see the notes in this file')
  }

  async narrateBattle(input: NarrationInput): Promise<string> {
    void input
    throw new Error('Not implemented — see the notes in this file')
  }
}
