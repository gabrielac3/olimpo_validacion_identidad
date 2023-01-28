import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  constructor(private router: Router) {
  }
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string | undefined;
  public messages: any[] = [];

  sysImage = '';

  showCapture: boolean = false;
  showCam: boolean = true;

  sesion: any = sessionStorage.getItem('flag');
  flag = JSON.parse(this.sesion);

  // latest snapshot
  public webcamImage!: WebcamImage;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  public ngOnInit(): void {
    this.readAvailableVideoInputs();
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

//igual
  public handleInitError(error: WebcamInitError): void {
    this.messages.push(error);
    if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
      this.addMessage('User denied camera access');
    }
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

  addMessage(message: any): void {
    console.log(message);
    this.messages.unshift(message);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  //igual
  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    return result;
  }

  private readAvailableVideoInputs() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public getSnapshot(): void {
    this.trigger.next(void 0);
    this.showCapture = true;
    this.showCam= false;
  }

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  goToBack(){
    if(this.flag==="frontal" || this.flag==="back"){
      this.router.navigate(['dni']);
    } else if (this.flag==="selfie"){
      this.router.navigate(['selfie']);
    }
    sessionStorage.setItem('flag', JSON.stringify("none"));
  }

}
