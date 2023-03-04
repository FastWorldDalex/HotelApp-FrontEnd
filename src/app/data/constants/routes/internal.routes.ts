export const ROUTES_PATH = {
    AUTH: {
        DEFAULT: 'auth',
        LOGIN: 'loing',
    },
    INICIO:{
        DEFAULT: 'home'
    }
}

export const INTERNAL_PATHS = {
    AUTH_DEFAULT: `${ROUTES_PATH.AUTH.DEFAULT}`,
    AUTH_LOGIN: `${ROUTES_PATH.AUTH.LOGIN}`,


    HOME_DEFAULT: `${ROUTES_PATH.INICIO.DEFAULT}`
}


export const INTERNAL_ROUTES = {
    AUTH_LOGIN: `/${INTERNAL_PATHS.AUTH_DEFAULT}/${INTERNAL_PATHS.AUTH_LOGIN}}`,
    HOME: `/${INTERNAL_PATHS.HOME_DEFAULT}`,
    CALENDAR: `/admin/calendar`
}
