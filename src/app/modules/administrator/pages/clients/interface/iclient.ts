export interface Country {
    id: number;
    name: string;
    alpha3: string;
    status: number;
}

export interface Client {
    id?:                    number;
    firstname:             string;
    lastname:              string;
    document:              string;
    phone:                 string;
    email:                 string;
    reservations_quantity?: number;
    last_reservation?:      Date;
    status:                number;
    country_id:            number;
    created_date?:          Date;
    country?:               Country;
}

export interface POSTClient {
    firstname:             string;
    lastname:              string;
    document:              string;
    phone:                 string;
    email:                 string;
    status:                number;
    country_id:            any;
}