import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v2'

  constructor( private http: HttpClient) { }

  buscarPais( termino: string): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ termino }`
    return this.http.get<Country[]>( url );
            //puede ser bastante util para manejar u obtener los errores
  //           .pipe(
  //             catchError( arr => of([]) )
  //           );
  }

  buscarCapital( termino: string ): Observable<Country[]>{
    const url = `${ this.apiUrl }/capital/${ termino }`
    return this.http.get<Country[]>( url );
  }

  getPaisPorId( id: string ): Observable<Country>{
    const url = `${ this.apiUrl }/alpha/${ id }`
    return this.http.get<Country>( url );
  }

  buscarRegion(region: string ): Observable<Country[]>{
    const url = `${this.apiUrl}/regionalbloc/${region}`
    return this.http.get<Country[]>(url);
  }
  
}
