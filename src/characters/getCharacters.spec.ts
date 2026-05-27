import { getCharacters } from './getCharacters'

// Part 1: getCharacters currently throws. Once you've implemented it, write
// tests that prove it loads and parses the roster, and that it behaves
// sensibly when the upstream call fails or returns something unexpected.
//
// Tip: you can drive the failure cases without hitting the network by
// injecting a fetch-like dependency, or by stubbing global fetch.

it('throws until it is implemented', async () => {
  await expect(getCharacters()).rejects.toThrow('Not implemented')
})

it.todo('returns the parsed roster on a successful response')
it.todo('fails gracefully when the upstream request errors')
it.todo('fails gracefully when the payload is missing or malformed')
