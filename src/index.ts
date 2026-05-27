import express, { Express, Request, Response } from 'express'
import { battle } from './battle/battle'
import { getCharacters } from './characters/getCharacters'
import { ask } from './ask/ask'
import { FakeLlmClient } from './llm/FakeLlmClient'

const app: Express = express()
app.use(express.json())

// The app is wired against the FakeLlmClient so it runs with no API key.
// Swap in your AnthropicLlmClient (Part 5) once it's ready.
const llm = new FakeLlmClient()

app.get('/battle', async (req: Request, res: Response) => {
  const hero = { name: String(req.query.hero), type: 'hero' }
  const villain = { name: String(req.query.villain), type: 'villain' }

  const roster = (await getCharacters()).items
  const result = battle(hero, villain, roster)
  res.send(result)
})

app.post('/ask', async (req: Request, res: Response) => {
  const question = String(req.body?.question ?? '')
  const result = await ask(question, { llm, getCharacters })
  res.send(result)
})

export default app

// app.listen(3000, () => {
//   console.log(`Example app listening on port 3000`)
// })
