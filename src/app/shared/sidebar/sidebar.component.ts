import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  get historial(){
    return this.GifsService.historial;
  }

  constructor(private GifsService : GifsService) {  }

  buscar(termino: string){
    // console.log(termino);
    this.GifsService.buscarGifs(termino);
  }

}
