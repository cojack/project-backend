import { EntityRepository, Repository } from 'typeorm';
import { RoleEntity } from '../entity';

@EntityRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity> {

}
