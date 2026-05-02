const AI_TOOLS = new Set(['claude', 'gpt', 'gpt-4', 'gpt-5', 'mistral', 'whisper', 'openai', 'anthropic', 'embeddings']);

export function chipClass(tool: string): string {
  return AI_TOOLS.has(tool.toLowerCase()) ? 'chip chip-ember' : 'chip chip-violet';
}
