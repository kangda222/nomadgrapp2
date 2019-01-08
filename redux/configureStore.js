import { applyMiddleware, createStore } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist"; //save store on disk
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import user from "./modules/user";

const middlewares = [thunk]; //create middleware

const persistConfig = { //  create object, setup state, how to save: async
  key: "root",
  storage
};

const reducer = persistCombineReducers(persistConfig, {
  user
}); //  combine reducers, save reducers on the disk of mobliephone with configurations we made, reducer has user and persistconfig

const configureStore = () => {
  let store = createStore(reducer, applyMiddleware(...middlewares)); // excute middleware, this store is configured with reducer
  let persistor = persistStore(store); // persist store
  return { store, persistor };
};

export default configureStore;