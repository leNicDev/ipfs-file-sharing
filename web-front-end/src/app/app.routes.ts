import { Routes } from '@angular/router';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { FileInfoComponent } from './file-info/file-info.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UploadFormComponent
  },
  {
    path: 'file/:hash/:fileName',
    component: FileInfoComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
