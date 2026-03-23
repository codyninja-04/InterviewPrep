import Anthropic from "@anthropic-ai/sdk";

// Singleton client — instantiated once, reused across API routes
const claude = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const MODEL = "claude-sonnet-4-20250514";
export const MAX_TOKENS = 2048;

export default claude;
