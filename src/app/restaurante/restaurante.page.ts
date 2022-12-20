import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, MenuController, AlertController } from '@ionic/angular';
import { RestauranteService } from '../services/restaurante.service';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.page.html',
  styleUrls: ['./restaurante.page.scss'],
})
export class RestaurantePage implements OnInit {

 
  nombre!: string;
  tipo!: string;
  horario!: string;
  telefono!: number;
  propietario!: number;
  id: any;
  formulario = false
  restaurantes: any[] = []
  usuarios: any[] = [];
  rol!: string;

  constructor(
    private restaurant: RestauranteService,
    private activateRoute: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private router: Router,
    private alertController: AlertController

    ) { }

  ngOnInit() {
    this.carga();
    this.id = this.activateRoute.snapshot.paramMap.get('id')
    console.log(this.id, '=====');
    this.cargarRolUsuario(this.id)
  }

  registrar(){
    const restaurante = {
      nombre: this.nombre,
      tipo: this.tipo,
      horario: this.horario,
      telefono: this.telefono,
      propietario: this.propietario
    }
    console.log(restaurante);
    this.restaurant.postRestaurante(restaurante).subscribe((res: any)=>{
      console.log(res);
      this.vistaFormulario()
    },
    (err)=>{
      console.error(err);
      
    })
  }

  carga(){
    this.restaurant.getRestaurantes().subscribe((res: any)=>{
      this.restaurantes = res
      console.log(this.restaurantes );
      
    })
  }

  cargarRolUsuario(id: any){
    this.restaurant.getUsers().subscribe((res: any)=>{
      for (let i = 0; i < res.length; i++) {
        if (id === res[i].Id) {
          this.usuarios.push(res[i])
        }
      }
      this.rol = this.usuarios[0].rol;
    })
  }

  vistaFormulario(){
    this.formulario = !this.formulario;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Añadir restaurante',
          role: 'destructive',
          icon: 'restaurant-outline',
          handler: () => {
            this.vistaFormulario();
          },
        },
        {
          text: 'Cerrar sesion', 
          icon: 'close-circle-outline',
          handler: () => {
            this.router.navigate(['../login']);
          },
        },
        {
          text: 'Admin',
          icon: 'people-circle-outline',
          handler: () => {
            this.validaAdmin()
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
  }

  validaAdmin(){
    if (this.rol === 'admin') {
      this.router.navigate(['../admin']);
    } else {
      this.presentAlert('Esta pestaña solo esta habilitada para usuarios administrador')
    }
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
