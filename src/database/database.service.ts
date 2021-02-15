import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConnectionOptions } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { Configuration } from '../config/config.keys';

// * can do it like a class with documentation
export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        type: 'mysql',
        // host: config.get(Configuration.HOST),
        // port: 3306,
        // username: config.get(Configuration.USERNAME),
        // password: config.get(Configuration.PASSWORD),
        // database: config.get(Configuration.DATABASE),
        host: 'localhost',
        port: 3306,
        username: 'nest',
        password: 'app12',
        database: 'bookstore',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '../database/migrations/*{.ts,.js}'],
        synchronize: true,
      } as ConnectionOptions;
    },
  }),
];
