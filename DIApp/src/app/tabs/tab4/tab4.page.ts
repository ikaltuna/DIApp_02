import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  adivina: number = 0;
  numero: string = "";
  acierto: boolean = false;
  mensaje: string = "";
  desactivado: boolean = true;
  intentos: number = 0;
  volver: boolean = true;


  



  constructor(public alertController: AlertController) { }


  onClick() {
    this.intentos++;
    if (parseInt(this.numero) == this.adivina) {
      this.acierto = true;
      this.volver = false;
      console.log("Has acertado");
      this.mensaje = "Has acertado.";
      this.nuevoNumero();
    } else if (parseInt(this.numero) < this.adivina) {
      console.log("Introduce un número mayor");
      this.mensaje = "Introduce un número mayor";
    } else {
      console.log("Introduce un número menor");
      this.mensaje = "Introduce un número menor";
    }

  }

  comprobarDato() {
    if (parseInt(this.numero) > 100 || parseInt(this.numero) < 0) {
      console.log("Introduce un número entre 0 y 100");
      this.mensaje = "Introduce un número entre 0 y 100";
      this.desactivado = true;
    } else {
      console.log("Número OK");
      this.mensaje = "";
      this.desactivado = false;
    }
  }

  nuevoNumero() {
    this.adivina = Math.floor(Math.random() * 101);
    console.log(this.adivina);
  }

  volverJugar() {
    this.presentarAlerta();
  }

  async presentarAlerta() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '¿Nuevo juego?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.mensaje = "";
            this.numero = "";
            this.acierto = false;
            this.volver = true;
            this.nuevoNumero();
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.nuevoNumero();
  }

}
