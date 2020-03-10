import { AccessControlEntity } from '../entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(AccessControlEntity)
export class AccessControlRepository extends Repository<AccessControlEntity> {}
