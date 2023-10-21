import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        login: false,
        register: true
    },
    reducers: {
        setLogin: (state, link) => {
            state.login = link.payload
        },
        setRegister: (state, link) => {
            state.register = link.payload
        }
    }
})

export const {setLogin, setRegister} = authSlice.actions;

export default authSlice.reducer