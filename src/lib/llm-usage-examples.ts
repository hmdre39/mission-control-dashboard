/**
 * Example usage of the LLM Fallback System
 * Copy patterns from here into your agent code
 */

import { callWithFallback, getAgentModel, getFallbackChain, logLLMConfig } from "./llm-config";

// ============================================
// Example 1: Simple Model Selection
// ============================================
export function exampleSimpleSelection() {
  // Get the right model for your agent
  const contentModel = getAgentModel("content"); // → claude-haiku-4-5
  const codingModel = getAgentModel("coding"); // → claude-opus-4-1
  const strategyModel = getAgentModel("strategy"); // → claude-opus-4-1

  console.log("Content model:", contentModel);
  console.log("Coding model:", codingModel);
  console.log("Strategy model:", strategyModel);
}

// ============================================
// Example 2: View Fallback Chain
// ============================================
export function exampleFallbackChain() {
  const chain = getFallbackChain("coding");
  // → [
  //   'anthropic/claude-opus-4-1',
  //   'anthropic/claude-sonnet-4',
  //   'anthropic/claude-haiku-4-5'
  // ]

  console.log("Fallback chain for coding:", chain);
}

// ============================================
// Example 3: Call with Automatic Fallback
// ============================================
export async function exampleCallWithFallback() {
  // Your API call function (replace with real implementation)
  const mockApiCall = async (model: string, prompt: string) => {
    console.log(`Calling ${model} with: "${prompt}"`);

    // Simulate random failure for demo
    if (Math.random() > 0.5) {
      throw new Error("API temporarily unavailable");
    }

    return { model, response: "Generated response" };
  };

  try {
    const result = await callWithFallback("coding", (model) => mockApiCall(model, "Write a function"), (model, error, attempt) => {
      console.log(`Attempt ${attempt} failed on ${model}: ${error.message}`);
      console.log(`Trying fallback...`);
    });

    console.log("Success:", result);
  } catch (error) {
    console.error("All models failed:", error);
  }
}

// ============================================
// Example 4: Real Agent Integration Pattern
// ============================================
export async function exampleAgentIntegration() {
  interface AgentTask {
    type: "coding" | "strategy" | "content";
    prompt: string;
  }

  const task: AgentTask = {
    type: "coding",
    prompt: "Write a TypeScript function to calculate Fibonacci",
  };

  // This pattern works with OpenClaw's API
  try {
    const result = await callWithFallback(task.type, async (model) => {
      // Replace with your actual API call
      // const response = await fetch('/api/agent', {
      //   method: 'POST',
      //   body: JSON.stringify({ model, prompt: task.prompt })
      // });
      // return response.json();

      console.log(`Using ${model} for ${task.type} task`);
      return { success: true, model };
    });

    console.log("Task completed with model:", result.model);
  } catch (error) {
    console.error("Task failed:", error);
  }
}

// ============================================
// Example 5: Logging Configuration
// ============================================
export function exampleLogConfig() {
  logLLMConfig();
  // Output:
  // === LLM Configuration ===
  // Primary Model: anthropic/claude-haiku-4-5
  // Fallback Chain: [ 'anthropic/claude-sonnet-4', 'anthropic/claude-opus-4-1' ]
  // Agent Overrides:
  //   coding: anthropic/claude-opus-4-1
  //   strategy: anthropic/claude-opus-4-1
  //   content: anthropic/claude-haiku-4-5
  //   general: anthropic/claude-haiku-4-5
  // Retry Settings:
  //   Max Retries: 3
  //   Retry Delay: 1000ms
  // ========================
}

// ============================================
// Quick Reference
// ============================================
/*
 
Usage in your agent code:

1. SIMPLE - Get the right model:
   const model = getAgentModel('coding'); // for code generation
   const model = getAgentModel('content'); // for content writing
   
2. FALLBACK - Auto-retry with fallback:
   const result = await callWithFallback('coding', (model) => {
     return callYourAPI(model, prompt);
   });

3. CUSTOM - Handle retries yourself:
   const chain = getFallbackChain('coding');
   for (const model of chain) {
     try {
       return await callYourAPI(model, prompt);
     } catch (e) {
       console.log(`${model} failed, trying next...`);
     }
   }

4. DEBUG - See current config:
   logLLMConfig();

Models:
  - Haiku 4.5: Fast, cheap (default)
  - Sonnet 4: Balanced (fallback 1)
  - Opus 4.1: Powerful, expensive (coding/strategy)
*/
