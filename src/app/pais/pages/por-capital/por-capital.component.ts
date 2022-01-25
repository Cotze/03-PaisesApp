import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Country } from '../../interfaces/pais.interface';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino: string = '';
  hayError: boolean = false;
  buscarSugerencia: boolean = false;

  paises: Country[] = [];
  paisesSugeridos: Country[] = [];

  @Output() onDebounce : EventEmitter<string> = new EventEmitter();

  debouncer : Subject<string> = new Subject();

  constructor( private paisService: PaisService) { }

  ngOnInit() {
    this.debouncer
    .pipe(debounceTime(300))
    .subscribe( valor =>{

      this.onDebounce.emit( valor );
      
    });
  }

  buscar( termino: string ){
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarCapital( this.termino )
    .subscribe( ( paises ) =>{
     this.paises = paises; 
    }, ( err ) =>{
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
