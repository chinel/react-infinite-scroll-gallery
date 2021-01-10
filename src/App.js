import React, { useEffect } from "react";
import "./App.css";

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
  useEffect(() => {
    console.log(accessKey);
    fetch("https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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

      <div className="image-grid">
        {[...Array(100)].map((_, index) => (
          <div className="image" key={index}>
            <img src="https://placekitten.com/g/1920/1080" alt="Sample" />
          </div>
        ))}
      </div>
    </div>
  );
}
