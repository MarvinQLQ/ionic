import { RestauranteService } from './../services/restaurante.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

 
  nombre: string = '';
  cedula!: number;
  telefono!: number;
  ciudad: string= '';
  password: string= '';
  rol: string= '';
  constructor( private restaurant: RestauranteService){}
  ngOnInit() {
  }

  registrarse(){
    const usuario = {
      nombre: this.nombre,
      cedula: this.cedula,
      telefono: this.telefono,
      ciudad:  this.ciudad,
      password:  this.password,
      rol:  this.rol
    }
    console.log(usuario);
    this.restaurant.postUser(usuario).subscribe((res: any)=>{
      console.log(res);
    })
  }

}
