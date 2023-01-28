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
    }
};