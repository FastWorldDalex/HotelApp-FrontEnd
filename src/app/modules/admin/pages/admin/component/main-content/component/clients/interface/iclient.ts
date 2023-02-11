import { Country } from "src/app/shared/interface/interfaces";

export class Client {
    constructor(){

    }
    id?:                     number=0;
    nameComplete?:          string='';
    firstname:             string='';
    lastname:              string='';
    document:              string='';
    phone:                 string='';
    email:                 string='';
    reservations_quantity?: number=0;
    last_reservation?:      Date;
    status:                number=0;
    country_id:            number=0;
    country_name?:            string='';
    country?: Country;
}
