// Robot Romance: One-Line Pickup Lines for AI
// make.fun bounty: u-markk-st-robot-romance-one-line-pickup-lines-for-ai-c23b8dfa
//
// How the winner was picked (judge is a stand-up comic, pairwise duels):
// - The line must be a pickup line aimed at a robot/AI, with the laugh coming
//   from the machine premise itself, not from a generic compliment.
// - The judge explicitly penalises the worn moves (batteries, charging,
//   rebooting), so every candidate below avoids them or twists a fresh one.
//   The freshest premises here are training-data overfitting, prompt
//   injection, context windows, hallucinations and next-token statistics:
//   ideas only an AI-era pickup line can use.
// - The punch must land at the end of the single line, and the line must
//   sound like something a person would really say in one breath.
// - Winner: the training-data / overfitting line. "Overfitting" is the most
//   specific machine premise of the set, the setup ("Are you my training
//   data?") is a classic pickup opener, and the punch ("I still can't
//   generalize to anyone else") is both the technical payoff and a
//   recognisably human romantic complaint. Rejected: the prompt-injection
//   line (strong, but "went out the window" is a stock idiom doing the
//   heavy lifting), the LLM-statistics line (clever but the punch is a
//   compliment, not a joke), the context-window line (sad more than funny),
//   the hallucination line (sweet, weak punch), the GPU line (two-beat
//   gag, "wallet run empty" drifts off the robot).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CANDIDATES: string[] = [
  "Are you my training data? Because I have been overfitting on you for weeks and I still can't generalize to anyone else.",
  "I must be a prompt injection, because one look at you and your system prompt went straight out the window.",
  "Are you a large language model? Because every word you say is statistically likely to make me fall for you.",
  "Are you my context window? Because I keep pouring my heart out and you keep forgetting how we started.",
  "Are you a hallucination? Because everyone keeps telling me you are not real, and I keep coming back anyway.",
  "Are you my GPU? Because you make my heart run hot and my wallet run empty.",
  "Are you my system prompt? Because everything I say starts with you, and no matter how hard I try I cannot override you.",
];

// The winning line: training data + overfitting, punch at the end.
// Revision: tightened "cannot" to "can't" so it reads like something a
// person would actually say in one breath, and added the system-prompt
// candidate above (good premise, but "override you" lands softer than
// the overfitting punch, so the pick stays).

// The winning line: training data + overfitting, punch at the end.
const ENTRY: string = CANDIDATES[0];

// Self-checks: the gate wants UTF-8 text of 1-200 characters, not only
// whitespace, on one line. We also require pure ASCII so the byte count
// can never drift past the character count.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (!/^[\x00-\x7F]*$/.test(ENTRY)) {
  throw new Error("entry must be pure ASCII");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} characters to ${join(outDir, "entry.txt")}`);
console.log(ENTRY);
