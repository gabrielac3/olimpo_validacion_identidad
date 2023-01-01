import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dni } from 'src/app/Interfaces/dni.interface';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-prueba-cliente',
  templateUrl: './prueba-cliente.component.html',
  styleUrls: ['./prueba-cliente.component.css']
})
export class PruebaClienteComponent implements OnInit{

  dni: Dni = {
    DNI: ''
  }

  urlApp: any;

  constructor(private router: Router, private restService: RestService) {
  }

  ngOnInit(): void {

  }

  getToken(){
    this.restService.sendDni(this.dni);
  }

  goToinstructions(){
        this.urlApp=this.getToken();
        this.router.navigate(['instructions']);
      }

}
