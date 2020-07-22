import { Inject, Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { USER_REPOSITORY } from '../../user.constant';

@ValidatorConstraint({ name: 'Unique', async: true })
@Injectable()
export class UniqueEmailValidator implements ValidatorConstraintInterface {
	constructor(
		@Inject(USER_REPOSITORY) private readonly userRepository: Repository<UserEntity>
	) {
	}

	public defaultMessage(/*validationArguments?: ValidationArguments*/): string {
		return 'Email already in use';
	}

	public async validate(email: string/*, validationArguments?: ValidationArguments*/): Promise<boolean> {
		const amount = await this.userRepository.count({where: { email }});
		return amount === 0;
	}
}
