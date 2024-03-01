const authReducer = (state = { data: null }, action) => {   //The initial state of the authReducer is an object with a property data set to null.

  switch (action.type) {     //reducer uses a switch statement to determine the behavior based on the type property of the action.
    case "AUTH":
      localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));       //action type is "AUTH," it updates the local storage with the user profile data using localStorage.setItem.

      return { ...state, data: action?.data };
    case "LOGOUT":       //action type is "LOGOUT," it clears the local storage, effectively logging the user out.
      localStorage.clear();
      return { ...state, data: null };      //returns a new state object with the existing state properties spread and the data property set to null.
    default:
      return state;      //If the action type doesn't match any of the defined cases, the reducer returns the current state unchanged.
  }
};

export default authReducer;


// This reducer appears to handle actions related to user authentication. The "AUTH" case is likely triggered when a user logs in, updating the state with user data and storing it in local storage. The "LOGOUT" case is likely triggered when a user logs out, clearing the local storage and setting the user data in the state to null.