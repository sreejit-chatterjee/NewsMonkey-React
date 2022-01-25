import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=d7b11a9c02f84db7b919632eaa739b14&pageSize=${props.pageSize}`;
    setPage(page+1)
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} -- NewsMonkey`
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d7b11a9c02f84db7b919632eaa739b14&page=${page}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <div className="container my-3">
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row my-3">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 80)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    date={element.publishedAt}
                    author={element.author}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;

// import React, { Component } from "react";
// import NewsItem from "./NewsItem";
// import Spinner from "./Spinner";
// import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";

// export class News extends Component {
//   static defaultProps = {
//     country: "in",
//     pageSize: 6,
//     category: "general",
//   };
//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
//   };

//   capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: [],      // articles : this.articles,
//       loading: true,
//       page: 1,
//       totalArticles: 0,
//       // category : this.props.category
//     };
//     document.title = `${this.capitalizeFirstLetter(
//       this.props.category
//     )} - NewsMonkey`;
//   }

//   async updateNews(page) {
//     this.props.setProgress(10);
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=81abed3f443543c8989d9cad756764a0&page=${this.state.page}&pageSize=${this.state.pageSize}`;
//     this.setState({ loading: true });
//     let data = await fetch(url);
//     this.props.setProgress(30);
//     let parsedData = await data.json();
//     this.props.setProgress(50);
//     this.setState({
//       articles: parsedData.articles,
//       totalArticles: parsedData.totalResults,
//       loading: false,
//     });
//     this.props.setProgress(100);
//   }

//   async componentDidMount() {
//     this.updateNews(this.state.page);
//   }

//   fetchMoreData = async() => {
//     this.setState({
//       page: this.state.page + 1,
//     });
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=81abed3f443543c8989d9cad756764a0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//     // this.setState({ loading: true });
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     this.setState({
//       articles: this.state.articles.concat(parsedData.articles),
//       totalArticles: parsedData.totalResults,
//       loading: false,
//     });
//   };

//   render() {
//     return (
//       <div className="container my-3">
//         <h1 className="text-center" style={{ margin: "35px 0px", marginTop:"90px" }}>
//           Top {this.capitalizeFirstLetter(this.props.category)} Headlines
//         </h1>
//         {this.state.loading && <Spinner />}
//         <InfiniteScroll
//           dataLength={this.state.articles.length}
//           next={this.fetchMoreData}
//           hasMore={this.state.articles.length !== this.state.totalArticles}
//           loader={<Spinner />}
//         >
//           <div className="container">
//             <div className="row my-3">
//               {/* {!this.state.loading && this.state.articles.map((element) => { */}
//               {this.state.articles.map((element) => {
//                 return (
//                   <div className="col-md-4" key={element.url}>
//                     <NewsItem
//                       title={element.title ? element.title.slice(0, 45) : ""}
//                       description={
//                         element.description
//                           ? element.description.slice(0, 80)
//                           : ""
//                       }
//                       imageUrl={element.urlToImage}
//                       newsUrl={element.url}
//                       date={element.publishedAt}
//                       author={element.author}
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </InfiniteScroll>
//         {/* <div className="container d-flex justify-content-between">
//           <button
//             disabled={this.state.page <= 1}
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handlePrevClick}
//           >
//             &larr; Previous
//           </button>

//           <button
//             disabled={
//               this.state.page + 1 >
//               Math.ceil(this.state.totalArticles / this.props.pageSize)
//             }
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handleNextClick}
//           >
//             Next &rarr;
//           </button>
//         </div> */}
//       </div>
//     );
//   }
// }

// export default News;
