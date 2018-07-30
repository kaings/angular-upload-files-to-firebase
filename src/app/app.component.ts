import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  onSelect(event: MSInputMethodContext) {
    const target: HTMLInputElement = <HTMLInputElement>event.target;
    const files: FileList = target.files;
    const file: File = files[0];

    console.log('selected filename: ', file.name);
    console.log('selected file object: ', file);
  }

  uploadSingle() {

  }

  uploadMultiple() {

  }
}
