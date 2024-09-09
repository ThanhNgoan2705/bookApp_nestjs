import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Comment } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommentService {
  constructor(private readonly prismaServer: PrismaService) {}

  async getBookComments(bookId: string) {
    const comments = await this.prismaServer.comment.findMany({
      where: {
        bookId: bookId,
      },
    });
    await Promise.all(
      comments.map(async (comment) => {
        comment['user'] = await this.prismaServer.user.findUnique({
          where: {
            id: comment.userId,
          },
          select: {
            id: true,
            username: true,
            image: true,
          },
        });
      }),
    );

    return comments;
  }

  async createComment(comment: Comment) {
    const newComment = await this.prismaServer.comment.create({
      data: {
        id: uuidv4(),
        bookId: comment['bookId'],
        userId: comment['userId'],
        content: comment['content'],
      },
    });
    return newComment;
  }

  async deleteCommentById(id: string) {
    const deletedComment = await this.prismaServer.comment.delete({
      where: {
        id: id,
      },
    });
    return deletedComment;
  }
}
