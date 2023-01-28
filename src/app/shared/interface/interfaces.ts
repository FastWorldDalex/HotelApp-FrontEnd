export interface Country {
    id: number;
    name: string;
    alpha3: string;
    status: number;
}

export interface Client {
    id?:                    number;
    nameComplete?:           string;
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