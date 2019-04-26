import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

//커링 살펴보자
// const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);


//해당 애플리케이션이 초기에 설정되있는 state를 만들고 싶을 때, initialState 활용
// export default function configureStore(initialState) {
//   return createStoreWithMiddleWare(rootReducer, initialState);
// }


//createStore가 마지막 인자로 applyMiddleware를 받을 수 있게 리덕스 3.1버젼부터 바뀌어서 코드 수정함.
const initialState = {};

export default createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);