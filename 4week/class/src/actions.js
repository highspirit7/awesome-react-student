//통신하는 부분을 따로 빼서 제작하기도 한다.
import axios from "axios";
//덕스 패턴
//기능별로 모듈화

//action type 설정(인터페이스를 맞춰주는)
export const REQUEST_CONTENTS = "REQUEST_CONTENTS";
export const RECEIVE_CONTENTS = "RECEIVE_CONTENTS";
export const CHANGE_FULL_CONTENT = "CHANGE_FULL_CONTENT";
export const CHANGE_SEARCH_INPUT = "CHANGE_SEARCH_INPUT";

//action creator(액션 생성자)
const requestContents = () => ({ type: REQUEST_CONTENTS });
const receiveContents = contents => ({
  type: RECEIVE_CONTENTS,
  contents: contents,
  receiveAt: Date.now()
});

//화살표 함수에서 화살표 이후 부분을 소괄호로 감싸면 감싼 부분 전체를 자동적으로 리턴하게 된다.
export const changeFullContent = content => ({
  type: CHANGE_FULL_CONTENT,
  content: content
});

export const changeSearchInput = event => ({
  type: CHANGE_SEARCH_INPUT,
  payload: event.target.value
});

const token = "AIzaSyAsNDtwveKzPT0SWzREwuBpmswH18CIffg";
const maxResults = 29;

const API = ({ token = "", maxResults = 30, keyword = "" }) => {
  const URL = "https://www.googleapis.com/youtube/v3/";
  let api;
  console.log(keyword)
  if (keyword !== "") {
    api =
      URL +
      `search?q=${keyword}&part=snippet&chart=mostPopular&key=${token}&maxResults=${maxResults}`;
  } else {
    api =
      URL +
      `videos?part=snippet&chart=mostPopular&key=${token}&maxResults=${maxResults}`;
  }

  return axios.get(api);
};

const setContents = (data, type) => {
  let list = [];

  switch (type) {
    case "main":
      data.items.forEach((item, index) => {
        list.push({ id: item.id, name: item.snippet.title });
      });
      return list;
    case "search":
      data.items.forEach((item, index) => {
        list.push({ id: item.id.videoId, name: item.snippet.title });
      });
      return list;
    default:
      return list;
  }
};

//비동기 action(async action)
export const fetchContents = () => {
  return dispatch => {
    dispatch(requestContents());

    return API({ token, maxResults })
      .then(({ data }) => setContents(data, "main"))
      .then(contents => {
        dispatch(changeFullContent(contents[0]));
        dispatch(receiveContents(contents.slice(1, contents.length)));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const fetchSearchContents = keyword => {
  return dispatch => {
    dispatch(requestContents());

    return API({ token, maxResults, keyword })
      .then(({ data }) => setContents(data, "search"))
      .then(contents => {
        dispatch(changeFullContent(contents[0]));
        dispatch(receiveContents(contents.slice(1, contents.length)));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
