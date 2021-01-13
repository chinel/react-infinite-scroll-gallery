import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const getPhotos = React.useCallback(() => {
    let apiUrl = `https://api.unsplash.com/photos/?`;
    if (query)
      apiUrl = `https://api.unsplash.com/search/photos/?query=${query}`;

    apiUrl += `&page=${page}`;
    apiUrl += `&client_id=${accessKey}`;

    // console.log(apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const imagesFromApi = data.results ?? data;
        //if page is 1, then we need a whole new array of images
        if (page === 1) setImages(imagesFromApi);

        //if page > 1, then we are adding for our infinite scroll
        setImages((images) => [...images, ...imagesFromApi]);
      })
      .catch((err) => console.err(err));
  }, [page, query]);

  useEffect(() => {
    getPhotos();
  }, [page, getPhotos]);

  function searchPhotos(e) {
    e.preventDefault();
    setPage(1);
    getPhotos();
  }

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

      <form onSubmit={searchPhotos}>
        <input
          type="text"
          placeholder="Search Unsplash..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button>Search</button>
      </form>
      <InfiniteScroll
        dataLength={images.length} //This is important field to render the next data
        next={() => setPage((page) => page + 1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="image-grid">
          {images.map((image, index) => (
            <a
              className="image"
              key={index}
              href={image.links.html}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={image.urls.regular} alt={image.alt_description} />
            </a>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
