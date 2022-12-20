import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  public url =  environment.url;

  constructor(private http: HttpClient ) { }

  getUsers(){{
    return this.http.get(this.url+'/usuarios')
  }}

  getRestaurantes(){{
    return this.http.get(this.url+'/restaurantes')
  }}

  postUser(usuario: any){
    return this.http.post(this.url+'/usuarios',usuario )
  }

  postRestaurante(restaurante: any){
    return this.http.post(this.url+'/restaurantes',restaurante)
  }
}
