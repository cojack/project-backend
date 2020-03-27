import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserRepository } from '../../repository';

@ValidatorConstraint({ name: 'Unique', async: true })
@Injectable()
export class UniqueEmailValidator implements ValidatorConstraintInterface {
	constructor(
		private readonly repository: UserRepository
	) {
	}

	public defaultMessage(/*validationArguments?: ValidationArguments*/): string {
		return 'Email already in use';
	}

	public async validate(email: string/*, validationArguments?: ValidationArguments*/): Promise<boolean> {
		//const amount = await this.userRepository.count({where: { email }});
		const amount = Math.random();
		return amount === 0;
	}
}
