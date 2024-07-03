import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

const Characters = ( {data} ) => {
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
                let json_response = await response1.json();
                console.log(json_response)
                //console.log(character)
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
        fetchData();
      }, []);
    

    //const planetURL = 'http://localhost:3000/api/planet/:id'
    //const filmsURL = `http://localhost:3000/api/characters/${id}/films`
    // might as well do a fetch for the character/:id as well
    // need to fetch homeworld name (we get id of planet)
    // need to fetch what movie they were in (/api/characters/:id/films)

}

export default Characters;