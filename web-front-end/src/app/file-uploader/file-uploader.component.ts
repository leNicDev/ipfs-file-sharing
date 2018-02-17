import { Component, EventEmitter } from '@angular/core';
import { UploaderOptions, UploadFile, UploadInput, UploadOutput } from 'ngx-uploader';
import { Router } from '@angular/router';

@Component({
  selector: 'ipfs-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {

  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  dragOver: boolean;

  _uploading: boolean;
  progress = 0;
  speed: string = '0 B/s';


  constructor(public _router: Router) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
  }


  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
      this.files.push(output.file);
    } else if (output.type === 'start' && typeof output.file !== 'undefined') {
      this._uploading = true;
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;

      this.progress = output.file.progress.data.percentage;
      this.speed = output.file.progress.data.speedHuman;
    } else if (output.type === 'done') {
      console.log('Finished upload: ' + JSON.stringify(output));
      this._router.navigate(['/file/' + output.file.response[0] + '/' + output.file.name]);
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://127.0.0.1:3000/add',
      method: 'POST'
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

  get currentFileName() {
    let fileName = '';

    for (let i = 0; i < this.files.length; i++) {
      if (i > 0) {
        fileName += '; ';
      }

      fileName += this.files[i].name;
    }

    return fileName ? fileName : 'No file selected';
  }

}
