import { Component } from '@angular/core';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  termino: string = '';
  //se crea una nueva variable pero con tipo booleana
  hayError: boolean = false;

  constructor( private paisService: PaisService  ) { }

  buscar(){
    //se genera el false antes del click para que valide la variable booleana
    this.hayError = false;
    this.paisService.buscarPais( this.termino )
    //es necesario el .suscribe() para utilizar el servicio
    .subscribe( (resp) =>{
      console.log( resp );
      
    }, ( err ) =>{
      //si es contraria a true se habilita el error
      this.hayError = true;
      
    });
    console.log( this.termino );


    
  }


}
