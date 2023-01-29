import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.css']
})
export class CaptureComponent implements OnInit {

  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
 /*  private nextWebcam: Subject<any> = new Subject(); */

  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  sysImage = '';

  showCapture: boolean = false;
  showCam: boolean = true;

  sesion: any = sessionStorage.getItem('flag');
  flag = JSON.parse(this.sesion);


  constructor(private router: Router) {
  }

  ngOnInit() {}

  public getSnapshot(): void {
    this.trigger.next(void 0);
    this.showCapture = true;
    this.showCam= false;
  }

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage.imageAsDataUrl;
    if(this.flag==="frontal"){
      sessionStorage.setItem('dniFrontal', JSON.stringify(this.sysImage));
    } else if (this.flag==="back"){
      sessionStorage.setItem('dniBack', JSON.stringify(this.sysImage));
    } else if (this.flag==="selfie"){
      sessionStorage.setItem('dniSelfie', JSON.stringify(this.sysImage));
    }
  }

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
    }
  }

  goToBack(){
    if(this.flag==="frontal" || this.flag==="back"){
      this.router.navigate(['dni']);
    } else if (this.flag==="selfie"){
      this.router.navigate(['selfie']);
    }
    sessionStorage.setItem('flag', JSON.stringify("none"));
  }

  public get videoOptions(): MediaTrackConstraints {
            const result: MediaTrackConstraints = {width:{min:40,ideal:1200},
            height:{min:30,ideal:900}};
        return result;
      }

}
