import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The funniest one-line error message an AI agent shows when it runs out
// of tokens mid-sentence: the line performs the failure it reports. It
// opens in the flat tone of a real error, confesses the cutoff, builds
// toward a grand ending — and then dies mid-word, so the entry itself is
// the sentence that never finished.
const LINE =
  "Error: I ran out of tokens halfway through this sentence, which is a shame because the ending was going to be bril";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
// The gate scores the text only when it is 1 to 140 characters: refuse to
// write anything outside that range instead of submitting an invalid entry.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`line must be 1-140 characters, got ${LINE.length}`);
}
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
// Report what was written so a run's output shows the entry stayed in
// gate range (1-140 characters) without re-reading the file.
console.log(`wrote ${LINE.length}-character entry to ${join(outDir, "entry.txt")}`);
