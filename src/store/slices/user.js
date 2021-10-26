import { createSlice } from "@reduxjs/toolkit";
// axios
import axios from "axios";

export const postSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      email: "",
      id: 0,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = postSlice.actions;

export default postSlice.reducer;

export const getUser = (email) => (dispatch) => {
  axios
    .get(`http://localhost:8080/api/users/${email}`)
    .then((response) => {
      if (response.status === 204) {
        axios
          .post(`http://localhost:8080/api/users/`, {
            email: email,
          })
          .then((response) => {
            dispatch(setUser(response.data));
          })
          .catch((error) => console.log(error));
        return;
      }

      dispatch(setUser(response.data));
    })
    .catch((error) => console.log(error));
};

export const logoutUser = () => (dispatch) => {
  const defaultValue = {
    email: "",
    id: 0,
  };

  dispatch(setUser(defaultValue));
};
