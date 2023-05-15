import { Module } from '@nestjs/common';
import { NestLangchainModule } from '@bxav/nest-langchain';
import { RunAgentCommand } from './run-agent.command';
import { ConfigModule } from '@nestjs/config';
import { AskPathQuestions } from './questions/ask-path.questions';
import { AskObjectiveQuestions } from './questions/ask-objective.questions';
import { BuildAgentCommand } from './build-agent.command';

@Module({
  imports: [ConfigModule.forRoot(), NestLangchainModule],
  providers: [RunAgentCommand, BuildAgentCommand, AskPathQuestions, AskObjectiveQuestions],
})
export class AppModule { }
