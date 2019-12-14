import { HttpException } from '@nestjs/common';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthException extends HttpException {
	@ApiModelProperty()
	readonly message: string;
}
