import { Expose } from 'class-transformer';

export class GrantListDto {
	@Expose()
	public role: string;

	@Expose()
	public resource: string;

	@Expose()
	public action: string;

	@Expose()
	public possession: string;
}
