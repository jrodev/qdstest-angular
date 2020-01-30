
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Arreglo } from '../models/arreglo';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  // Define API  
  apiURL = 'http://qdstest.laravel.local/api';
  //apiURL = 'https://qdstest-laravel.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }  

  // Testeamos el api laravel para corregir problemas de cors
  getTestArreglo () : Observable<Arreglo> {
    return this.http.get<Arreglo>(this.apiURL + '/arreglo/create')
    .pipe( retry(1), catchError(this.handleError) )
  }

  // Creamos el nuevo arreglo en base al anterior (Ejecuta el metodo arreglo.store de laravel)
  createNuevoArreglo (arreglo:Arreglo) : Observable<Arreglo> {
    return this.http.post<Arreglo>(this.apiURL + '/arreglo', JSON.stringify(arreglo), this.httpOptions)
    .pipe( retry(1), catchError(this.handleError) )
  }  

  // Error handling 
  handleError(error) {
    let errorMessage = '';

    // Get client-side error
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }
    // Get server-side error
    else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
