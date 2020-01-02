import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordPipe } from './pipe/password.pipe';
import { JwtService } from './jwt.service';
import { CookieStrategy, JwtStrategy } from './strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Global()
@Module({
	imports: [CqrsModule],
	controllers: [AuthController],
	providers: [AuthService, JwtService, JwtStrategy, LocalStrategy, CookieStrategy, PasswordPipe],
	exports: [AuthService]
})
export class AuthModule {

}
