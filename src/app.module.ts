import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, RoleModule, AuthModule, BookModule],
})
export class AppModule {
  // * static: always stay in memory
  // * no need to crate an obj to access it
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    // * when app init setting the port
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
