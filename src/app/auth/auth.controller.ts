import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiImplicitBody, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { CredentialsDto, JwtDto, RegisterDto } from './dto';
import { AuthException } from './exception';
import { AuthService } from './auth.service';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {

	}


	@Post('login')
	@HttpCode(200)
	@ApiImplicitBody({ required: true, type: CredentialsDto, name: 'CredentialsDto' })
	@ApiResponse({ status: 200, description: 'OK', type: JwtDto })
	@ApiResponse({ status: 404, description: 'NOT_FOUND', type: AuthException })
	public async login(@Body() credentials: CredentialsDto): Promise<JwtDto> {
		return {} as any;
	}

	@Post('register')
	@HttpCode(204)
	@ApiImplicitBody({ required: true, type: RegisterDto, name: 'RegisterDto' })
	@ApiResponse({ status: 204, description: 'NO_CONTENT' })
	public async register(@Body() data: RegisterDto): Promise<void> {

	}
}
