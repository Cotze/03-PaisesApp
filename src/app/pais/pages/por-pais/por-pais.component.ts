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

  constructor( private paisService: PaisService  ) { }

  buscar(){

    this.paisService.buscarPais( this.termino )
    //es necesario el .suscribe() para utilizar el servicio
    .subscribe( resp =>{
      console.log( resp );
      
    });
    console.log( this.termino );


    
  }


}
