import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  constructor(private router: Router, private restService: RestService, private activatedRoute: ActivatedRoute) {
/*     this.activatedRoute.queryParams.subscribe(params => {
      const data: any = params['DNI'] || null;
      console.log(data);
  }) */
}

/* getDni(){
  this.activatedRoute.queryParams.subscribe(params => {
    const data: any = params['DNI'] || null;
    console.log(data);
})
} */

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const dni: any = params['DNI'] || null;
      console.log(dni);
      const token: any = params['t'] || null;
      console.log(token);
      sessionStorage.setItem('dni', dni);
      sessionStorage.setItem('token', token);
  })
  }

  senPart1(){
    this.router.navigate(['dni']);
  }

/*   getDni(){
    this.restService.getDNI()
    .subscribe(data => {
      console.log(data)
      let dniNumber = data.values;
      let dni = dniNumber[0].dni;
      sessionStorage.setItem('dni', dni);
    })
  } */

 goToPart1(){
/*     this.restService.getDNI();
    setTimeout(()=>{
      this.router.navigate(['dni']);
    },800); */

/*     this.getDni(); */
    this.router.navigate(['dni']);
  }
}
