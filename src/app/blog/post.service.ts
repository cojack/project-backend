import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PostEntity } from './entity/post.entity';

@Injectable()
export class PostService extends TypeOrmCrudService<PostEntity> {
	constructor(@InjectRepository(PostEntity) repo) {
		super(repo);
	}
}
