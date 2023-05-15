import { Injectable } from "@nestjs/common";

import { BaseLanguageModel } from "langchain/dist/base_language";
import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";

type ModelConfig = {
  type: string;
  options?: any;
};

@Injectable()
export class ModelFactoryService {
  createModel({ type, options }: ModelConfig): BaseLanguageModel {
    switch (type.toLowerCase()) {
      case "openai":
        return new OpenAI(options);
      case "chatopenai":
        return new ChatOpenAI(options);
      default:
        throw new Error("Model not found");
    }
  }
}
