import { Client } from '../../../administrator/pages/clients/interface/iclient';
export class Reserva {
    constructor(){

    }
    id:              number=0;
    checkin:         any;
    checkout:        any;
    adults:          number=0;
    children:        number=0;
    subtotal:        number=0;
    additional_amount: number=0;
    observations:   string='';
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
    subtotal:        number;
    additional_amount: number;
    observations:   string;
    total:           number;
    done_payment:    number; //pagado
    pending_payment: number; // por pagar
    status:          number;
    client_id:       any;
    room_id:         any;
}

export class Accounting_Document {
    constructor(){

    }
    id?:             number = 0;
    number:         string = '';
    client_number:  string = ''; //RUC_DNI
    client_name:    string = ''; //RazonSocial
    client_address: string = '';
    issue_date?:     any; //emision
    type:           number = 0;
    currency_type:  number = 0;
    total_sale:     number = 0;
    tax:            number = 0;
    total:          number = 0;
    status:         number = 0;
    reservation_id?: number = 0;
    reservation?: Reserva;
}

export class Email{
    constructor(){}
    id?: number = 0;
}

export class ClosedSchedule {
  constructor(){

  }
  id:              number=0;
  start_date:      any;
  end_date:        any;
  description:     string= '';
  status:          number= 0;
  room_id:         number= 0;
  room:            Room = new Room();
  rooms?:          any;
}
