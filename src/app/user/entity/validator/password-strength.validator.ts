import { Injectable } from '@nestjs/common';
import zxcvbn from 'zxcvbn';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { SettingsRepository } from '../../../core/repository';

@ValidatorConstraint({ name: 'PasswordStrength', async: true })
@Injectable()
export class PasswordStrengthValidator implements ValidatorConstraintInterface {
	constructor(private readonly settingsRepository: SettingsRepository) {
	}

	public defaultMessage(/*validationArguments?: ValidationArguments*/): string {
		return 'Password is too weak';
	}

	public async validate(password: string/*, validationArguments?: ValidationArguments*/): Promise<boolean> {
		const settings = await this.settingsRepository.findOne();
		const { score } = zxcvbn(password);
		return score >= settings.registration.passwordStrength;
	}
}
