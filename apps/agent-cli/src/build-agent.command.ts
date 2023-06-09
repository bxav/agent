import * as yaml from 'js-yaml';
import {
  Command,
  CommandRunner,
  InquirerService,
  Option,
} from 'nest-commander';
import { loadConfig } from './utils';
import { join } from 'path';
import * as fs from 'fs';

@Command({
  name: 'build',
  description: 'Config and Run Agent',
})
export class BuildAgentCommand extends CommandRunner {
  constructor(private readonly inquirer: InquirerService) {
    super();
  }

  async run(passedParam: string[], options: { input?: string }): Promise<void> {
    let path = passedParam[0];

    let configData;
    if (!path) {
      configData = await loadConfig(
        'https://raw.githubusercontent.com/bxav/agent/main/apps/agent-cli/examples/examples.yaml',
      );
    } else {
      configData = await loadConfig(join(path, 'examples.yaml'));
    }

    const example = await this.inquirer.inquirer.prompt([
      {
        type: 'list',
        name: 'example',
        message: 'What do you want to do?',
        choices: configData.examples.map((c) => ({
          name: c.name,
          value: { ...c },
        })),
      },
    ]);
    const args = await this.inquirer.inquirer.prompt(
      example.example.args.map((arg) => ({
        name: arg.inTemplate,
        message: arg.name,
      })),
    );

    const rawFile = (await loadConfig(example.example.file, true)).replace(
      new RegExp(Object.keys(args).join('|'), 'g'),
      (k) => args[k],
    );

    const { file } = await this.inquirer.inquirer.prompt([
      { name: 'file', message: 'What name do you want to give your file?' },
    ]);

    await fs.writeFileSync(join(process.cwd(), file), rawFile, 'utf8');
  }

  @Option({
    flags: '-i, --input [string]',
    description: 'Your objective',
  })
  parseInput(val: string): string {
    return val;
  }
}
