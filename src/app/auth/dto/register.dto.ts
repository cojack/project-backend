import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
	@ApiProperty()
	@IsEmail()
	public readonly email: string;

	@ApiProperty()
	@IsString()
	public password: string;
}
