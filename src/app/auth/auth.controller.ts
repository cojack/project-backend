import { Body, Controller, HttpCode, Post, UseGuards, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CredentialsDto, JwtDto, RegisterDto } from './dto';
import { PasswordPipe } from './pipe/password.pipe';
import { AuthService } from './auth.service';
import { ExceptionDto } from '../core';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {
	}

	@Post('login')
	@HttpCode(200)
	@UsePipes(ValidationPipe)
	@ApiBody({ required: true, type: CredentialsDto })
	@ApiResponse({ status: 200, description: 'OK', type: JwtDto })
	@ApiResponse({ status: 404, description: 'NOT_FOUND', type: ExceptionDto })
	public async login(@Body(PasswordPipe) credentials: CredentialsDto): Promise<JwtDto> {
		const { authToken } = await this.authService.login(credentials);
		return authToken;
	}

	@Post('register')
	@HttpCode(204)
	@UsePipes(ValidationPipe)
	@ApiBody({ required: true, type: RegisterDto })
	@ApiResponse({ status: 204, description: 'NO_CONTENT' })
	public async register(@Body(PasswordPipe) data: RegisterDto): Promise<void> {
		return this.authService.register(data);
	}

	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth()
	@Post('login2')
	async login2(@Request() req) {
		return req.user;
	}
}
