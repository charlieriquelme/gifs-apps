import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  // apartado propio de angular para seleccionar un apartadod especifico del modulo
  @ViewChild('txtBuscar') txtBuscar!: ElementRef <HTMLInputElement>; //cuando estamos seguro que nosotros estamos indicando a un dato le indicamos con != para afirmar esa decisión

  constructor(private gifsservice: GifsService) { 
    
  }

  buscar(){
    // console.log(this.txtBuscar);
    // ahora se define como resetear la caja de busqueda
    const valor = this.txtBuscar.nativeElement.value;
    
    if(valor.trim().length === 0){
      return;
    }

    this.gifsservice.buscarGifs(valor);

    // console.log(valor);

    this.txtBuscar.nativeElement.value = '';
  }

 
  ngOnInit(): void {
  }

}
