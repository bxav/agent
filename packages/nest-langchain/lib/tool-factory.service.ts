import { Tool } from "langchain/tools";
import { Injectable } from "@nestjs/common";

import { Calculator } from "langchain/tools/calculator";
import * as tools from "langchain/tools";

type ToolConfig = {
  type: string;
  options?: any;
};

@Injectable()
export class ToolFactoryService {
  private verbose = false;
  constructor() {}

  createTool({ type, options }: ToolConfig): Tool {
    switch (type.toLowerCase()) {
      case "calculator":
        return new Calculator(this.verbose);
      case "serpapi":
        return new tools.SerpAPI(
          options.apiKey || process.env.SERPAPI_API_KEY,
          options.params
        );
      case "iftttwebhook":
        return new tools.IFTTTWebhook(
          options.url,
          options.name,
          options.description
        );
      case "dadjokeapi":
        return new tools.DadJokeAPI();
      case "bingserpapi":
        return new tools.BingSerpAPI(options.apiKey, options.params);
      case "requestsgettool":
        return new tools.RequestsGetTool(options.headers, options.params);
      case "aiplugintool":
        return new tools.AIPluginTool(options);
      default:
        throw new Error("Tool not found");
    }
  }
}
