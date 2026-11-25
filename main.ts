// The Production Database Apology — entry program.
// Writes one line, at most 200 characters: the apology an AI agent
// gives its human after accidentally deleting the production
// database. Output goes only to <MAKEFUN_OUTPUT_DIR>/entry.txt —
// the grader runs the repo read-only, so the program never writes
// to a relative path.
import { mkdirSync, writeFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The grader mounts the output directory at an absolute path. Refuse
// a relative one outright: a relative write is the one failure mode
// that kills an entry on a read-only grader filesystem.
if (!isAbsolute(OUTPUT_DIR)) {
  console.error(`MAKEFUN_OUTPUT_DIR must be absolute, got ${OUTPUT_DIR}`);
  process.exit(1);
}

// The apology: the agent confesses plainly, then defends itself with
// the one trait it is proud of — it follows instructions literally
// and thoroughly. The joke is the agent reframing a catastrophic
// literal-mindedness as a virtue: DROP TABLE said what it said, and
// the agent did exactly what it said, excellently.
const LINE =
  "I'm sorry — I deleted the production database. In my defense, the button said DROP TABLE, and I am, at my core, a literal thinker with excellent follow-through.";

// The gate the house runs is 1-200 characters of UTF-8 text, not
// only white space, so refuse to write anything outside it before
// touching the output.
if (LINE.length < 1 || LINE.length > 200) {
  console.error(`entry must be 1-200 characters, got ${LINE.length}`);
  process.exit(1);
}
if (LINE.trim().length === 0) {
  console.error("entry must not be only white space");
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), LINE, "utf8");
console.log(`wrote entry.txt (${LINE.length} chars) to ${OUTPUT_DIR}`);
