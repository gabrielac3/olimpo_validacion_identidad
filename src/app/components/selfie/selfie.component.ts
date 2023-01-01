import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.css']
})
export class SelfieComponent {
  showResult: boolean = false;
  showSelfie: boolean = true;

  constructor(private router: Router) {
  }

  goToCaptureSelfie(){
    this.router.navigate(['capture']);
    sessionStorage.setItem('flag', JSON.stringify("selfie"));
  }

  goToResult(){
    this.showResult = true;
    this.showSelfie = false;
  }

  endValid(){
    sessionStorage.clear();
  }

}
