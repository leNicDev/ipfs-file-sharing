import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { UploadFormComponent } from './upload-form/upload-form.component';


@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
