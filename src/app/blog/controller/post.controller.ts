import { Controller } from '@nestjs/common';
import { PostEntity } from '../entity/post.entity';
import { Crud, CrudController } from '@nestjsx/crud';
import { PostService } from '../post.service';
import { ApiUseTags } from '@nestjs/swagger';

@Crud({
	model: {
		type: PostEntity
	},
	query: {
		join: {
			comments: {
				eager: true
			}
		}
	}
})
@ApiUseTags('posts')
@Controller('posts')
export class PostController implements CrudController<PostEntity> {
	constructor(public service: PostService) {
	}
}
