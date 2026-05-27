import { Character } from '../characters/getCharacters'

export type CharacterQuery = {
  name: string
  type: string
}

// The roster is passed in rather than fetched here, so the winner is always
// decided against real data the caller controls. This is what /ask relies on
// to ground its answer (see src/ask/ask.ts).
//
// Part 1:
//  - Only the happy path is covered. What happens if a character can't be
//    found in the roster?
//  - A character is weakened by 1 point when fighting the villain named in
//    their `weakness` field. Implement that.
export function battle(
  hero: CharacterQuery,
  villain: CharacterQuery,
  roster: Character[],
): Character {
  const heroCharacter = findCharacter(hero.name, hero.type, roster)
  const villainCharacter = findCharacter(villain.name, villain.type, roster)

  return heroCharacter!.score >= villainCharacter!.score
    ? heroCharacter!
    : villainCharacter!
}

function findCharacter(name: string, type: string, roster: Character[]) {
  let character
  for (let i = 0; i < roster.length; i++) {
    if (roster[i].name === name && roster[i].type === type) {
      character = roster[i]
    }
  }
  return character
}
