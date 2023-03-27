import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {URL} from "../../baseURL";

const initialState = {

    tableSpinner: true,
    chartSpinner: true,

    countryList: ["Afghanistan"],
    allData: [],
    countryData: {
        population: 100,
        deaths: 50,
        recovered: 50,
        active: 50
    }
}

export const getCountries = createAsyncThunk(
    'data/countryList',
    async (data, thunkAPI) => {
        try {
            let countryListData = axios.get(`${URL}/countryList`);
            return (await countryListData).data;
        } catch (e) {
            console.log(e);
        }

    }
)

export const postCountryData = createAsyncThunk(
    'data/CountryData',
    async (data, thunkAPI) => {
        try {
            let countryData = axios.post(`${URL}/data`, data);
            return (await countryData).data;
        } catch (e) {
            console.log(e);
        }
    }
)

export const getAllData = createAsyncThunk(
    'data/AllData',
    async (data, thunkAPI) => {
        try {
            let allData = axios.get(`${URL}/all`);
            return (await allData).data;
        } catch (e) {
            console.log(e);
        }
    }
)

const dataSlice = createSlice({
    name: "covid-data",
    initialState: initialState,
    reducers: {},
    extraReducers: {

        // Reducers to handle list of Countries
        [getCountries.pending]: (state, action) => {},
        [getCountries.fulfilled]: (state, action) => {
            state.countryList = [...action.payload.data];
        },
        [getCountries.rejected]: (state, action) => {},


        // Reducers to handle Individual Company Information
        [postCountryData.pending]: (state, action) => {
            state.chartSpinner = true;
        },
        [postCountryData.fulfilled]: (state, action) => {
            state.countryData = {...action.payload.data};
            state.chartSpinner = false;
        },
        [postCountryData.rejected]: (state, action) => {},


        // Reducers to handle fetching of all data
        [getAllData.pending]: (state, action) => {
            state.tableSpinner = true;
        },
        [getAllData.fulfilled]: (state, action) => {
            state.allData = [...action.payload.data];
            state.tableSpinner = false;
        },
        [getAllData.rejected]: (state, action) => {
        },

    }
})

export default dataSlice.reducer;