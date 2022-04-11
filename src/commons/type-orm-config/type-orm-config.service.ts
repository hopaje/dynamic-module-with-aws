import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { writeFile, writeFileSync } from 'fs';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {
    this.writeMigrationFile();
  }

  writeMigrationFile(): void {
    const path = join(__dirname, '../../', 'ormconfig.json');
    const config = this.createTypeOrmOptions();
    const entities = [__dirname + '/../**/*.entity{.ts,.js}'];

    const fileData = JSON.stringify({
      ...config,
      entities,
      cli: {
        migrationsDir: 'src/migration',
      },
      migrations: ['src/migration/*.ts'],
    });
    writeFileSync(path, fileData);
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      entities: [],
      synchronize: false,
      autoLoadEntities: true,
      keepConnectionAlive: false,
    };
  }
}
