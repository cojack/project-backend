import { Controller, UseGuards } from '@nestjs/common';
import { PostEntity } from '../entity/post.entity';
import { Crud, CrudController, Feature } from '@nestjsx/crud';
import { PostService } from '../post.service';
import { ApiTags } from '@nestjs/swagger';
import { CrudGuard } from '../../security';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'), CrudGuard)
@Feature('posts')
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
@ApiTags('posts')
@Controller('posts')
export class PostController implements CrudController<PostEntity> {
	constructor(public service: PostService) {
	}
}
