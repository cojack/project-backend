import { ApiModelProperty } from '@nestjs/swagger';

export class ExceptionDto {

	@ApiModelProperty()
	public statusCode: number;

	@ApiModelProperty()
	public error: string;

	@ApiModelProperty({
		required: false
	})
	public message: string;
}
