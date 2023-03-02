import { environment as ENV } from "src/environments/environments.des";

export const API_ROUTES ={

    AUTH: {
        LOGIN: `${ENV.url}auth/token`,
        RECOVERY: `${ENV.url}auth/recovery-password/`,
        CHANGE_PASSWORD: `${ENV.url}auth/change-password/`
    },
    CLIENTS: {
        GET_CLIENTS: `${ENV.url}clients/`
    },
    RESERVATION:{
        GET_RESERVATION: `${ENV.url}reservations/`
    },
    COUNTRY:{
        GET_COUNTRY:`${ENV.url}countries/`
    },
    ROOM: {
        GET_ROOM:`${ENV.url}rooms/`
    },
    ACCOUNTING_DOCUMENT: {
        GET_ACCOUNT_DOCUMENT: `${ENV.url}accounting-documents/`
    },
    CLOSED_SCHEDULE: {
        GET_CLOSED_SCHEDULE: `${ENV.url}closed-schedules/`
    },
    USER: {
        GET_USER: `${ENV.url}users/`
    },
    ROLE: {
        GET_ROLE: `${ENV.url}roles/`
    }
};
