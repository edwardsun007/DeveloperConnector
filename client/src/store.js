import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; // thunk middleware
import rootReducer from "./reducers"; // we can skip index.js because we named our reducer file index.js

const initialState = {};

const middleware = [thunk];

/* rootReducer, initialstate / prev state, middlewares */
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
