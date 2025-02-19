import { CommonModule } from '@angular/common';
import { Component, effect, input, signal, inject } from '@angular/core';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { Comment } from '../../interfaces/comment.interface';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-comment',
  imports: [CommonModule, CommentFormComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  private commentService = inject(CommentService);
  private userService = inject(UserService);

  comment = input<Comment>();
  isReplying = signal(false);
  isExpanded = signal(false);
  nestedComments = signal<Comment[]>([]);

  nestedCommentsEffect = effect(() => {
    if (this.isExpanded())
      this.commentService
        .getComments(this.comment()?._id)
        .subscribe((comment) => {
          this.nestedComments.set(comment);
        });
  });

  toggleReply() {
    this.isReplying.set(!this.isReplying());
    if (this.isReplying()) this.isExpanded.set(true);
  }

  toggleExpanded() {
    this.isExpanded.set(!this.isExpanded());
  }

  createComment(formValues: { text: string }) {
    const { text } = formValues;
    const user = this.userService.getUserFromStorage();

    if (!user) return;

    this.commentService
      .createComment({
        text,
        userId: user._id,
        parentId: this.comment()?._id,
      })
      .subscribe((crateComment) => {
        this.nestedComments.set([crateComment, ...this.nestedComments()]);
      });
  }

  get userName(): string {
    return this.comment()!.user.name;
  }

  get text(): string {
    return this.comment()!.text;
  }
}
