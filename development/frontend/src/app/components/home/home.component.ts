import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../interfaces/comment.interface';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CommentComponent, CommentFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  commentService = inject(CommentService);
  userService = inject(UserService);

  comments = signal<Comment[]>([]);

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService
      .getComments()
      .subscribe((comments) => this.comments.set(comments));
  }

  createComment(formValues: { text: string }) {
    const { text } = formValues;
    const user = this.userService.getUserFromStorage();

    if (!user) return;

    this.commentService
      .createComment({
        text,
        userId: user._id,
      })
      .subscribe((crateComment) => {
        this.comments.set([crateComment, ...this.comments()]);
      });
  }
}
