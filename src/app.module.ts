import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigModule } from './commons/type-orm-config/type-orm-config.module';
import { TypeOrmConfigService } from './commons/type-orm-config/type-orm-config.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './commons/auth/auth.module';
import { StorageModule } from './commons/storage/storage.module';
import { AWSConfigModule } from './commons/awsConfig/aws-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmConfigModule,
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AuthModule,
    AWSConfigModule.forRoot(),
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService, AWSConfigModule],
})
export class AppModule {}
