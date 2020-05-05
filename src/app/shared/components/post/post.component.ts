import { Component } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: [ './post.component.scss' ]
})
export class PostComponent {
  currentDate: Date;

  constructor() {
    this.currentDate = new Date();
  }
}
