import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
  } from "react-router-dom";

const Films = () => {
    const [film, setFilm] = useState({
        filmInfo: {},
        planetsInfo: [],
        charactersInfo: []
    });
    const { id } = useParams();

        useEffect(() => {
        const fetchData = async () => {
            try {
                  const response1 = await fetch(`http://localhost:3000/api/films/${id}`);            
                  if (!response1.ok) {
                    throw new Error('Film could not be fetched!');
                }
                const film_response = await response1.json();
                //console.log(json_response)
                  const response2 = await fetch(`http://localhost:3000/api/films/${id}/planets`);
                  if (!response2.ok) {
                    throw new Error("Planets could not be fetched!");
                  }
                const planets_response = await response2.json();
                //console.log(json_response)

                  const response3 = await fetch(`http://localhost:3000/api/films/${id}/characters`);
                  if (!response3.ok) {
                    throw new Error ("Characters could not be fetched!")
                  }
                const characters_response = await response3.json();
                //console.log(json_response)

                setFilm({
                    filmInfo: {...film_response},
                    planetsInfo: [...planets_response],
                    charactersInfo: [...characters_response]
                })
            } catch (error) {
                console.error('Error fetching films:', error);
            }
        };
        fetchData();
      }, []);

    return (
    <>
  <main>
    <h1 id="title" />
    <h1>A Star Wars film</h1>
    <h1>{film.filmInfo.title}</h1>
    <section id="generalInfo">
      <p>
        Producer: {film.filmInfo.producer}<span id="producer" />
      </p>
      <p>
        Director: {film.filmInfo.director}<span id="director" />
      </p>
      <p>
        Release Date: {film.filmInfo.release_date}<span id="release-date" />
      </p>
    </section>
    <section id="opening-container">
      <p id="opening" />
    </section>
    <section id="planets">
      <h2>Planets featured</h2>
      {film.planetsInfo.map(planet => (
        <div key={planet.id}>
            <Link to={`/planets/${planet.id}`}> {planet.name} </Link>
        </div>
      ))}
      <ul id="planetsList" />
    </section>
    <section id="characters">
      <h2>Characters</h2>
      {film.charactersInfo.map(character => (
        <div key={character.id}>
            <Link to={`/characters/${character.id}`}> {character.name} </Link>
        </div>
      ))}
    </section>
    </main>
    </>
    );
    
}

export default Films;