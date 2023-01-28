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

  nombre: string="";
  apeMaterno: string="";
  apePaterno: string="";
  fechaEmision: string="";
  fechaCaducidad: string="";
  fechaNacimiento: string="";

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

    this.restService.sendSelfie(this.selfie)
    .subscribe(data => {
      console.log('sendSelfieFoto',data);

      this.nombre = data.values[0].prenombres;
      this.apeMaterno = data.values[0].apellido_materno;
      this.apePaterno = data.values[0].apellido_paterno;
      this.fechaEmision = data.values[0].fecha_de_emision;
      this.fechaCaducidad = data.values[0].fecha_de_caducidad;
      this.fechaNacimiento = data.values[0].fecha_de_nacimiento;

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
