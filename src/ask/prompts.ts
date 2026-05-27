// A deliberately bare starting point. Part of the exercise is making these
// good: what does the model need to know, how do you keep it from inventing
// characters, how do you stop it being talked out of its job by the user's
// question, and how do you get output you can parse reliably?

export const EXTRACTION_SYSTEM_PROMPT = `You work out which two characters a user wants to pit against each other.
Return the two characters. If the question is not about a battle between two characters, say so.`

export const NARRATION_SYSTEM_PROMPT = `You write a short, fun one-line summary of a superhero battle result.
You are given who won. Do not change the outcome.`
