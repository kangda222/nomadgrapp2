// Imports

import { API_URL } from "../../constants";
import { actionCreators as userActions } from "./user";
import uuidv1 from "uuid/v1";

// Actions

const SET_FEED = "SET_FEED";
const SET_SEARCH = "SET_SEARCH";
const SET_LIKES = "SET_LIKES";

// Action Creators

function setFeed(feed) {
  return {
    type: SET_FEED,
    feed
  };
}

function setSearch(search) {
    return { type: SET_SEARCH, search };
}

function setLikes(likes) {
  return{
    type: SET_LIKES,
    likes
  }
}

// API Actions

function getFeed() {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    fetch(`${API_URL}/images/`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userActions.logOut());
        } else {
          return response.json();
        }
      })
      .then(json => dispatch(setFeed(json)));
  };
}

function getSearch() {
    return (dispatch, getState) => {
      const { user: { token } } = getState();
      fetch(`${API_URL}/images/search/`, {
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(response => {
          if (response.status === 401) {
            dispatch(userActions.logOut());
          } else {
            return response.json();
          }
        })
        .then(json => dispatch(setSearch(json)));
    };
}

function searchByHashtag(hashtag) {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    fetch(`${API_URL}/images/search/?hashtags=${hashtag}`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userActions.logOut());
        } else {
          return response.json();
        }
      })
      .then(json => dispatch(setSearch(json)));
  };
}

function likePhoto(photoId) {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    return fetch(`${API_URL}/images/${photoId}/likes`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logOut());
      } else if (response.ok) {
        return true;
      } else {
        return false;
      }
    });
  };
}

function unlikePhoto(photoId) {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    return fetch(`${API_URL}/images/${photoId}/unlikes`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logOut());
      } else if (response.ok) {
        return true;
      } else {
        return false;
      }
    });
  };
}

function uploadPhoto(file, caption, location, tags) {
  const tagsArray = tags.split(",");
  const data = new FormData();
  data.append("caption", caption);
  data.append("location", location);
  data.append("tags", JSON.stringify(tagsArray));
  data.append("file", {
    uri: file,
    type: "image/jpeg",
    name: `${uuidv1()}.jpg`
  });
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    return fetch(`${API_URL}/images/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "multipart/form-data"
      },
      body: data
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logOut());
      } else if (response.ok) {
        dispatch(getFeed());
        dispatch(userActions.getOwnProfile());
        return true;
      } else {
        return false;
      }
    });
  };
}

function getLikes(photoId) {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    return fetch(`${API_URL}/images/${photoId}/likes`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logOut());
      } else {
        return response.json();
      }
    })
    .then(json => dispatch(setLikes(json)));
  };
}

// Initial State

const initialState = {};

// Reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FEED:
      return applySetFeed(state, action);
    case SET_SEARCH:
      return applySetSearch(state, action);
    case SET_LIKES:
      return applySetLikes(state, action);
    default:
      return state;
  }
}

// Reducer Actions

function applySetFeed(state, action) {
  const { feed } = action;
  return {
    ...state,
    feed
  };
}

function applySetSearch(state, action) {
    const { search } = action;
    return {
      ...state,
      search
    };
}

function applySetLikes(state, action) {
  const { likes } = action;
  return {
    ...state,
    likes
  };
}

// Exports

const actionCreators = {
  getFeed,
  getSearch,
  likePhoto,
  unlikePhoto,
  searchByHashtag,
  uploadPhoto,
  getLikes
};

export { actionCreators };

// Default Reducer Export

export default reducer;