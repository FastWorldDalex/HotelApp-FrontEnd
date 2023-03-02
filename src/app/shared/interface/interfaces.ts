export interface Country {
    id: number;
    name: string;
    alpha3: string;
    status: number;
}


/**
 * interfaces global
 */
export interface SelectItem<T = any> {
    label?: string;
    value: T;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
}
export interface Titles{
    title: string;
    width: number
}