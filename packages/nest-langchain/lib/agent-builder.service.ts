import { Injectable } from "@nestjs/common";

import {
  AgentExecutor,
  initializeAgentExecutorWithOptions,
} from "langchain/agents";
import { ModelFactoryService } from "./model-factory.service";
import { ToolFactoryService } from "./tool-factory.service";

interface ToolConfig {
  type: string;
  options?: any;
}

interface ModelConfig {
  type: string;
  options?: any;
}

type AgentType = "zero-shot-react-description" | "chat-zero-shot-react-description" | "chat-conversational-react-description";

interface AgentConfig {
  type?: AgentType;
  options?: any;
}

type AgentBuilderParams = {
  model: ModelConfig;
  agent: AgentConfig;
  tools: ToolConfig[];
};

@Injectable()
export class AgentBuilderService {
  constructor(
    private toolFactory: ToolFactoryService,
    private modelFactory: ModelFactoryService
  ) {}

  async build({
    model,
    agent,
    tools,
  }: AgentBuilderParams): Promise<AgentExecutor> {
    const modelInstance = this.modelFactory.createModel(model);
    if (!modelInstance) {
      throw new Error("Model not found");
    }

    const toolsInstances = tools
      .map((toolConfig) => this.toolFactory.createTool(toolConfig))
      .filter((tool) => tool !== null);

    return initializeAgentExecutorWithOptions(toolsInstances, modelInstance, {
      agentType: agent.type || "zero-shot-react-description",
      agentArgs: agent.options,
    });
  }
}
