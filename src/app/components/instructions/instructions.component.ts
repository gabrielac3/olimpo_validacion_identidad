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
}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const dni: any = params['DNI'] || null;
      const token: any = params['t'] || null;
      sessionStorage.setItem('dni', dni);
      sessionStorage.setItem('token', token);
  })
  }

  senPart1(){
    this.router.navigate(['dni']);
  }

 goToPart1(){
    this.router.navigate(['dni']);
  }
}
