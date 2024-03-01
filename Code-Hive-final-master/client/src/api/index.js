import axios from "axios";

const API = axios.create({      //An Axios instance named API is created using axios.create()
  baseURL: "http://localhost:5000",
  // baseURL: "https://stack-overflow-eight.vercel.app/",
});

API.interceptors.request.use((req) => {     // interceptor is added to the Axios instance using API.interceptors.request.use
  //interceptor is used to modify the request configuration before it is sent.
  if (localStorage.getItem("Profile")) {      //If a user profile exists in the local storage (indicating the user is authenticated), the user's token is added to the authorization header.
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const logIn = (authData) => API.post("/user/login", authData);   //logIn: Makes a POST request to "/user/login" with authentication data.
export const signUp = (authData) => API.post("/user/signup", authData);    //signUp: Makes a POST request to "/user/signup" with authentication data.

export const postQuestion = (questionData) =>    
  API.post("/questions/Ask", questionData);    //postQuestion: Makes a POST request to "/questions/Ask" with question data.
export const getAllQuestions = () => API.get("/questions/get");    //getAllQuestions: Makes a GET request to "/questions/get" to retrieve all questions.
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value) =>
  API.patch(`/questions/vote/${id}`, { value });

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered) =>
  API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);
