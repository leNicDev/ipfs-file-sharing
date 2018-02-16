import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'ipfs-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  uploader: FileUploader = new FileUploader({ url: 'http://127.0.0.1:3000/add' });


  constructor() { }


  ngOnInit() {
    this.uploader.onAfterAddingFile = (file: any) => { file.withCredentials = false; };
  }


  upload() {
    this.uploader.uploadAll();
  }


  onFileChange() {
    this.upload();
  }


  get currentFileName(): string {
    if (this.uploader.queue.length < 1) {
      return 'No file selected';
    }

    return this.uploader.queue[0].file.name;
  }

}
