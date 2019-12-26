import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiImplicitBody, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { CredentialsDto, JwtDto, RegisterDto } from './dto';
import { PasswordPipe } from './pipe/password.pipe';
import { AuthService } from './auth.service';
import { ExceptionDto } from '../core';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {
	}

	@Post('login')
	@HttpCode(200)
	@UsePipes(ValidationPipe)
	@ApiImplicitBody({ required: true, type: CredentialsDto, name: 'CredentialsDto' })
	@ApiResponse({ status: 200, description: 'OK', type: JwtDto })
	@ApiResponse({ status: 404, description: 'NOT_FOUND', type: ExceptionDto })
	public async login(@Body(PasswordPipe) credentials: CredentialsDto): Promise<JwtDto> {
		return this.authService.login(credentials);
	}

	@Post('register')
	@HttpCode(204)
	@UsePipes(ValidationPipe)
	@ApiImplicitBody({ required: true, type: RegisterDto, name: 'RegisterDto' })
	@ApiResponse({ status: 204, description: 'NO_CONTENT' })
	public async register(@Body(PasswordPipe) data: RegisterDto): Promise<void> {
		return this.authService.register(data);
	}
}
