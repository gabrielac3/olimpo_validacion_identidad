import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dni } from 'src/app/Interfaces/dni.interface';
import { Fotodni } from 'src/app/Interfaces/fotodni.interface';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-dni',
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.css']
})
export class DniComponent implements OnInit{

  dni: Dni = {
    DNI: ''
  }

  fotodni: Fotodni={
    DNI: '',
    FOTO_FRONTAL: '',
    FOTO_POSTERIOR: ''
  }

  sesionDni: any = sessionStorage.getItem('dni');

  markFrontal: string= "";
  markBack: string= "";
  captureEmpty: boolean = false;


  constructor(private router: Router, private restService: RestService) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('dniFrontal')){
      this.markFrontal = '✅';
    }

    if (sessionStorage.getItem('dniBack')){
      this.markBack= '✅';
    }
  }

  goToCaptureFrontal(){
    this.router.navigate(['capture']);
    sessionStorage.setItem('flag', JSON.stringify("frontal"));
  }

  goToCaptureBack(){
    this.router.navigate(['capture']);
    sessionStorage.setItem('flag', JSON.stringify("back"));
  }


/*   getToken(){
    this.restService.sendDni(this.dni)
    .subscribe(data => {
      console.log(data)
      let token = data.values;
      let t = token[0].t;
      sessionStorage.setItem('token', t);
    })
  } */

  sendDniFotos(){
   /*  this.fotodni.DNI = this.sesionDni; */
   this.fotodni.DNI = '44123456';
    this.fotodni.FOTO_FRONTAL = sessionStorage.getItem('dniFrontal');
    this.fotodni.FOTO_POSTERIOR = sessionStorage.getItem('dniBack');
    console.log(this.fotodni);
    this.restService.sendFotos(this.fotodni)
    .subscribe(data => {
      console.log(data)
    })
  }

  goToSelfie(){
    if (sessionStorage.getItem('dniFrontal') && sessionStorage.getItem('dniBack')){
      this.sendDniFotos();
      this.router.navigate(['selfie']);
    }else{
      this.captureEmpty = true;
      setTimeout(() => {
        this.captureEmpty = false;
      }, 3000);
    }

  }

}
