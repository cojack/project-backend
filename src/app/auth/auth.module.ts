import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CqrsModule } from '@nestjs/cqrs';
import { PasswordPipe } from './pipe/password.pipe';
import { JwtService } from './jwt.service';

@Module({
	imports: [CqrsModule],
	controllers: [AuthController],
	providers: [AuthService, JwtService, PasswordPipe],
})
export class AuthModule {

}
