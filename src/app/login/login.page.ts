import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RestauranteService } from '../services/restaurante.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  cedula: string = '';
  password: string = '';
  Usuarios: any[] = [];
  constructor(
    private restaurant: RestauranteService, 
    private alertController: AlertController,
    private router: Router
  ) {}
 
  
  ngOnInit() {}

  login(){
    const data = {
      cedula: this.cedula,
      password: this.password
    }
    this.restaurant.getUsers().subscribe((res: any)=>{
      if (this.cedula === '' && this.password === '') {
        this.presentAlert('Rellenar todos los campos')
      } else {
        console.log(this.cedula, this.password);
        for (let i = 0; i < res.length; i++) {
          /* console.log(res[i]);
          console.log('========');
          console.log(res[i].cedula);
          console.log(this.cedula); */
          if (this.cedula === res[i].cedula) {
            this.Usuarios.push(res[i]);
          } /* else {
            this.presentAlert('El usuario no fue hallado en los registros')
          } */
        }
        console.log(this.Usuarios);
        if (this.password === this.Usuarios[0].password) {
            this.router.navigate(['../restaurante/'+this.Usuarios[0].Id]);

          } else {
            this.presentAlert('Cedula o Contraseña Incorrecta')
          }
      }      
    })
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
