"use client";

import { gql } from "@apollo/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../apolloClient";
import { UserInfo } from "@/app/auth/login/page";
import { RegisterInfo } from "@/app/auth/register/page";

interface InitialState {
  loginData: string[]
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

const initialState: InitialState = {
  loginData: [],
  isLoading: false,
  isSuccess: false,
  isError: false
};

const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        id
        name
      }
    }
  }
`;

const REGISTER = gql`
  mutation Mutation($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      email
      name
      password
    }
  }
`;
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
      builder
      .addCase(loginUser.pending,(state,action)=>{
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(loginUser.fulfilled,(state,action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.loginData = action.payload
        localStorage.setItem("token",action.payload.token)
      })
      .addCase(loginUser.rejected,(state,action)=>{
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
      })
  },
});

export const loginUser = createAsyncThunk(
  "LOGIN/USER",
  async (userInfo: UserInfo) => {
    try {
      const response = await client.mutate({
        mutation: LOGIN,
        variables: userInfo,
      });
      console.log(response, "login response");
      return response.data.login
    } catch (error) {
      console.log(error, "login error");
    }
  }
);

export const registerUser = createAsyncThunk(
  "REGISTER/USER",
  async (registerInfo: RegisterInfo) => {
    try {
      const response = await client.mutate({
        mutation: REGISTER,
        variables: registerInfo,
      });
      console.log(response, "register response");
    } catch (error) {
      console.log(error, "error from register");
    }
  }
);
export default authSlice.reducer;
