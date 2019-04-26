import React, { Component } from "react";
import "./MainView.css";
import ContentList from "../component/contentList/ContentList.js";
import FullContent from "../component/fullcontent/FullContent.js";
import { connect } from "react-redux";
import { fetchContents, changeFullContent } from "../actions";
/*
  mainview
    - fullContent.js
    - mainvew.js -> redux(ducks action, reducer)
    - chart.js
    - index.js
    
  search
    - index.js
    - search.js
    - historyContainer.js
    - historyListPre.js
  
  shared
    - contentList.js
    - content.js

  ////////////////////////
  content
    - pre....
  container
    - continesr...
  view
    - pre + containter.. 
*/
class MainView extends Component {
  //컴포넌트 렌더링이 완료된 후 유튜브에서 데이터 불러옴
  componentDidMount() {
    this.props.fetchContents();
  }

  //메인화면에서 영상을 실행하는 플레이어를 제어하는 함수
  //이 함수를 이용해서 영상을 변경 한다.
  //리덕스 쓰니까 이 함수 없애도 된다.
  
  //해당 함수는 손자 컴포넌트인 content 컴포넌트에서 결국 사용되는데, content 컴포넌트가 리덕스 store와 1대1 통신하도록 바꾸어줄 수 있는가?
  handleFullContentChange = content => {
    this.props.changeFullContent(content);
  };

  render() {

    return (
      <div className="mainView">
        {/*
			영상을 실행 시키는 컴포넌트 
      	*/}
        <FullContent content={this.props.currentViewContent} />
        {/*
			실행할 영상 리스트를 출력하는 컴포넌트
      	*/}
        <ContentList
          contents={this.props.contents}
          onClick={this.handleFullContentChange}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  //reducer단위로 받는 state 구분
  console.log(state)
  const { contentsByYoutube, selectedContent } = state;

  //items에 들어있는 데이터를 이름만바꿔서 contents에 담는다.
  const { isFetching, lastUpdated, items: contents } = contentsByYoutube || {};

  const { viewContent: currentViewContent } = selectedContent || {};
  console.log(state);
  return {
    isFetching,
    lastUpdated,
    currentViewContent,
    contents
  };
};


const mapDispatchToProps = dispatch => ({
  fetchContents: () => dispatch(fetchContents()),
  changeFullContent: content => dispatch(changeFullContent(content))
});

//state를 전달하는 함수 먼저, 그다음 dispatch 관련 함수 이렇게 순서를 지켜서 connect해주어야한다.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
