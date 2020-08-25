import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BootstrapModule } from './bootstrap.module';
import { CategoryModule } from './category/infrastructure/category.module';
import { UserModule } from './user/infrastructure/user.module';

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
    CategoryModule,
    UserModule,
  ],
})
export class AppModule {}
