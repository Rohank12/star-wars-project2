import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
  } from "react-router-dom";

const Characters = () => {
    const [character, setCharacter] = useState({
        characterInfo: {},
        planetInfo: {},
        filmsInfo: []
    });
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                  const response1 = await fetch(`${import.meta.env.VITE_SWAPI_URL}/${id}`);            
                  if (!response1.ok) {
                    throw new Error('Character could not be fetched!');
                }
                const char_response = await response1.json();
                //console.log(json_response)
                  const response2 = await fetch(`http://localhost:3000/api/characters/${id}/films`);
                  if (!response2.ok) {
                    throw new Error("Films could not be fetched!");
                  }
                const film_response = await response2.json();
                //console.log(json_response)

                  const response3 = await fetch(`http://localhost:3000/api/planets/${char_response.homeworld}`);
                  if (!response3.ok) {
                    throw new Error ("Planet could not be fetched!")
                  }
                const planet_response = await response3.json();
                //console.log(json_response)

                setCharacter({
                    characterInfo: {...char_response},
                    planetInfo: {...planet_response},
                    filmsInfo: [...film_response]
                })
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
        fetchData();
      }, []);
      console.log(character)
    
    return (
    <>
  <main>
    <h1 id="name" />
    <section id="generalInfo">
    <h1>A Star Wars Character</h1>
      <p>
        Height: {character.characterInfo.height}<span id="height" /> cm
      </p>
      <p>
        Mass: {character.characterInfo.mass}<span id="mass" /> kg
      </p>
      <p>
        Born: {character.characterInfo.birth_year}<span id="birth_year" />
      </p>
    </section>
    <section id="planets">
      <h2>Homeworld</h2>
        <div>
            <Link to={`planets/${character.planetInfo.id}`}>{character.planetInfo.name}</Link>
        </div>
        <span id="homeworld" />
    </section>
    <section id="films">
      <h2>Films appeared in</h2>
      {character.filmsInfo.map(film => (
        <div key={film.id}>
            <Link to={`/films/${film.id}`}>{film.title} </Link>
        </div>
      ))}
      <ul />
    </section>
  </main>
    </>
  )
}

export default Characters;