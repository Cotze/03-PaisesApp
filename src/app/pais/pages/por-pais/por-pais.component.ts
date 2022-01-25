import { Component, Input } from '@angular/core';

import { Country } from '../../interfaces/pais.interface';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li{
      cursor: pointer;
    }
  `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  //se crea una nueva variable pero con tipo booleana
  hayError: boolean = false;
  buscarSugerencia: boolean = false;

  paises: Country[] = [];
  paisesSugeridos: Country[] = [];


  placeholder: string = 'Por pais...';



  constructor( private paisService: PaisService  ) { }

  buscar( termino: string ){
    //se genera el false antes del click para que valide la variable booleana
    this.hayError = false;
    this.termino = termino;
    this.buscarSugerencia = false;

    this.paisService.buscarPais( this.termino )
    //es necesario el .suscribe() para utilizar el servicio
    .subscribe( (paises) =>{
      this.paises = paises;
      
    }, ( err ) =>{
      //si es contraria a true se habilita el error
      this.hayError = true;
      
      
    });
  }

  sugerencias( termino: string){
    this.hayError = false;
    this.termino = termino;
    this.buscarSugerencia = true;
    this.paisService.buscarPais( termino )
      .subscribe( paises => this.paisesSugeridos = paises.splice(0, 5), 
      ( err => this.paisesSugeridos = []))

  }

  buscarSugerido( termino: string){
    this.buscar( termino );
  }


}
