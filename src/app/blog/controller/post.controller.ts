import { Controller, UseGuards } from '@nestjs/common';
import { PostEntity } from '../entity/post.entity';
import { Crud, CrudAuth, CrudController, Feature } from '@nestjsx/crud';
import { PostService } from '../post.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CrudGuard } from '../../security';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserEntity } from '../../user/entity';

const POSTS_FEATURE = 'posts';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), CrudGuard)
@Feature(POSTS_FEATURE)
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
@CrudAuth({
	filter: (req: Request) => {
		const user = req.user as UserEntity;
		if (user.canAny(POSTS_FEATURE)) {
			return;
		}
		return {author: user.id};
	},
	persist: (req: Request) => ({author: req.user})
})
@ApiTags('posts')
@Controller('posts')
export class PostController implements CrudController<PostEntity> {
	constructor(public service: PostService) {}
}
