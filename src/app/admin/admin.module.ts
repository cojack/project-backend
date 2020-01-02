import { Module } from '@nestjs/common';
import { LoginController } from './controller/login.controller';
import { AuthModule } from '../auth';
import { ReminderController } from './controller/reminder.controller';
import { CookieEntity } from './entity/cookie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [AuthModule, TypeOrmModule.forFeature([CookieEntity])],
	controllers: [LoginController, ReminderController]
})
export class AdminModule {

}
