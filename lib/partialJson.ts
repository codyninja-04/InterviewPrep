/**
 * Best-effort repair of a truncated JSON string so it can be JSON.parse'd.
 * Tracks open strings, objects, arrays, and trailing commas. Designed for
 * progressively parsing streamed AI output — do NOT use for trusted parsing.
 */
export function repairPartialJson(input: string): string {
  // Strip markdown fences if present
  let s = input.trim();
  if (s.startsWith("```")) {
    s = s.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
  }

  const stack: string[] = []; // "{" or "["
  let inString = false;
  let escape = false;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    if (escape) {
      escape = false;
      continue;
    }
    if (ch === "\\") {
      escape = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;

    if (ch === "{" || ch === "[") stack.push(ch);
    else if (ch === "}" || ch === "]") stack.pop();
  }

  let out = s;

  // Close an unterminated string
  if (inString) out += '"';

  // Trim a dangling property key like `,"strengths":` or `"strengths":`
  // Strategy: if the tail (after last complete value) ends with `:` or `,`,
  // strip back to the last safe character.
  out = out.replace(/,\s*$/, "");
  out = out.replace(/:\s*$/, ": null");

  // Close any open structures
  while (stack.length) {
    const open = stack.pop();
    out += open === "{" ? "}" : "]";
  }

  return out;
}

/** Try to parse partial JSON; returns undefined on failure. */
export function tryParsePartial<T>(input: string): T | undefined {
  try {
    return JSON.parse(repairPartialJson(input)) as T;
  } catch {
    return undefined;
  }
}
