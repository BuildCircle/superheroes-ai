import { Character, CharactersResponse } from '../characters/getCharacters'
import { LlmClient } from '../llm/LlmClient'

export type AskDeps = {
  llm: LlmClient
  getCharacters: () => Promise<CharactersResponse>
}

export type UnresolvedReason =
  | 'not_a_battle'
  | 'unknown_character'
  | 'ambiguous'
  | 'refused'

export type AskResult =
  | {
      status: 'ok'
      question: string
      combatants: { hero: Character; villain: Character }
      winner: Character
      narrative: string
    }
  | {
      status: 'unresolved'
      question: string
      reason: UnresolvedReason
      detail?: string
    }

// Part 2: this is the heart of the test. Turn a natural-language question into
// a grounded answer.
//
// The shape of it:
//   1. Ask the model which two characters are involved (deps.llm).
//   2. Resolve those against the real roster (deps.getCharacters).
//   3. Decide the winner with battle() — NOT the model. The model parses
//      language; your code computes the result.
//   4. Ask the model to narrate the result you computed.
//
// See ask.spec.ts for the behaviour we're looking for, including the cases
// where the question can't be answered. Implement against those.
export async function ask(question: string, deps: AskDeps): Promise<AskResult> {
  void deps
  throw new Error('Not implemented')
}
