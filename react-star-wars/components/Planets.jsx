import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
  } from "react-router-dom";


const Planets = () => {
    const [planet, setPlanet] = useState({
        planetInfo: {},
        characterInfo: [],
        filmsInfo: []
    });
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                  const response1 = await fetch(`${import.meta.env.VITE_SWAPI_URL_2}/${id}`);            
                  if (!response1.ok) {
                    throw new Error('Character could not be fetched!');
                }
                const planet_response = await response1.json();
                //console.log(json_response)
                  const response2 = await fetch(`http://localhost:3000/api/planets/${id}/characters`);
                  if (!response2.ok) {
                    throw new Error("Films could not be fetched!");
                  }
                const character_response = await response2.json();
                //console.log(json_response)

                  const response3 = await fetch(`http://localhost:3000/api/planets/${id}/films`);
                  if (!response3.ok) {
                    throw new Error ("Planet could not be fetched!")
                  }
                const film_response = await response3.json();
                //console.log(json_response)

                setPlanet({
                    planetInfo: {...planet_response},
                    characterInfo: [...character_response],
                    filmsInfo: [...film_response]
                })
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
        fetchData();
      }, []);

    return(
        <>
  <main>
    <h1 id="name" />
    <section id="generalInfo">
    <h1>A Star Wars Planets</h1>
      <p>
        Climate: {planet.planetInfo.climate}<span id="climate" /> 
      </p>
      <p>
        Terrain: {planet.planetInfo.terrain}<span id="terrain" />
      </p>
      <p>
        Diameter: {planet.planetInfo.diameter}<span id="diameter" />
      </p>
    </section>
    <section id="characters">
      <h2>Characters</h2>
      {planet.characterInfo.map(character => (
        <div key={character.id}>
            <Link to={`/characters/${character.id}`}>{character.name} </Link>
        </div>
      ))}
    </section>
    <section id="films">
      <h2>Films appeared in</h2>
      {planet.filmsInfo.map(film => (
        <div key={film.id}>
            <Link to={`/films/${film.id}`}>{film.title} </Link>
        </div>
      ))}
      <ul />
    </section>
  </main>
    </>
    ); 
}

export default Planets;