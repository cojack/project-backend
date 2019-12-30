import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './controller/post.controller';
import { PostEntity } from './entity/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entity/comment.entity';
import { CommentController } from './controller/comment.controller';
import { CommentService } from './comment.service';

@Module({
	imports: [TypeOrmModule.forFeature([PostEntity, CommentEntity])],
	controllers: [PostController, CommentController],
	providers: [PostService, CommentService]
})
export class BlogModule {

}
