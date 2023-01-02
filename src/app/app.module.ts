import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { DniComponent } from './components/dni/dni.component';
import { SelfieComponent } from './components/selfie/selfie.component';
import { WebcamModule } from 'ngx-webcam';
import { CaptureComponent } from './components/capture/capture.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PruebaClienteComponent } from './components/prueba-cliente/prueba-cliente.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerModule } from './components/spinner/spinner.module';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    InstructionsComponent,
    DniComponent,
    SelfieComponent,
    CaptureComponent,
    PruebaClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    HttpClientModule,
    FormsModule,
    SpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
