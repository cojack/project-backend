import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CredentialsDto {
	@ApiModelProperty()
	@IsEmail()
	public readonly email: string;

	@ApiModelProperty()
	@IsString()
	public readonly password: string;
}
