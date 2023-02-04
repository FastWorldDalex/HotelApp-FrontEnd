import { Client } from '../../../administrator/pages/clients/interface/iclient';
export class Reserva {
    constructor(){

    }
    id:              number=0;
    checkin:         any;
    checkout:        any;
    adults:          number=0;
    children:        number=0;
    total:           number= 0;
    done_payment:    number= 0;
    pending_payment: number= 0;
    status:          number= 0;
    client_id:       number= 0;
    room_id:         number= 0;
    client:          Client = new Client();
    room:            Room = new Room();
}

export class Room {
    constructor(){

    }
    id:           number = 0;
    name:         string = '';
    description:  string = '';
    price:        number = 0;
    capacity:     number = 0;
    room_type_id: number = 0;
    status:       number = 0;
}

export interface POSTReserva {
    id?:            number,
    checkin:         any;
    checkout:        any;
    adults:          number;
    children:        number;
    total:           number;
    done_payment:    number; //pagado
    pending_payment: number; // por pagar
    status:          number;
    client_id:       any;
    room_id:         any;
}