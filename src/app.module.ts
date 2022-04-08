import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigModule } from './type-orm-config/type-orm-config.module';
import { TypeOrmConfigService } from './type-orm-config/type-orm-config.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    TypeOrmConfigModule,
    TypeOrmModule.forRootAsync({useClass: TypeOrmConfigService}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
