// Imports
import { API_URL } from "../../constants";
import { AsyncStorage } from "react-native";

// Actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";
const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";

// Action Creators
function setLogIn(token) {
    return {
      type: LOG_IN,
      token
    };
}
  
function logOut(user) {
    return { type: LOG_OUT };
}
  
function setUser(user) {
    return {
      type: SET_USER,
      user
    };
}

function setNotifications(notifications) {
    return {
      type: SET_NOTIFICATIONS,
      notifications
    };
}

// API Actions
function login(username, password) {
    return dispatch => {
      return fetch(`${API_URL}/rest-auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      })
        .then(response => response.json())
        .then(json => {
          console.log(JSON.stringify(json));          
          if (json.user && json.token) {
            dispatch(setLogIn(json.token));
            dispatch(setUser(json.user));
            return true;
          }else{
            return false;
          }
        });
    };
}

function getNotifications() {
    return (dispatch, getState) => {
      const { user: { token } } = getState();
      fetch(`${API_URL}/notifications/`, {
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(response => {
          if (response.status === 401) {
            dispatch(logOut());
          } else {
            return response.json();
          }
        })
        .then(json => dispatch(setNotifications(json)));
    };
}
  
function getOwnProfile() {
    return (dispatch, getState) => {
      const { user: { token, profile: { username } } } = getState();
      fetch(`${API_URL}/users/${username}/`, {
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(response => {
          if (response.status === 401) {
            dispatch(logOut());
          } else {
            return response.json();
          }
        })
        .then(json => dispatch(setUser(json)));
    };
}

// Initial State

const initialState = {
    isLoggedIn: false
  };
  
// Reducer

function reducer(state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
            return applyLogIn(state, action);
        case LOG_OUT:
            return applyLogOut(state, action);
        case SET_USER:
            return applySetUser(state, action);
        case SET_NOTIFICATIONS:
            return applySetNotifications(state, action);    
        default:
            return state;
    }
}

// Reducer Functions
function applyLogIn(state, action) {
    const { token } = action;
    return {
      ...state,
      isLoggedIn: true,
      token
    };
}
  
async function applyLogOut(state, action) {
    console.log("===applyLogOut============="+JSON.stringify(state));
    const { token } = action;
    await AsyncStorage.clear(); //logout: clear storage, remove everything in the storage
    return {
      ...state,
      isLoggedIn: false,
      token: ""
    };
}
  
function applySetUser(state, action) {
    const { user } = action;
    return {
      ...state,
      profile: user
    };
}

function applySetNotifications(state, action) {
    const { notifications } = action;
    return {
      ...state,
      notifications
    };
}

// Exports
const actionCreators = {
    login,
    logOut,
    getNotifications,
    getOwnProfile
};
  
export { actionCreators };

// Default Reducer Export

export default reducer;