import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
	@ApiModelProperty()
	@IsEmail()
	public readonly email: string;

	@ApiModelProperty()
	@IsString()
	public password: string;
}
