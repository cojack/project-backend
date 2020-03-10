import { TokenEntity } from '../entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TokenEntity)
export class TokenRepository extends Repository<TokenEntity> {}
