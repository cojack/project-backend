import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiUseTags } from '@nestjs/swagger';
import { CommentEntity } from '../entity/comment.entity';
import { CommentService } from '../comment.service';

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
@ApiUseTags('comments')
@Controller('posts/:postId/comments')
export class CommentController implements CrudController<CommentEntity> {
	constructor(public service: CommentService) {
	}
}
