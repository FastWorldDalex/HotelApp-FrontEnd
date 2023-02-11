import { Component, OnInit } from '@angular/core';
import { Titles } from 'src/app/shared/interface/interfaces';
import { Room } from './interface/iroom';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})

export class RoomsComponent implements OnInit{
  titulos: Titles[] = [];
  ltsRooms: Room[] = [];
  room: Room;

  constructor(
  ) {
    this.room = new Room();
  }

  ngOnInit() {

  }

  componentsInitials(){
    this.titulos = [
      {title: '#', width: 2},
      {title: 'Nombres', width: 2},
      {title: 'Apellidos', width: 2},
      {title: 'Documento', width: 2},
      {title: 'Teléfono', width: 2},
      {title: 'Email', width: 2},
      {title: 'País', width: 2},
      {title: 'Cantidad de Reservas', width: 2},
      {title: 'Última Reserva', width: 2},
      {title: 'Fecha de Creación', width: 2},
      {title: 'Estado', width: 2},
      {title: 'Acciones', width: 2}
    ];
  }
}
