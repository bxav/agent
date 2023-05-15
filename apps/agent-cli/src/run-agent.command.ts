import { AgentBuilderService } from '@bxav/nest-langchain';
import {
  Command,
  CommandRunner,
  InquirerService,
  Option,
} from 'nest-commander';
import { loadConfig } from './utils';

@Command({
  name: 'run',
  options: { isDefault: true },
  description: 'Run Agent',
})
export class RunAgentCommand extends CommandRunner {
  constructor(
    private readonly agentService: AgentBuilderService,
    private readonly inquirer: InquirerService,
  ) {
    super();
  }

  async run(passedParam: string[], options: { input?: string }): Promise<void> {
    const path = passedParam[0] || (await this.promptForPath());
    const objective = options.input || (await this.promptForObjective());

    const configData = await loadConfig(path);
    const agentExecutor = await this.buildAgentExecutor(configData);

    if (configData.agent.type.startsWith('chat-')) {
      let question = objective;
      while (true) {
        const result = await agentExecutor.call({ input: question });
        question = (await this.promptForQuestion(result.output)).question;
      }
    } else {
      const result = await agentExecutor.run([objective]);
      console.log(result);
    }
  }

  async promptForPath(): Promise<string> {
    const { path } = await this.inquirer.ask<{ path: string }>(
      'ask-path-questions',
      undefined,
    );
    return path;
  }

  async promptForObjective(): Promise<string> {
    const { objective } = await this.inquirer.ask<{ objective: string }>(
      'ask-objective-questions',
      undefined,
    );
    return objective;
  }

  async promptForQuestion(message: string): Promise<{ question: string }> {
    return this.inquirer.inquirer.prompt([{ name: 'question', message }]);
  }

  async buildAgentExecutor(configData: any): Promise<any> {
    return this.agentService.build({
      model: configData.llm,
      agent: configData.agent,
      tools: configData.tools,
    });
  }

  @Option({
    flags: '-i, --input [string]',
    description: 'Your objective',
  })
  parseInput(val: string): string {
    return val;
  }
}
