
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
  apiURL = 'https://qdstest-laravel.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }  

  // HttpClient API get() method => Fetch employees list
  getTestArreglo(): Observable<Arreglo> {
    return this.http.get<Arreglo>(this.apiURL + '/arreglo/create')
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
