import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { productReducer } from "./productDetails";
import cartReducer from "../Store/reducer";
export default combineReducers({
  form: formReducer,
  productReducer,
  cartReducer,
});
