import { Injectable } from '@angular/core';
import {  HttpHeaders, HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroesURL: string = 'https://heroesapp-crud.firebaseio.com/heroes.json';
  heroeURL: string = 'https://heroesapp-crud.firebaseio.com/heroes/';


  constructor(private http: HttpClient) { }


  //==Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  getHeroes() {
    return this.http.get( this.heroesURL, this.httpOptions ).pipe(
      retry(1),
      catchError(this.handleErrorMsg)
    );
  }

  getHeroe( id: string){
    let urlGetHeroe = `${ this.heroeURL }/${ id }.json`;
    return this.http.get( urlGetHeroe, this.httpOptions ).pipe(
      retry(1),
      catchError(this.handleErrorMsg)
    );
  }


  newHeroe( heroe: Heroe){
    let body = JSON.stringify( heroe );
    return this.http.post( this.heroesURL, body,  this.httpOptions ).pipe(
      retry(1),
      catchError(this.handleErrorMsg)
    )
  }


  updateHeroe( heroe: Heroe, id: string){
    let body = JSON.stringify( heroe );
    let urlUpdateHeroe = `${ this.heroeURL }/${ id }.json`;
    return this.http.put( urlUpdateHeroe, body,  this.httpOptions ).pipe(
      retry(1),
      catchError(this.handleErrorMsg)
    )
  }


  deleteHeroe( key: string) {
    let urlDeleteHeroe = `${ this.heroeURL }/${ key }.json`;
    return this.http.delete( urlDeleteHeroe ).pipe(
      retry(1),
      catchError(this.handleErrorMsg)
    );
  }

  // Error handling 
  handleErrorMsg(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }




}
