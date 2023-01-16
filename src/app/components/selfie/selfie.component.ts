import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Selfie } from 'src/app/Interfaces/selfie.interface';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.css']
})
export class SelfieComponent implements OnInit{

  selfie: Selfie = {
    DNI: '',
    FOTO_SELFIE: ''
  }

  showResult: boolean = false;
  showSelfie: boolean = true;
  captureEmpty: boolean = false;
  markSelfie: string= "";
  msgError: string="";

  dataMsgError: boolean = false;

  constructor(private router: Router, private restService: RestService) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('dniSelfie')){
      this.markSelfie = '✅';
    }
}


  goToCaptureSelfie(){
    this.router.navigate(['capture']);
    sessionStorage.setItem('flag', JSON.stringify("selfie"));
  }

  sendSelfieFoto(){
    this.selfie.DNI = sessionStorage.getItem('dni');
    this.selfie.FOTO_SELFIE = sessionStorage.getItem('dniSelfie');
    console.log(this.selfie);
    this.restService.sendSelfie(this.selfie)
    .subscribe(data => {
      console.log(data);
      this.msgError = data.msg;
      if (data.ret == 'ERROR'){
        this.dataMsgError = true;
        this.showSelfie = false;
      }else{
        this.showResult = true;
        this.showSelfie = false;
      }
    })
  }

  goToResult(){
    if (sessionStorage.getItem('dniSelfie')){
      this.sendSelfieFoto();
    }else{
      this.captureEmpty = true;
      setTimeout(() => {
        this.captureEmpty = false;
      }, 3000);
    }
  }

  endValid(){
    sessionStorage.clear();
  }

  goBackSelfie(){
    this.dataMsgError = false;
    this.showSelfie = true;
  }

}
