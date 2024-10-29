import { gql } from "@apollo/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../apolloClient";
import { COUNTRY_DETAILS, STATES_DETAILS } from "@/app/location-list/page";

interface InitialState{
    countryList: string[],
    statesList : string[],
    cityList : string[],
    isLoading : boolean,
    isSuccess : boolean,
    isError: boolean
}

const initialState:InitialState={
    countryList:[],
    statesList:[],
    cityList:[],
    isLoading: false,
    isSuccess : false,
    isError: false
}

const COUNTRY = gql`
query Query {
  countries {
    id
    currencySymbol
    currencyName
    currency
    name
    phoneCode
  }
}
`

const STATES = gql`
query Query($statesId: ID!) {
  states(id: $statesId) {
    id
    name
  }
}
`

const CITIES = gql`
query Query($citiesId: ID!) {
  cities(id: $citiesId) {
    id
    name
  }
}
`

const locationSlice = createSlice({
    name:"location",
    initialState: initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(countryData.pending,(state)=>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        .addCase(countryData.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.countryList = action.payload
        })
        .addCase(countryData.rejected,(state)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
        })
        .addCase(statesData.pending,(state)=>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        .addCase(statesData.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.statesList = action.payload
        })
        .addCase(statesData.rejected,(state)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
        })
        .addCase(citiesData.pending,(state)=>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        .addCase(citiesData.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.cityList = action.payload
        })
        .addCase(citiesData.rejected,(state)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
        })
    },
})

export const countryData = createAsyncThunk(
    "COUNRTY/DATA",
    async()=>{
        try {
            const response = await client.query({
                query: COUNTRY
            }) 
            return response.data.countries
        } catch (error) {
            console.log(error,"country error")
        }
    }
)

export const statesData = createAsyncThunk(
    "STATES/DATA",
    async(countryId:COUNTRY_DETAILS)=>{
        try {
            const response = await client.query({
                query: STATES,
                variables: countryId,
            })
            // console.log(response.data.states,"states response")
            return response.data.states
        } catch (error) {
            
        }
    }
)

export const citiesData = createAsyncThunk(
    "CITIES/DATA",
    async (statesId:STATES_DETAILS) =>{
        try {
            const response = await client.query({
                query: CITIES,
                variables: statesId
            })
            // console.log(response.data.cities)
            return response.data.cities
        } catch (error) {
            
        }
    }
)
export default locationSlice.reducer
