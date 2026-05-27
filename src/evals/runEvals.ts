import { LlmClient } from '../llm/LlmClient'
import { FakeLlmClient } from '../llm/FakeLlmClient'
import { EVAL_CASES, EvalCase } from './dataset'

export type EvalResult = {
  case: EvalCase
  passed: boolean
  actual: string
}

export type EvalSummary = {
  total: number
  passed: number
  accuracy: number
  results: EvalResult[]
}

export async function runEvals(
  llm: LlmClient = new FakeLlmClient(),
): Promise<EvalSummary> {
  const results: EvalResult[] = []

  for (const evalCase of EVAL_CASES) {
    const extraction = await llm.extractCombatants(evalCase.question)
    const actualNames = extraction.combatants.map((c) => c.name)

    // Part 3: this only scores whole-extraction exactness. A real harness
    // would tell you *how* it's wrong — e.g. precision/recall on the
    // is-this-a-battle classification vs. getting the right characters.
    const passed = isExactMatch(evalCase, extraction.isBattleQuestion, actualNames)

    results.push({
      case: evalCase,
      passed,
      actual: extraction.isBattleQuestion
        ? actualNames.join(' vs ') || '(none)'
        : '(not a battle)',
    })
  }

  const passed = results.filter((r) => r.passed).length
  return {
    total: results.length,
    passed,
    accuracy: results.length === 0 ? 0 : passed / results.length,
    results,
  }
}

function isExactMatch(
  evalCase: EvalCase,
  actualIsBattle: boolean,
  actualNames: string[],
): boolean {
  if (evalCase.expected.isBattleQuestion !== actualIsBattle) {
    return false
  }
  if (!evalCase.expected.isBattleQuestion) {
    return true
  }
  const expected = [...evalCase.expected.combatants].sort()
  const actual = [...actualNames].sort()
  return expected.length === actual.length && expected.every((n, i) => n === actual[i])
}

if (require.main === module) {
  runEvals().then((summary) => {
    for (const r of summary.results) {
      const mark = r.passed ? 'PASS' : 'FAIL'
      console.log(`${mark}  ${r.case.question}  ->  ${r.actual}`)
    }
    console.log(
      `\n${summary.passed}/${summary.total} (${(summary.accuracy * 100).toFixed(0)}%)`,
    )
  })
}
