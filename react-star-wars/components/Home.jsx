import React from 'react';

const Home = ({ data }) => {
    console.log(data)
    const handleClick = async (character) => {
        // this will go to the character component
        try {
            const response = await fetch(`${import.meta.env.VITE_SWAPI_URL}/${character.id}`);            
            if (!response.ok) {
                throw new Error('Data could not be fetched!');
            }
            const json_response = await response.json();
            console.log("JSON RESPONSE: ", json_response);
        } catch (error) {
            console.error('Error fetching socks:', error);
        }
    }
    return (
        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {
                data.map((character) => (
                    <div onClick={() => handleClick(character)} key={character.id}> {character.name} </div>
                ))
            }
        </div>
    );
}

export default Home;