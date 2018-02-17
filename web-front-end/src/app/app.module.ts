import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgUploaderModule } from 'ngx-uploader';

import { AppComponent } from './app.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { FileInfoComponent } from './file-info/file-info.component';
import { FaFileIconPipe } from './pipes/fa-file-icon.pipe';


@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent,
    UploadFormComponent,
    ProgressbarComponent,
    FileInfoComponent,
    FaFileIconPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    NgUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
