import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../services/restaurante.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private restaurant: RestauranteService) { }

  user: any[] = []
  ngOnInit() {
    this.cargar();
  } 

  cargar(){
    this.restaurant.getUsers().subscribe((res: any)=>{
      this.user = res;
      console.log(this.user);
    })
  }

}
