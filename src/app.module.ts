import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppModule as ExampleModule } from './app/infrastructure/app.module';
import { BootstrapModule } from './bootstrap.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env.local',
      ],
    }),
    BootstrapModule,
    ExampleModule,
  ],
})
export class AppModule {}
