import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // thunk middleware

const middleware = [thunk];

const store = createStore(() => [], {}, applyMiddleware(...middleware));

export default store;
