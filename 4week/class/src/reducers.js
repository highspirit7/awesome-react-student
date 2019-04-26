import { combineReducers } from "redux";
import {
  REQUEST_CONTENTS,
  CHANGE_FULL_CONTENT,
  RECEIVE_CONTENTS,
  CHANGE_SEARCH_INPUT
} from "./actions";
// import { bindActionCreators } from "redux";

function selectedContent(
  state = {
    viewContent: {}
  },
  action
) {
  switch (action.type) {
    case CHANGE_FULL_CONTENT:
      return Object.assign({}, state, 
        {viewContent: action.content });
    default:
      return state;
  } 
}

function selectedKeyword(
  state = {
    keyword: ""
  },
  action
) {
  switch (action.type) {
    case CHANGE_SEARCH_INPUT:
      return Object.assign({}, state, {
        keyword: action.payload
      });
    default:
      return state;
  }
}

function contentsByYoutube(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_CONTENTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_CONTENTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.contents,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  contentsByYoutube,
  selectedContent,
  selectedKeyword
});

export default rootReducer;
