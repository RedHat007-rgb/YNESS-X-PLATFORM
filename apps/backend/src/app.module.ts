import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource, User } from '@repo/db';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     url: `postgres://${configService.getOrThrow('DATABASE_USERNAME')}:${configService.getOrThrow('DATABASE_PASSWORD')}@${configService.getOrThrow('DATABASE_HOST')}:${configService.getOrThrow('DATABASE_PORT')}/${configService.getOrThrow('DATABASE_NAME')}`,
    //   }),
    //   inject: [ConfigService],
    // }),
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      entities: [User],
      autoLoadEntities: true,
      synchronize: false,
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
