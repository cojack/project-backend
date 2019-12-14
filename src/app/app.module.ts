import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, TypeOrmConfigService } from './config';
import { AuthModule } from './auth';
import { UserModule } from './user';

@Module({
	imports: [
		ConfigModule,
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useExisting: TypeOrmConfigService
		}),
		AuthModule,
		UserModule
	]
})
export class AppModule {
}
