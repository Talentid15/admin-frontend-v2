import { createSlice } from "@reduxjs/toolkit";

const initialState ={

    data:null,
}

const userSlice = createSlice({

    name:'user',
    initialState:initialState,
    reducers:{

        setUserData:(state,action)=>{

            state.data = action.payload;

        },
        logout:(state,action)=>{

            state.data = null;
        }
    }
})

export const { setUserData, logout } = userSlice.actions;

export default userSlice.reducer;