import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

interface User{
    _id:string;
    name:string;
    email:string;
}
interface AuthState{
    token:string | null;
    user:User | null;
    isAuthenticated:boolean;
}

const initialState:AuthState={
    token:localStorage.getItem("token"),
    user:null,
    isAuthenticated:!!localStorage.getItem("token"),
};

const authSlice=createSlice({
    name:"auth",

    initialState,

    reducers:{
        login(state,action:PayloadAction<{
            token:string;
            user:User;
        }>){
            state.token=action.payload.token;
            state.user=action.payload.user;
            state.isAuthenticated=true;

            localStorage.setItem("token",action.payload.token);
        },

        logout(state){
            state.token=null;
            state.user=null;
            state.isAuthenticated=false;
            localStorage.removeItem("token");
        },
    },
});


export const {login,logout}=authSlice.actions;

export default authSlice.reducer;