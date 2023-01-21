import { environment as ENV } from "src/environments/environments.des";

export const API_ROUTES ={

    AUTH: {
        LOGIN: `${ENV.url}auth/token`,
        RECOVERY: `${ENV.url}auth/recovery-password/`,
        CHANGE_PASSWORD: `${ENV.url}auth/change-password/`
    }
};