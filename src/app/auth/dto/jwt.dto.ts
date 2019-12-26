import {ApiModelProperty} from '@nestjs/swagger';

export class JwtDto {
	@ApiModelProperty()
	public readonly expiresIn: number;

	@ApiModelProperty()
	public readonly accessToken: string;

	@ApiModelProperty()
	public readonly refreshToken: string;
}
