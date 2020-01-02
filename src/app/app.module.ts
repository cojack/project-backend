import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, TypeOrmConfigService } from './config';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { CoreModule } from './core/core.module';
import { CommandModule } from 'nestjs-command';
import { BlogModule } from './blog/blog.module';
import { AdminModule } from './admin/admin.module';
import { SecurityModule } from './security/security.module';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		CommandModule,
		ConfigModule,
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useExisting: TypeOrmConfigService
		}),
		CoreModule,
		AuthModule,
		PassportModule,
		SecurityModule,
		UserModule,
		AdminModule,
		BlogModule
	]
})
export class AppModule {
}
