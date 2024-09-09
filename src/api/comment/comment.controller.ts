import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/book/:bookId')
  async getBookComments(@Param('bookId') bookId: string) {
    const comments = await this.commentService.getBookComments(bookId);
    return comments;
  }

  @Post()
  async createComment(@Body() comment: Comment) {
    const newComment = await this.commentService.createComment(comment);
    return newComment;
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string) {
    const deletedComment = await this.commentService.deleteCommentById(id);
    return deletedComment;
  }
}
