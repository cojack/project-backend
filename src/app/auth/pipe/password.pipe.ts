import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '../../config';
import { passwordHash } from '../../core/helper';

interface PartialDataWithPassword {
	readonly [key: string]: string;
	password: string;
}

@Injectable()
export class PasswordPipe implements PipeTransform<PartialDataWithPassword, PartialDataWithPassword> {
	constructor(private readonly configService: ConfigService) {}

	public transform(data: PartialDataWithPassword): PartialDataWithPassword {
		data.password = passwordHash(data.password, this.configService.getEnv('APP_SALT'));
		return data;
	}
}
