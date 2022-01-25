import React from "react";

// export class NewsItem extends Component {
  const NewsItem = (props) =>{
  // render() {
    // let { title, props.description, props.imageUrl, props.newsUrl, date, props.author } = this.props;
    return (
      <div className="ml-3">
        <div className="card">
          <img
            src={
              !props.imageUrl
                ? "https://d2e111jq13me73.cloudfront.net/sites/default/files/styles/amp_blog_image_large/public/blog/csm-blog/breaking-news-blog-1138x658-1.jpg?itok=yqaRxbyn"
                : props.imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{props.title}...</h5>
            <p className="card-text">{props.description}</p>
            <p className="card-text">
              <small className="text-danger">
                By {!props.author ? "Unknown" : props.author} on{" "}
                {new Date(props.date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={props.newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }


export default NewsItem;
