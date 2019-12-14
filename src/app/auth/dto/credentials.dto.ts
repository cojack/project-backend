import { ApiModelProperty } from '@nestjs/swagger';

export class CredentialsDto {
	@ApiModelProperty()
	public readonly email: string;

	@ApiModelProperty()
	public readonly password: string;
}
