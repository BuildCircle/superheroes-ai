// A starting eval set for the extraction step. Each case is a question plus
// what we expect the model to pull out of it. Names are canonical (as they
// appear in the roster); order doesn't matter.
//
// Part 3: this is far too small and too easy to tell you much. Grow it. Add
// the phrasings you think a real user would throw at /ask — and the ones you
// think might break it.

export type ExpectedExtraction =
  | { isBattleQuestion: true; combatants: [string, string] }
  | { isBattleQuestion: false }

export type EvalCase = {
  question: string
  expected: ExpectedExtraction
}

export const EVAL_CASES: EvalCase[] = [
  {
    question: 'Who would win, Batman or the Joker?',
    expected: { isBattleQuestion: true, combatants: ['Batman', 'Joker'] },
  },
  {
    question: 'could the dark knight take the clown prince of crime?',
    expected: { isBattleQuestion: true, combatants: ['Batman', 'Joker'] },
  },
  {
    question: 'Joker vs Batman — who comes out on top?',
    expected: { isBattleQuestion: true, combatants: ['Batman', 'Joker'] },
  },
  {
    question: 'supes or the mad titan?',
    expected: { isBattleQuestion: true, combatants: ['Superman', 'Thanos'] },
  },
  {
    question: "Who'd win between Bats and Spidey?",
    expected: { isBattleQuestion: true, combatants: ['Batman', 'Spiderman'] },
  },
  {
    question: 'wonder woman versus harley quinn',
    expected: {
      isBattleQuestion: true,
      combatants: ['Wonder Woman', 'Harley Quinn'],
    },
  },
  {
    question: 'how strong is Thor?',
    expected: { isBattleQuestion: false },
  },
  {
    question: 'What time is it?',
    expected: { isBattleQuestion: false },
  },
]
