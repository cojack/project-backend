import { EntityRepository, Repository } from 'typeorm';
import { SettingsEntity } from '../entity';

@EntityRepository(SettingsEntity)
export class SettingsRepository extends Repository<SettingsEntity> {

}
