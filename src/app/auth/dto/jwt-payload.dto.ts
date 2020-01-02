export interface JwtPayloadDto {
	identity: string;
	expiresIn: number;
	audience: string;
	issuer: string;
}
