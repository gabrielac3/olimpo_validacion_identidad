import { Injectable } from '@angular/core';
import { Dni } from '../Interfaces/dni.interface';
import axios from 'axios';
import { Fotodni } from '../Interfaces/fotodni.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    console.log(body)
    return this.http.post(this.baseURL + 'Tokenizador', body,{'headers':headers})

  }


/* sendDni(dni: Dni){

  const dni2 = JSON.stringify(dni);

  var config = {
    method: 'post',
    url: 'http://192.168.239.79/api_poc_olimpo/api/Tokenizador',
    headers: {
      'apikey': 'b18689bda30e6d9e762631a8dcb7acc14327bdddbafa4574d3c68f83061db061',
      'Content-Type': 'application/json'
    },
    data : dni2
  };

    axios(config)
  .then(function (response) {
    let token = response.data.values;
    let t = token[0].t;
    let url = token[0].url;
    console.log(JSON.stringify(response.data.values));
    sessionStorage.setItem('token', t);
  })
  .catch(function (error) {
    console.log(error);
  });

} */

getDNI(): Observable <any> {

  let tokensesion = sessionStorage.getItem('token');
  console.log(tokensesion);

  const headers = {
    'Authorization': 'Bearer '+ tokensesion,
    'Content-Type': 'application/json'
  }
  const body=JSON.stringify('');
  return this.http.post(this.baseURL + 'DNI/ObtenerDNI', body, {'headers':headers})
}

/* getDNI(){

  let tokensesion = sessionStorage.getItem('token');
  console.log('Bearer '+ tokensesion);

  var config = {
    method: 'post',
    url: 'http://192.168.239.79/api_poc_olimpo/api/DNI/ObtenerDNI',
    headers: {
      'Authorization': 'Bearer '+ tokensesion,
      'Content-Type': 'application/json'
    },
  };

    axios(config)
  .then(function (response) {
    console.log('dni', JSON.stringify(response.data.values));
    let dniNumber = response.data.values;
    let dni = dniNumber[0].dni;
    sessionStorage.setItem('dni', dni);
  })
  .catch(function (error) {
    console.log(error);
  });

} */

sendFotos(fotoDni: Fotodni): Observable <any> {

  let tokensesion = sessionStorage.getItem('token');

  const headers = {
      'Authorization': 'Bearer '+ tokensesion,
      'Content-Type': 'application/json'
  }
  const body=JSON.stringify(fotoDni);
  console.log(body)
  return this.http.post(this.baseURL + 'DNI/GrabarFotosDNI', body,{'headers':headers})
}

/* sendFotos(fotoDni: Fotodni){

  const fotoDni2 = JSON.stringify(fotoDni);
  let tokensesion = sessionStorage.getItem('token');
  console.log('Bearer '+ tokensesion);

  var config = {
    method: 'post',
    url: 'http://192.168.239.79/api_poc_olimpo/api/DNI/GrabarFotosDNI',
    headers: {
      'Authorization': 'Bearer '+ tokensesion,
      'Content-Type': 'application/json'
    },
    data : fotoDni2
  };

    axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

} */

}
