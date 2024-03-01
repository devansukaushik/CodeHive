import { combineReducers } from "redux";      //In a Redux application using combineReducers, each key in the combined reducer object represents a slice of the overall state.

import authReducer from "./auth";    //represents the slice of the state managed by the authReducer. It might include information related to user authentication, such as login status, user tokens, or authentication errors.

import currentUserReducer from "./currentUser";   // store information about the currently logged-in user, such as their username, ID, and any other relevant user data.

import questionsReducer from "./questions";   // holds data related to questions in your application, such as an array of questions, their IDs, and associated information.

import usersReducer from "./users";    // store information about users in your application, such as user profiles, IDs, and other user-related data. 

export default combineReducers({
  authReducer,
  currentUserReducer,
  questionsReducer,
  usersReducer,
});
