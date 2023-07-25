import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {
  
  // nos facilitará conseguir los resultados de busqueda sobre gifs
  get resultados() {
    return this.gifsService.resultados;
  }
  constructor(private gifsService:GifsService) { }

}
