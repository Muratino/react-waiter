import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllAsortyment = createAsyncThunk(
  "order/fetchAsortymentStatus",
  async (params) => {
    const { search } = params;
    const { data } = await axios.get(
      `https://62bdc6edc5ad14c110c685b7.mockapi.io/waiter?search=${search}`
    );
    return data;
  }
);

const initialState = {
  arrAsort: [],
  zamov: [],
  store: [],
  weekDay: [0, 1, 2, 3, 4, 5, 6],
  raport: [
    { dni: "Pon", h: 8, liczba: 0 }, //0
    { dni: "Wt", h: 8, liczba: 0 }, //1
    { dni: "Cr", h: 8, liczba: 0 }, //2
    { dni: "Cz", h: 7, liczba: 0 }, //3
    { dni: "Pie", h: 8, liczba: 0 }, //4
    { dni: "Sob", h: 5, liczba: 0 }, //5
    { dni: "Nied", h: 0, liczba: 0 }, //6
  ],
  search: "",
  status: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetAllInfo(state) {
      state.raport.map((item) => { // eslint-disable-line
        // item.h = 0;
        item.liczba = 0;
      });
    },
    setLiczba(state, action) {
      state.raport[action.payload].liczba++;
    },
    changeDay(state, action) {
      state.weekDay = action.payload;
    },
    setActionLiczba(state, action) {
      state.raport[action.payload.index].liczba = +action.payload.elem;
    },
    setHours(state, action) {
      state.raport[action.payload].h = action.payload.time;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setArrAsort(state, action) {
      state.arrPizza.push(action.payload);
    },
    setNewZamov(state, action) {
      state.zamov.push(action.payload);
    },
    setStore(state, action) {
      state.store.push(action.payload);
    },
    deletStore(state, action) {
      state.store = state.store.filter((item) => item !== action.payload);
    },
    setChekZamov(state, action) {
      state.zamov.map((elem) => { // eslint-disable-line
        if (elem.id == action.payload) { // eslint-disable-line
          elem.chek = !elem.chek;
        }
      });
    },
    setChekPayment(state, action) {
      state.zamov.map((elem) => { // eslint-disable-line
        if (elem.id == action.payload) { // eslint-disable-line
          elem.payment = !elem.payment;
        }
      });
    },
    deletZamov(state, action) {
      state.zamov = state.zamov.filter((item) => item.id !== action.payload);
    },
    deletAll(state) {
      state.zamov = [];
      state.store = [];
      state.search = "";
      state.status = "";
    },
  },
  extraReducers: {
    [fetchAllAsortyment.pending]: (state) => {
      state.arrAsort = [];
      state.status = "loading";
    },
    [fetchAllAsortyment.fulfilled]: (state, action) => {
      if (action.payload.length == 0) { // eslint-disable-line
        state.status = "notFounded";
      } else {
        state.arrAsort = action.payload;
        state.status = "success";
      }
    },
    [fetchAllAsortyment.rejected]: (state) => {
      state.status = "error";
      state.arrAsort = [];
    },
  },
});

export const {
  resetAllInfo,
  changeDay,
  setActionLiczba,
  setHours,
  setLiczba,
  deletAll,
  setChekPayment,
  deletStore,
  setStore,
  setChekZamov,
  setSearch,
  setStatus,
  setArrAsort,
  setNewZamov,
  deletZamov,
} = orderSlice.actions;

export default orderSlice.reducer;
