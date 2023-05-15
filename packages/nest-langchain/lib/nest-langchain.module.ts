import { Module } from "@nestjs/common";
import { AgentBuilderService } from "./agent-builder.service";
import { ToolFactoryService } from "./tool-factory.service";
import { ModelFactoryService } from "./model-factory.service";

@Module({
  imports: [],
  controllers: [],
  providers: [
    AgentBuilderService,
    ToolFactoryService,
    ModelFactoryService,
  ],
  exports: [AgentBuilderService],
})
export class NestLangchainModule {}
