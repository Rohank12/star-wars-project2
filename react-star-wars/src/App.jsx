import React, { useState, useEffect } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from '../components/Home'
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

  console.log(data)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <Home data={data} />
      </div>
    </>
  )
}

export default App
