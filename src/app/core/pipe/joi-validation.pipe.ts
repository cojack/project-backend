import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Schema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
	constructor(private readonly schema: Schema) {}

	public transform(value: object): object {
		const { error } = this.schema.validate(value);
		if (error) {
			throw new BadRequestException('Validation failed');
		}
		return value;
	}
}
