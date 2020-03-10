import { Controller } from '@nestjs/common';
import { Crud, CrudController, Feature } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { CommentEntity } from '../entity/comment.entity';
import { CommentService } from '../comment.service';

@Feature('comments')
@Crud({
	model: {
		type: CommentEntity
	},
	params: {
		postId: {
			field: 'postId',
			type: 'number'
		},
		id: {
			field: 'id',
			type: 'number',
			primary: true
		}
	}
})
@ApiTags('comments')
@Controller('posts/:postId/comments')
export class CommentController implements CrudController<CommentEntity> {
	constructor(public service: CommentService) {}
}
