import { battle } from './battle'
import { Character } from '../characters/getCharacters'

const roster: Character[] = [
  { name: 'Batman', score: 8.3, type: 'hero', weakness: 'Joker' },
  { name: 'Joker', score: 8.2, type: 'villain' },
  { name: 'Superman', score: 9.6, type: 'hero', weakness: 'Lex Luthor' },
  { name: 'Lex Luthor', score: 8, type: 'villain' },
]

it('returns the hero when they have the higher score', () => {
  const result = battle(
    { name: 'Batman', type: 'hero' },
    { name: 'Joker', type: 'villain' },
    roster,
  )

  expect(result.name).toBe('Batman')
})

// Part 1: flesh these out as you implement the behaviour.
it.todo('returns the villain when they have the higher score')
it.todo('applies the weakness penalty when a hero faces their nemesis')
it.todo('handles a character that is not in the roster')
