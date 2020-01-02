import {ApiProperty} from '@nestjs/swagger';

export class TokenDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	expiresIn: number;

	@ApiProperty()
	audience: string;

	@ApiProperty()
	issuer: string;
}
