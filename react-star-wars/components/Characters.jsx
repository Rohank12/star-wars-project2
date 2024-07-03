import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

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
}

export default Characters;