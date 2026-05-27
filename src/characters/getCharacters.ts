export type Character = {
  name: string
  score: number
  type: string
  weakness?: string
}

export type CharactersResponse = {
  items: Character[]
}

export const CHARACTERS_URL =
  'https://s3.eu-west-2.amazonaws.com/build-circle/characters.json'

// Part 1: make this load and parse the characters from CHARACTERS_URL.
// Think about what should happen when the network call or the parsing fails.
export async function getCharacters(): Promise<CharactersResponse> {
  throw new Error('Not implemented')
}
