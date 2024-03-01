import React from "react";
import ReactDOM from "react-dom/client";     //ReactDOM.createRoot is used from the experimental react-dom package to create a root entry point for the React application.
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Reducers from "./reducers";

const store = createStore(Reducers, compose(applyMiddleware(thunk)));    //creates a Redux store using the createStore function from Redux.
//Reducers is the combined reducer that combines multiple reducers into a single reducer
//applyMiddleware(thunk) adds support for asynchronous actions using redux-thunk. Thunk allows you to write action creators that return functions instead of actions.

const root = ReactDOM.createRoot(document.getElementById("root"));       //ReactDOM.createRoot is used to create a root entry point for the React application.
root.render(
  <Provider store={store}>    
    <React.StrictMode>
      <App />   
    </React.StrictMode>
  </Provider>
);
//Provider component from react-redux is used to wrap the entire application.
//<React.StrictMode> is used to enable React Strict Mode. It helps catch common mistakes and optimizes the app for production.
//<App /> is the root component of the application. It will have access to the Redux store through the Provider.



//Overall, this code sets up a React application with Redux, integrates the Redux store, and renders the application into the HTML element with the ID "root." The usage of ReactDOM.createRoot and React.StrictMode indicates an application designed to take advantage of React's concurrent mode and development features.






