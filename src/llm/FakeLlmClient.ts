import {
  CombatantExtraction,
  CombatantType,
  LlmClient,
  NarrationInput,
} from './LlmClient'

type Alias = {
  name: string
  type: CombatantType
}

// A deterministic stand-in for a real model. It recognises the characters in
// the Build Circle roster plus some common nicknames, so the whole /ask
// pipeline and the evals can run with no API key and no network.
//
// It is intentionally a bit naive — it does not "understand" anything. That is
// the point: your job is to build a pipeline that is robust to an imperfect
// extractor, and your real client (Part 5) can do better.
const ALIASES: Record<string, Alias> = {
  'batman': { name: 'Batman', type: 'hero' },
  'bats': { name: 'Batman', type: 'hero' },
  'the dark knight': { name: 'Batman', type: 'hero' },
  'dark knight': { name: 'Batman', type: 'hero' },
  'caped crusader': { name: 'Batman', type: 'hero' },
  'bruce wayne': { name: 'Batman', type: 'hero' },
  'joker': { name: 'Joker', type: 'villain' },
  'the clown prince of crime': { name: 'Joker', type: 'villain' },
  'clown prince of crime': { name: 'Joker', type: 'villain' },
  'clown prince': { name: 'Joker', type: 'villain' },
  'superman': { name: 'Superman', type: 'hero' },
  'supes': { name: 'Superman', type: 'hero' },
  'man of steel': { name: 'Superman', type: 'hero' },
  'clark kent': { name: 'Superman', type: 'hero' },
  'gamora': { name: 'Gamora', type: 'hero' },
  'thanos': { name: 'Thanos', type: 'villain' },
  'the mad titan': { name: 'Thanos', type: 'villain' },
  'mad titan': { name: 'Thanos', type: 'villain' },
  'wonder woman': { name: 'Wonder Woman', type: 'hero' },
  'diana': { name: 'Wonder Woman', type: 'hero' },
  'lex luthor': { name: 'Lex Luthor', type: 'villain' },
  'luthor': { name: 'Lex Luthor', type: 'villain' },
  'aquaman': { name: 'Aquaman', type: 'hero' },
  'thor': { name: 'Thor', type: 'hero' },
  'god of thunder': { name: 'Thor', type: 'hero' },
  'spiderman': { name: 'Spiderman', type: 'hero' },
  'spider-man': { name: 'Spiderman', type: 'hero' },
  'spider man': { name: 'Spiderman', type: 'hero' },
  'web slinger': { name: 'Spiderman', type: 'hero' },
  'peter parker': { name: 'Spiderman', type: 'hero' },
  'harley quinn': { name: 'Harley Quinn', type: 'villain' },
  'harley': { name: 'Harley Quinn', type: 'villain' },
}

export type FakeLlmOptions = {
  // Force a specific extraction for an exact question. Use this in tests to
  // simulate the model misbehaving (junk output, hallucinated names, etc.).
  extractions?: Record<string, CombatantExtraction>
}

export class FakeLlmClient implements LlmClient {
  // A crude proxy for the "cost" of using the model — handy for Part 5.
  readonly calls = { extractCombatants: 0, narrateBattle: 0 }

  private readonly overrides: Record<string, CombatantExtraction>

  constructor(options: FakeLlmOptions = {}) {
    this.overrides = options.extractions ?? {}
  }

  async extractCombatants(question: string): Promise<CombatantExtraction> {
    this.calls.extractCombatants++

    if (question in this.overrides) {
      return this.overrides[question]
    }

    const found = matchAliases(question)
    return {
      isBattleQuestion: found.length >= 2,
      combatants: found.slice(0, 2),
    }
  }

  async narrateBattle(input: NarrationInput): Promise<string> {
    this.calls.narrateBattle++

    const { hero, villain, winner } = input
    return `The dust settles — ${winner.name} takes it. ${hero.name} (${hero.score}) vs ${villain.name} (${villain.score}).`
  }
}

function matchAliases(question: string): Alias[] {
  const haystack = question.toLowerCase()
  const hits: { alias: Alias; index: number }[] = []

  for (const [phrase, alias] of Object.entries(ALIASES)) {
    const index = haystack.indexOf(phrase)
    if (index !== -1) {
      hits.push({ alias, index })
    }
  }

  hits.sort((a, b) => a.index - b.index)

  // Keep the first mention of each distinct character, in the order they appear.
  const seen = new Set<string>()
  const ordered: Alias[] = []
  for (const { alias } of hits) {
    if (!seen.has(alias.name)) {
      seen.add(alias.name)
      ordered.push(alias)
    }
  }
  return ordered
}
