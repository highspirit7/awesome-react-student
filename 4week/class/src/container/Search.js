import React, { Component} from "react"
import ContentList from "../component/contentList/ContentList.js";
// import axios from "axios";
import { connect } from "react-redux";
import { changeSearchInput, fetchSearchContents } from "../actions";

class Search extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //       contents : [],
    //       keyword: ""
    //     };
    // }

    // handleInputChange = (e) => {
    //   this.setState({keyword:e.target.value})
    // }

    //MainView의 setContents 함수와  id가 다르다. item.id.videoId
  //   setContents = (data) => {
  //    let list = []
  //     data.items.forEach((item, index) => {
  //       if(item.id.videoId) {
  //         list.push({id:item.id.videoId,name:item.snippet.title})
  //       }
  //     })
  //     return list
  // }

   handleSubmit = (e) => {
   
    this.props.fetchSearchContents(this.props.keyword);
    e.preventDefault();
  }

    // fetchSearch = (keyword) => {
    //   let maxResults = 30
    //   let token = 'AIzaSyC-v1sIG2Wn3YnoD_7_bBS4zPDceDLKmLY'//본인의 토큰을 발급 받아서 입력
    //   axios.get('https://www.googleapis.com/youtube/v3/search?q='+keyword+'&part=snippet&key='+token+'&maxResults='+maxResults)
    //   .then(({data}) => {
    //     const list = this.setContents(data)
    //     this.setState({contents:list})
    //   })
    // }

    render() {
        return (
          <div className="Search">
            <form className="" onSubmit={this.handleSubmit}>
              <div className="form-group row align-items-center justify-content-center">
                <div className="col-md-3">
                  {/* <label>검색</label> */}
                  <input value={this.props.keyword} onChange={this.props.changeSearchInput} type="text" className="form-control keyword" placeholder="Search..."/>
                </div>
              </div>
            </form>

            <ContentList contents={this.props.contents} />
          </div>
        );
      }
 }

 
 const mapStateToProps = state => {
  //reducer단위로 받는 state 구분
  //mapStateToProps의 인자로 스토어의 state 자체가 들어가는 거 같은데, 아래의 객체 구조분해할당이 어떻게 가능한지 궁금하다.
  const { contentsByYoutube, selectedKeyword } = state;

  //items에 들어있는 데이터를 이름만바꿔서 contents에 담는다.
  const { lastUpdated, items: contents } = contentsByYoutube || {};

  const { keyword } = selectedKeyword || {};

  return {
   
    lastUpdated,
    contents,
    keyword
  };
};


const mapDispatchToProps = dispatch => ({
  fetchSearchContents: (keyword) => dispatch(fetchSearchContents(keyword)),
  changeSearchInput: event => dispatch(changeSearchInput(event))
});

 export default connect(
   mapStateToProps,
   mapDispatchToProps
 )(Search);