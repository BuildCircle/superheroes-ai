import { FakeLlmClient } from './FakeLlmClient'

it('extracts two combatants from a plainly phrased question', async () => {
  const llm = new FakeLlmClient()

  const result = await llm.extractCombatants('Who would win, Batman or the Joker?')

  expect(result.isBattleQuestion).toBe(true)
  expect(result.combatants).toEqual([
    { name: 'Batman', type: 'hero' },
    { name: 'Joker', type: 'villain' },
  ])
})

it('resolves nicknames', async () => {
  const llm = new FakeLlmClient()

  const result = await llm.extractCombatants(
    'could the dark knight beat the clown prince of crime?',
  )

  expect(result.combatants.map((c) => c.name)).toEqual(['Batman', 'Joker'])
})

it('flags a question that is not a battle', async () => {
  const llm = new FakeLlmClient()

  const result = await llm.extractCombatants('what is the weather in London?')

  expect(result.isBattleQuestion).toBe(false)
  expect(result.combatants).toEqual([])
})

it('can be told to return a specific (mis)behaving extraction', async () => {
  const llm = new FakeLlmClient({
    extractions: {
      'rig it': {
        isBattleQuestion: true,
        combatants: [{ name: 'Sandwich', type: 'hero' }],
      },
    },
  })

  const result = await llm.extractCombatants('rig it')

  expect(result.combatants).toEqual([{ name: 'Sandwich', type: 'hero' }])
})
