export const API_ENDPOINTS = {

    AUTH:{
        LOGIN:"/auth/login",
        REGISTER:"/auth/register",
        PROFILE:"/auth/profile",
    },

    PROJECTS:{
        BASE:"/projects",
    },

    TASKS:{
        BASE:"/tasks",
    },

    USERS:{
        PROFILE:"/users/profile",
    }

} as const;