import { runEvals } from './runEvals'

// This isn't a pass/fail gate — it's a measurement. Run `pnpm eval` to see the
// per-case breakdown. The interesting question is which cases fail and why.
it('measures extraction accuracy over the eval set', async () => {
  const summary = await runEvals()

  console.table(
    summary.results.map((r) => ({
      question: r.case.question,
      result: r.actual,
      passed: r.passed,
    })),
  )

  expect(summary.total).toBeGreaterThan(0)
  expect(summary.accuracy).toBeGreaterThanOrEqual(0)
  expect(summary.accuracy).toBeLessThanOrEqual(1)
})

it.todo('reports precision/recall on the is-this-a-battle classification')
