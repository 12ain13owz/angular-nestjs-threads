import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../environment';
import { Comment } from '../interfaces/comment.interface';

type CreateCommentDto = {
  parentId?: string;
  text: string;
  userId: string;
};

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http = inject(HttpClient);

  getComments(parentId: string = '') {
    let url = `${enviroment.API_BASE_URL}/comments`;
    if (parentId) url += `?parentId=${parentId}`;

    return this.http.get<Comment[]>(url);
  }

  createComment(comment: CreateCommentDto) {
    return this.http.post<Comment>(
      `${enviroment.API_BASE_URL}/comments`,
      comment,
    );
  }
}
