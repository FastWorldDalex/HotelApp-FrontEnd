/*export interface IloginForm{
    email:value;
    password: value
}*/
export interface IField{
    valor: string;
    error: string;
    isValid: ()=> boolean;
}