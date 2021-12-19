
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { SuccessComponent } from './successComponent.component';

@NgModule({
  declarations: [SuccessComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ScrollingModule,
    DragDropModule,
    NgZorroAntdModule
  ],
  bootstrap: [SuccessComponent],
  providers: [SuccessComponent],
})
export class SuccessModule {}