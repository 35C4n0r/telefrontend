import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isSignedIn: false,
    isLoading: true,
    name: null,
    error: null
}

export const setUserState = createAsyncThunk(
    'user/state',
    async (data, thunkAPI) => {
        return data;
    }
)

const authSlice = createSlice({
    name: 'covid/auth',
    initialState: initialState,
    reducers: {
    },
    extraReducers: {
        [setUserState.fulfilled]: (state, action) => {
            state.isSignedIn = action.payload.user !== null;
            state.isLoading = action.payload.isLoading;
            state.user = action.payload.user;
            state.name = action.payload.name;
            state.error = action.payload.error;
        }
    }
})

export default authSlice.reducer;