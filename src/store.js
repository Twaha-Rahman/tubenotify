import { createStore, combineReducers } from "redux";
import addTitles from "./modules/addTitles";
import showLoader from "./modules/showLoader";
import stepCounter from "./modules/stepCounter";
import addDescriptions from "./modules/addDescriptions";
import addThumbnailLinks from "./modules/addThumbnailLinks";
import errorToggler from "./modules/errorToggler";
import currentlySelected from "./modules/currentlySelected";

const reducers = combineReducers({
    addDescriptions,
    addThumbnailLinks,
    addTitles,
    currentlySelected,
    errorToggler,
    showLoader,
    stepCounter
});

const Store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default Store;