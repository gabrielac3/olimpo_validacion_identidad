import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  constructor(private router: Router, private restService: RestService) {

  }

  ngOnInit(): void {

  }

  senPart1(){
    this.router.navigate(['dni']);
  }

 goToPart1(){
    this.restService.getDNI();

    setTimeout(()=>{
      this.router.navigate(['dni']);
    },800);
  }
}
