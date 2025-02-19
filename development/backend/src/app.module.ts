import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CommentsModule } from './modules/comments/comments.module';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import configuration from './config/configuration';

const configOptions: ConfigModuleOptions = {
  envFilePath: '.env.dev',
  load: [configuration],
  isGlobal: true,
};

const mongooseAsyncOptions: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('database.uri'),
  }),
};

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync(mongooseAsyncOptions),
    UsersModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
