import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Repository } from 'typeorm';
import { GRANT_LIST_TOKEN } from './security.constants';
import { AccessControlEntity } from './entity';
import { AccessControlRepository } from './repository';
import { GrantListDto } from './dto';
import { classToPlain, plainToClass } from 'class-transformer';

export const accessControlProviders: Provider[] = [
	{
		provide: GRANT_LIST_TOKEN,
		useFactory: async (repository: Repository<AccessControlEntity>): Promise<GrantListDto[]> => {
			const accessControlList = await repository.find({ relations: ['role'] });
			const plainList = classToPlain<AccessControlEntity>(accessControlList);
			return plainToClass(GrantListDto, plainList, {
				excludeExtraneousValues: true
			});
		},
		inject: [AccessControlRepository]
	}
];
