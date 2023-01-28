export interface Reserva {
    id:              number;
    checkin:         Date;
    checkout:        Date;
    adults:          number;
    children:        number;
    total:           number;
    done_payment:    number;
    pending_payment: number;
    status:          number;
    client_id:       number;
    room_id:         number;
    client:          Client;
    room:            Room;
}

export interface Client {
    id:                    number;
    firstname:             string;
    lastname:              string;
    document:              string;
    phone:                 string;
    email:                 string;
    reservations_quantity: number;
    last_reservation:      Date;
    status:                number;
    country_id:            number;
}

export interface Room {
    id:           number;
    name:         string;
    description:  string;
    price:        number;
    capacity:     number;
    room_type_id: number;
    status:       number;
}
