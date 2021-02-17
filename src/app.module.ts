import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, RoleModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
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
