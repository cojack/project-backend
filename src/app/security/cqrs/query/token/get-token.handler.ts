import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TokenRepository } from '../../../repository';
import { GetTokenQuery } from './get-token.query';
import { TokenEntity } from '../../../entity';

@QueryHandler(GetTokenQuery)
export class GetTokenHandler implements IQueryHandler<GetTokenQuery> {
	constructor(private readonly repository: TokenRepository) {
	}

	async execute(query: GetTokenQuery): Promise<TokenEntity> {
		return this.repository.findOne({ where: { uuid: query.token.identity }, relations: ['user'] });
	}
}
