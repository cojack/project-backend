import { ApiProperty } from '@nestjs/swagger';

export class JwtDto {
	@ApiProperty()
	public readonly uuid: string;

	@ApiProperty()
	public readonly expiresIn: number;

	@ApiProperty()
	public readonly expiresAt: Date;

	@ApiProperty()
	public readonly accessToken: string;

	@ApiProperty()
	public readonly refreshToken: string;
}
