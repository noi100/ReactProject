import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null, // כאן יישמר האובייקט: { userName: "...", email: "...", password: "..." }
        isLoggedIn: false,
        id:0
    },
    reducers: {
        setLogin: (state, action) => {
            // action.payload הוא האובייקט המלא שנשלח מהטופס
            state.currentUser = action.payload;
            state.isLoggedIn = true;
        }
    }
});

export const { setLogin } = userSlice.actions;
export default userSlice.reducer;