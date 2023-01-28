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
    country_id:            any;
    created_date?:          Date;
    country?:               Country;
    countryName?:            string;
}

export interface SelectItem<T = any> {
    label?: string;
    value: T;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
}
