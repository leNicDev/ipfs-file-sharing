import { Pipe, PipeTransform } from '@angular/core';
import { FILE_EXTENSIONS } from '../models/file-extensions';

@Pipe({
  name: 'faFileIcon'
})
export class FaFileIconPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (FILE_EXTENSIONS.archive.indexOf(value) >= 0) {
      return 'fas fa-file-archive';
    }
    else if (FILE_EXTENSIONS.code.indexOf(value) >= 0) {
      return 'fas fa-file-code';
    }
    else if (FILE_EXTENSIONS.graphics.indexOf(value) >= 0) {
      return 'fas fa-file-image';
    }
    else if (FILE_EXTENSIONS.portableDocument.indexOf(value) >= 0) {
      return 'fas fa-file-pdf';
    }
    else if (FILE_EXTENSIONS.presentations.indexOf(value) >= 0) {
      return 'fas fa-file-powerpoint';
    }
    else if (FILE_EXTENSIONS.spreadsheet.indexOf(value) >= 0) {
      return 'fas fa-file-excel';
    }
    else if (FILE_EXTENSIONS.text.indexOf(value) >= 0) {
      return 'fas fa-file-word';
    }
    else if (FILE_EXTENSIONS.video.indexOf(value) >= 0) {
      return 'fas fa-file-video';
    }
    else if (FILE_EXTENSIONS.audio.indexOf(value) >= 0) {
      return 'fas fa-file-audio';
    }
    else {
      return 'fas fa-file';
    }
  }

}
