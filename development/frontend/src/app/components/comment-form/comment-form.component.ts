import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  imports: [],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
})
export class CommentFormComponent {
  placeholder = input('Write something ...');
  buttonText = input('Create');
  formSubmitted = output<{ text: string }>();

  formSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const textAreaEl = form.elements.namedItem(
      'commentText',
    ) as HTMLTextAreaElement;
    const commentText = textAreaEl.value;

    form.reset();
    this.formSubmitted.emit({ text: commentText });
  }
}
