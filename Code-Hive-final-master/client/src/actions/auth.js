import * as api from "../api";
import { setCurrentUser } from "./currentUser";
import { fetchAllUsers } from "./users";
//two asynchronous action creators (signup and login) using Redux Thunk middleware.
export const signup = (authData, navigate) => async (dispatch) => {
  try {          //action creator takes authData (authentication data) and navigate (navigation function) as parameters.
    const { data } = await api.signUp(authData);     //uses the api.signUp function to make a POST request to the signup endpoint.
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));        //If the request is successful, it dispatches an "AUTH" action with the received data, updates the current user using setCurrentUser, fetches all users using fetchAllUsers, and navigates to the home ("/") page.
    dispatch(fetchAllUsers());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));        //If the request is successful, it dispatches an "AUTH" action with the received data, updates the current user using setCurrentUser, and navigates to the home ("/") page.
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
