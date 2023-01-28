import { Injectable } from '@angular/core';
import { Dni } from '../Interfaces/dni.interface';
import { Fotodni } from '../Interfaces/fotodni.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Selfie } from '../Interfaces/selfie.interface';

@Injectable({
  providedIn: 'root'
})

export class RestService {

  baseURL: string = "http://192.168.239.79/api_poc_olimpo/api/";

  constructor(private http: HttpClient){}

  sendDni(dni: Dni): Observable <any> {
    const headers = {
      'apikey': 'b18689bda30e6d9e762631a8dcb7acc14327bdddbafa4574d3c68f83061db061',
      'Content-Type': 'application/json'
    }
    const body=JSON.stringify(dni);
    return this.http.post(this.baseURL + 'Tokenizador', body,{'headers':headers})
  }

getDNI(): Observable <any> {

  let tokensesion = sessionStorage.getItem('token');

  const headers = {
    'Authorization': 'Bearer '+ tokensesion,
    'Content-Type': 'application/json'
  }
  const body=JSON.stringify('');
  return this.http.post(this.baseURL + 'DNI/ObtenerDNI', body, {'headers':headers})
}

sendFotos(fotoDni: Fotodni): Observable <any> {

  let tokensesion = sessionStorage.getItem('token');

  const headers = {
      'Authorization': 'Bearer '+ tokensesion,
      'Content-Type': 'application/json'
  }
  const body=JSON.stringify(fotoDni);
  return this.http.post(this.baseURL + 'DNI/GrabarFotosDNI', body,{'headers':headers})
}

sendSelfie(selfie: Selfie): Observable <any> {

  let tokensesion = sessionStorage.getItem('token');

  const headers = {
      'Authorization': 'Bearer '+ tokensesion,
      'Content-Type': 'application/json'
  }
  const body=JSON.stringify(selfie);
  return this.http.post(this.baseURL + 'DNI/GrabarFotoSelfie', body,{'headers':headers})
}

}
