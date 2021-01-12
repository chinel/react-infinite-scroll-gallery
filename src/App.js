import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch(`https://api.unsplash.com/photos/?client_id=${accessKey}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImages(data);
      });
  }, []);

  //if no access key throw error
  if (!accessKey) {
    return (
      <a href="https://unsplash.com/developers" className="error">
        Required: Get your unsplash access key first
      </a>
    );
  }
  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form>
        <input type="text" placeholder="Search Unsplash..." />
        <button>Search</button>
      </form>
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={this.refresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
      >
        <div className="image-grid">
          {images.map((image, index) => (
            <div className="image" key={index}>
              <img src={image.urls.regular} alt={image.alt_description} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
