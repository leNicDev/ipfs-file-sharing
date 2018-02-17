import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ipfs-file-info',
  templateUrl: './file-info.component.html',
  styleUrls: ['./file-info.component.scss']
})
export class FileInfoComponent implements OnInit {

  _hash: string;
  _fileName: string;


  constructor(route: ActivatedRoute) {
    this._hash = route.snapshot.params['hash'];
    this._fileName = route.snapshot.params['fileName'];
  }


  ngOnInit() {
  }


  get fileName() {
    let split = this._fileName.split('.');
    let fileName = '';

    for (let i = 0; i < split.length - 1; i++) {
      fileName += split[i];

      if (i > 0 && i < split.length - 2) {
        fileName += '.';
      }
    }

    return fileName;
  }

  get fileExtension() {
    const split = this._fileName.split('.');

    return split[split.length - 1];
  }

  get downloadLink() {
    return `http://127.0.0.1:3000/get/${this._hash}/${this._fileName}`;
  }

  get publicDownloadLink() {
    return `https://ipfs.io/ipfs/${this._hash}`;
  }

}
