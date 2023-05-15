import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ApiKeyMiddleware } from './api-key.middleware';
import { AgentController } from './agent.controller';
import { NestLangchainModule } from '@bxav/nest-langchain';

@Module({
  imports: [NestLangchainModule],
  controllers: [AgentController],
  providers: [
    AgentController,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
