import { Module } from '@nestjs/common';
import { LoginController } from './controller/login.controller';
import { AuthModule } from '../auth';
import { ReminderController } from './controller/reminder.controller';
import { AdminController } from './controller/admin.controller';
import { AccessControlController } from './controller/access-control.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AdminService } from './service/admin.service';
import { UserController } from './controller/user.controller';

@Module({
	imports: [CqrsModule, AuthModule],
	controllers: [
		AdminController,
		LoginController,
		UserController,
		ReminderController,
		AccessControlController
	],
	providers: [AdminService],
})
export class AdminModule {

}
