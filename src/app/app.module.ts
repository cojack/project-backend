import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, TypeOrmConfigService } from './config';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { CoreModule } from './core/core.module';
import { AccessControlModule } from 'nest-access-control';
import { CommandModule } from 'nestjs-command';
import { BlogModule } from './blog/blog.module';

@Module({
	imports: [
		CommandModule,
		ConfigModule,
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useExisting: TypeOrmConfigService
		}),
		/*AccessControlModule.forRootAsync({
			useFactory: () => {}
		}),*/
		CoreModule,
		AuthModule,
		UserModule,
		BlogModule
	]
})
export class AppModule {
}
