import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: 'Some Name',
  profileIMG: '',
};


export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setProfileIMG(state, action) {
      state.profileIMG = action.payload;
    },
  },
});

export const { setName, setProfileIMG } = profileSlice.actions;

export default profileSlice.reducer;