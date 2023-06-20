import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sorted: {
    name: "популярности",
    sort: "rating",
  },
  pagination: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSorted(state, action) {
      state.sorted = action.payload;
    },
    setPagination(state, action) {
      state.pagination = action.payload;
    },
    setFilters(state, action) {
      state.sorted.sort = action.payload.sorted;
      state.categoryId = Number(action.payload.categoryId);
      state.pagination = Number(action.payload.pagination);
    },
  },
});

export const { setCategoryId, setSorted, setPagination, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
