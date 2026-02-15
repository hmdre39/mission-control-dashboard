/**
 * LLM Configuration & Fallback Chain
 * Manages model selection with automatic failover
 */

export type AgentType = "coding" | "strategy" | "content" | "general";

interface LLMConfig {
  primary: string;
  fallbacks: string[];
  agentOverrides: Record<AgentType, string>;
  maxRetries: number;
  retryDelayMs: number;
}

// Load config from environment variables
const llmConfig: LLMConfig = {
  primary: process.env.NEXT_PUBLIC_PRIMARY_MODEL || "anthropic/claude-haiku-4-5",
  fallbacks: [
    process.env.NEXT_PUBLIC_FALLBACK_1 || "anthropic/claude-sonnet-4",
    process.env.NEXT_PUBLIC_FALLBACK_2 || "anthropic/claude-opus-4-1",
  ],
  agentOverrides: {
    coding: process.env.NEXT_PUBLIC_AGENT_CODING_MODEL || "anthropic/claude-opus-4-1",
    strategy: process.env.NEXT_PUBLIC_AGENT_STRATEGY_MODEL || "anthropic/claude-opus-4-1",
    content: process.env.NEXT_PUBLIC_AGENT_CONTENT_MODEL || "anthropic/claude-haiku-4-5",
    general: process.env.NEXT_PUBLIC_PRIMARY_MODEL || "anthropic/claude-haiku-4-5",
  },
  maxRetries: parseInt(process.env.NEXT_PUBLIC_MAX_RETRIES || "3"),
  retryDelayMs: parseInt(process.env.NEXT_PUBLIC_RETRY_DELAY_MS || "1000"),
};

/**
 * Get the model for a specific agent type
 * If override exists, use it; otherwise use primary
 */
export function getAgentModel(agentType: AgentType = "general"): string {
  return llmConfig.agentOverrides[agentType] || llmConfig.primary;
}

/**
 * Get the full fallback chain for a task
 * Returns [primary, fallback1, fallback2, ...]
 */
export function getFallbackChain(agentType: AgentType = "general"): string[] {
  const primary = getAgentModel(agentType);
  return [primary, ...llmConfig.fallbacks.filter((f) => f !== primary)];
}

/**
 * Get the next model in the fallback chain
 * Used after a model fails
 */
export function getNextFallback(currentModel: string, agentType: AgentType = "general"): string | null {
  const chain = getFallbackChain(agentType);
  const currentIndex = chain.indexOf(currentModel);
  return currentIndex >= 0 && currentIndex < chain.length - 1 ? chain[currentIndex + 1] : null;
}

/**
 * Example retry logic with fallback
 * Usage: await callWithFallback(agentType, (model) => api.call(model, prompt))
 */
export async function callWithFallback<T>(
  agentType: AgentType,
  fn: (model: string) => Promise<T>,
  onRetry?: (model: string, error: Error, attemptNumber: number) => void
): Promise<T> {
  const chain = getFallbackChain(agentType);
  let lastError: Error | null = null;

  for (let i = 0; i < chain.length; i++) {
    const model = chain[i];
    try {
      return await fn(model);
    } catch (error) {
      lastError = error as Error;
      if (onRetry) {
        onRetry(model, lastError, i + 1);
      }
      // Wait before retrying
      if (i < chain.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, llmConfig.retryDelayMs));
      }
    }
  }

  throw new Error(
    `All models failed after ${chain.length} attempts. Last error: ${lastError?.message || "Unknown error"}`
  );
}

/**
 * Print config for debugging
 */
export function logLLMConfig(): void {
  console.log("=== LLM Configuration ===");
  console.log("Primary Model:", llmConfig.primary);
  console.log("Fallback Chain:", llmConfig.fallbacks);
  console.log("\nAgent Overrides:");
  Object.entries(llmConfig.agentOverrides).forEach(([agent, model]) => {
    console.log(`  ${agent}: ${model}`);
  });
  console.log("\nRetry Settings:");
  console.log(`  Max Retries: ${llmConfig.maxRetries}`);
  console.log(`  Retry Delay: ${llmConfig.retryDelayMs}ms`);
  console.log("========================\n");
}

// Export config for advanced usage
export { llmConfig };
