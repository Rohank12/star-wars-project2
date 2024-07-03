import React, { useState, useEffect } from "react";
import Home from '../components/Home'
import Planets from "../components/Planets";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import './App.css'

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
              const response = await fetch(import.meta.env.VITE_SWAPI_URL);            
              if (!response.ok) {
                throw new Error('Data could not be fetched!');
            }
            const json_response = await response.json();
            setData(json_response); // assign JSON response to the data variable.
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };
    fetchData();
  }, []);

  return (
    <>
    <Router>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Star Wars Characters</title>
      <link rel="stylesheet" href="App.css" />
      <div id="search-div">
        <h1>Star Wars Universe Lookup</h1>
        <label htmlFor="searchString">
          Who you looking for?{" "}
          <span className="small">(Regular expressions are cool here)</span>
        </label>
      </div>
      <div id="charactersList">
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/planets/:id" element={<Planets/>} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App