import { Body, Controller, Post, Headers } from '@nestjs/common';
import { AgentBuilderService } from '@bxav/nest-langchain';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentBuilderService) {}

  @Post()
  async agent(@Body() input: any, @Headers() headers) {
    const { agent, tools, llm } = input.config;

    const agentExecutor = await this.agentService.build({
      model: llm,
      agent,
      tools,
    });

    console.log('agentExecutor: ', agentExecutor);

    return agentExecutor.run([input.objective]);
  }
}
