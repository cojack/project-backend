import { Module } from '@nestjs/common';
import { CommandHandlers } from './command';

@Module({
	providers: [...CommandHandlers]
})
export class CoreModule {

}
