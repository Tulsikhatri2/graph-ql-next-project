'use client';

import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./Slice/authSlice"
import locationReducer from "./Slice/locationSlice"
import usersReducer from "./Slice/usersSlice"

export const store = () => {
    return configureStore({
        reducer:{
            auth : authReducer,
            location: locationReducer,
            users: usersReducer
        }
    })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"];