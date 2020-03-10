import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
	@ApiProperty()
	public identity: string;

	@ApiProperty()
	public expiresIn: number;

	@ApiProperty()
	public audience: string;

	@ApiProperty()
	public issuer: string;
}
