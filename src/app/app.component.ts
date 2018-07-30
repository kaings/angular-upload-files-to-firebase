import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  selectedFile: File;
  imageFilePath: string;

  constructor() {}

  ngOnInit() {
    firebase.initializeApp(environment.firebaseConfig);
  }
  /*
  onSelect(event: MSInputMethodContext) {
    const target: HTMLInputElement = <HTMLInputElement>event.target;
    const files: FileList = target.files;
    const file: File = files[0];

    console.log('selected filename: ', file.name);
    console.log('selected file object: ', file);
  }
  */

  /* another way of onSelect() */
  onSelect(event: any) {
    const file: File = event.target.files[0]

    console.log('selected filename: ', file.name);
    console.log('selected file object: ', file);

    this.selectedFile = file;
  }

  uploadSingle() {
    const metaData = {'contentType': this.selectedFile.type};
    const storageRef: firebase.storage.Reference = firebase.storage().ref(`/upload-v1/attachments/${this.selectedFile.name}`);


    /* store file into firebase storage & get its  download URL at the same time */
    storageRef.put(this.selectedFile, metaData)
      .then(
      (data: any) => {
        console.log('uploaded file...', data);
        console.log('getDownloadURL() method, gives you a promise...', data.ref.getDownloadURL());
        data.ref.getDownloadURL().then(
          (dlUrl: any) => {
            console.log('download URL (upon upload retrieve from promise)...', dlUrl);
            this.imageFilePath = dlUrl;
          }
        );
      }
    )
      .catch(
        (error: any) => {
          console.log('upload error...', error);
        }
      );


    /* getting file download URL by specifying the file path */
    /*
    firebase.storage().ref('/upload-v1/attachments/huubaper-chris.jpg').getDownloadURL()
      .then(
        (dlURL: any) => {
          console.log('download URL...', dlURL);
        }
      )
      .catch(
        (error: any) => {
          console.log('getDlURL...', error);
        }
      );
    */

    console.log('File uploaded successfully!! Filename is ', this.selectedFile.name);
  }

  uploadMultiple() {

  }
}
