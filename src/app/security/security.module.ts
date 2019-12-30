import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlEntity } from './entity/access-control.entity';

@Module({
	imports: [TypeOrmModule.forFeature([AccessControlEntity])]
})
export class SecurityModule {

}
