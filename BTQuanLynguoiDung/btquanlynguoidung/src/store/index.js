import { combineReducers, createStore } from "redux";
import { BTQuanLySinhVien } from "./BTQuanLySinhVien"


const rootReducers = combineReducers({
    BTQuanLySinhVien,
})


export const store = createStore(rootReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())