import { Character } from '../characters/getCharacters'

// The two things /ask needs a language model for. Everything else — deciding
// the winner, looking characters up — is deterministic code.
//
// You're free to change this interface if you'd design it differently; the
// FakeLlmClient and your real client just have to agree on it.

export type CombatantType = 'hero' | 'villain'

export type ExtractedCombatant = {
  name: string
  type: CombatantType
}

// What the model believes the user asked. Note this is the model's *opinion*:
// the names it returns may not exist in the roster, and it may be wrong about
// whether the question is even a battle. /ask has to deal with that.
export type CombatantExtraction = {
  isBattleQuestion: boolean
  combatants: ExtractedCombatant[]
  notes?: string
}

export type NarrationInput = {
  question: string
  hero: Character
  villain: Character
  winner: Character
}

export interface LlmClient {
  extractCombatants(question: string): Promise<CombatantExtraction>
  narrateBattle(input: NarrationInput): Promise<string>
}
