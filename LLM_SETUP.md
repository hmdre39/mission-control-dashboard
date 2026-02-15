# LLM Fallback Configuration

This dashboard uses a **3-tier fallback system** for LLM model selection, ensuring your agents always have a working model even if their preferred one fails.

## Configuration

### Default Setup

```
Primary:   Claude Haiku 4.5 (fast, cheap)
Fallback1: Claude Sonnet 4 (balanced)
Fallback2: Claude Opus 4.1 (powerful)
```

### Agent-Specific Models

By default:
- **Coding tasks** → Claude Opus 4.1 (most capable)
- **Strategy tasks** → Claude Opus 4.1 (reasoning)
- **Content tasks** → Claude Haiku 4.5 (fast)
- **General tasks** → Claude Haiku 4.5 (default)

## Environment Variables

Create a `.env.local` file (copy from `.env.example`):

```bash
# Primary model (default for all tasks)
NEXT_PUBLIC_PRIMARY_MODEL=anthropic/claude-haiku-4-5

# Fallback models (used if primary fails)
NEXT_PUBLIC_FALLBACK_1=anthropic/claude-sonnet-4
NEXT_PUBLIC_FALLBACK_2=anthropic/claude-opus-4-1

# Agent-specific overrides
NEXT_PUBLIC_AGENT_CODING_MODEL=anthropic/claude-opus-4-1
NEXT_PUBLIC_AGENT_STRATEGY_MODEL=anthropic/claude-opus-4-1
NEXT_PUBLIC_AGENT_CONTENT_MODEL=anthropic/claude-haiku-4-5

# Retry behavior
NEXT_PUBLIC_MAX_RETRIES=3
NEXT_PUBLIC_RETRY_DELAY_MS=1000
```

## Usage

### Basic: Get the Right Model

```typescript
import { getAgentModel } from "@/lib/llm-config";

// Get the configured model for a task type
const model = getAgentModel("coding");     // → claude-opus-4-1
const model = getAgentModel("content");    // → claude-haiku-4-5
const model = getAgentModel("general");    // → claude-haiku-4-5
```

### Advanced: Automatic Fallback

```typescript
import { callWithFallback } from "@/lib/llm-config";

// Automatically tries models in fallback chain
const result = await callWithFallback("coding", async (model) => {
  return await myAPI.call(model, prompt);
});
```

### Custom: Manual Fallback Loop

```typescript
import { getFallbackChain } from "@/lib/llm-config";

const chain = getFallbackChain("coding");
// → ['claude-opus-4-1', 'claude-sonnet-4', 'claude-haiku-4-5']

for (const model of chain) {
  try {
    return await myAPI.call(model, prompt);
  } catch (error) {
    console.log(`${model} failed, trying next...`);
  }
}
```

### Debug: View Current Config

```typescript
import { logLLMConfig } from "@/lib/llm-config";

logLLMConfig();
// Prints full configuration with all overrides
```

## How It Works

### Fallback Chain

When you call an agent with a specific type:

1. **Check agent override** → Does this agent type have a custom model?
   - Yes? Use it. If it fails, try fallback chain starting from that model.
   - No? Use primary model. If it fails, try fallback chain.

2. **Try fallback models** → Automatically uses the next model in the chain
   - Wait `RETRY_DELAY_MS` between attempts
   - Try up to `MAX_RETRIES` times
   - Throws error if all models fail

### Cost Optimization

- **Primary (Haiku)**: ~90% cheaper than Opus, fast enough for most tasks
- **Fallback1 (Sonnet)**: 3x cost of Haiku, better reasoning
- **Fallback2 (Opus)**: 5x cost of Haiku, best for complex coding

**Result**: You get speed + affordability by default, power when needed.

## Examples

See `src/lib/llm-usage-examples.ts` for complete working examples.

## Integration with OpenClaw

This system is designed to work with OpenClaw's agent sessions:

```typescript
// In your OpenClaw agent code:
import { callWithFallback } from "@/lib/llm-config";

await callWithFallback("coding", async (model) => {
  // model is automatically selected + with fallback
  return await sessions_spawn({
    agentId: "your-agent",
    task: "Write code for X",
    model: model, // Use the selected model
  });
});
```

## Customization

### Change Default Models

Edit `.env.local`:
```bash
NEXT_PUBLIC_PRIMARY_MODEL=anthropic/claude-sonnet-4
NEXT_PUBLIC_FALLBACK_1=anthropic/claude-opus-4-1
```

### Add More Fallbacks

Edit `src/lib/llm-config.ts`:
```typescript
fallbacks: [
  process.env.NEXT_PUBLIC_FALLBACK_1 || "anthropic/claude-sonnet-4",
  process.env.NEXT_PUBLIC_FALLBACK_2 || "anthropic/claude-opus-4-1",
  "anthropic/claude-3-sonnet-20240229", // Add more here
],
```

### Custom Agent Type

Add a new agent type:
```typescript
// In llm-config.ts
export type AgentType = "coding" | "strategy" | "content" | "custom" | "general";

agentOverrides: {
  // ...existing...
  custom: process.env.NEXT_PUBLIC_AGENT_CUSTOM_MODEL || "anthropic/claude-haiku-4-5",
},
```

Then use it:
```typescript
const model = getAgentModel("custom");
```

## Monitoring

Log each retry to understand which models are being used:

```typescript
await callWithFallback(
  "coding",
  (model) => myAPI.call(model, prompt),
  (model, error, attempt) => {
    console.log(`Attempt ${attempt} with ${model} failed:`, error.message);
  }
);
```

## Troubleshooting

### "All models failed"
- Check API credentials
- Verify rate limits aren't exceeded
- Check if Anthropic API is down

### Always using fallback models
- Edit `.env.local` to adjust retry delay
- Check primary model name is correct
- Verify internet connectivity

### Wrong model being used
- Run `logLLMConfig()` to verify configuration
- Check `.env.local` environment variables are set
- Ensure you're using the right `AgentType`

---

**Next Steps:**
1. Copy `.env.example` → `.env.local` and customize
2. Use `getAgentModel()` in your agent code
3. Use `callWithFallback()` for automatic retry
4. Monitor with `logLLMConfig()` during development
