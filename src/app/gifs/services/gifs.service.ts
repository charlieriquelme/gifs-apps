import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  //caracteristica que permite enviar los servicios a los distintos modulos (globales)
  providedIn: 'root'
})
export class GifsService {

  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  private apiKey    :string = 'aJiiBokiti74E9cwqTX9ANocUo0GQKD4'
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  public ultimos_resultados: Gif[] = [];

  get historial() {
    
    return [...this._historial];
  }

  // gracias al constructor http, podemos llamar las caracteristicas que maneja la libreria http en angular
  constructor (private http: HttpClient){
    // sector para crear el localstorage , el cual nos permite mostrar los datos sin importar que se recargue la página
    // realiza lo mismo que el if comentado 
    this._historial =JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    // if(localStorage.getItem('historial')){
    //   // para permitir el 
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );
    // }
    
  }

  buscarGifs(query:string){

    // con el tolocalelowercase dejamos todas las palabras en minusculas 
    query = query.trim().toLocaleLowerCase();
    
    // dentro del siguiente if podemos limitar la busqueda y además impedir que se repita los datos dentro del arreglo
    if (!this._historial.includes(query)){
      this._historial.unshift(query);
      //  en la siguiente linea limitamos la cantida de string que agregamos a la lista
      this._historial = this._historial.splice(0,12);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
                  .set('api_key', this.apiKey)
                  .set('limit', '10')
                  .set('q', query);

    console.log(params.toString());
    // dejamos objeto data dado el tipado del archivo gif.interface
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe((resp) => {
      // console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados',JSON.stringify(this.resultados));

    })
  }
}
