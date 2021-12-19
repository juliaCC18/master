import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { DashboardModule } from 'src/component/dashboardComponent/dashboard.module';
import { SuccessModule } from 'src/component/successComponent/successComponent.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DashboardModule,
    NzLayoutModule,
    NzMessageModule,
    SuccessModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
