export interface Country {
    id: number;
    name: string;
    alpha3: string;
    status: number;
}

export interface Customer {
    id: number;
    firstname: string;
    lastname: string;
    document: string;
    phone: string;
    email: string;
    status: number;
    country_id: number;
    country: Country;
}