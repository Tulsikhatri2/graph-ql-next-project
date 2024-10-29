import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../apolloClient";
import { gql } from "@apollo/client";
import { PAGE_INFO, USER_DATA } from "@/app/users-data/page";

interface InitialState {
  usersList: string[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  userData: {
    id:string,
    name:string,
    email:string
  }
}

const initialState: InitialState = {
  usersList: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  userData:{
    id:"",
    name:"",
    email:""
  }
};

const USERS_QUERY = gql`
  query ExampleQuery($page: String!, $size: String!) {
    users(page: $page, size: $size) {
      data {
        email
        id
        name
      }
      totalRecords
    }
  }
`;

const USER_DETAILS = gql`
query ExampleQuery($userId: String!) {
  user(id: $userId) {
    email
    id
    name
  }
}
`

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(usersData.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(usersData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.usersList = action.payload;
      })
      .addCase(usersData.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(userDetails.pending,(state,action)=>{
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(userDetails.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userData = action.payload
      })
      .addCase(userDetails.rejected,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
  },
});

export const usersData = createAsyncThunk(
  "USERS/DATA",
  async (pageInfo: PAGE_INFO) => {
    try {
      const response = await client.query({
        query: USERS_QUERY,
        variables: pageInfo,
      });
      return response.data.users.data;
    } catch (error) {}
  }
);

export const userDetails = createAsyncThunk(
  "USER/DETAILS",
  async (userInfo: USER_DATA) => {
    try {
        const response = await client.query({
            query: USER_DETAILS,
            variables:userInfo
        })
        // console.log(response,"single user details response")
        return response.data.user
    } 
    catch (error) {

    }
});
export default usersSlice.reducer;
