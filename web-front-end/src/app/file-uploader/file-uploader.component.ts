import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'ipfs-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  uploader: FileUploader = new FileUploader({ url: 'http://127.0.0.1:4000/add' });


  constructor() { }


  ngOnInit() {
    this.uploader.onAfterAddingFile = (file: any) => { file.withCredentials = false; };
  }


  upload() {
    this.uploader.uploadAll();
  }

}
