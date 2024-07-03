import React from 'react';
import { Link } from 'react-router-dom'

const Home = ({ data }) => { 
    console.log(data)
    return (
        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {
                data.map((character) => (
                    <div key={character.id}> 
                        <Link to={`/characters/${character.id}`}>{character.name} </Link>
                    </div>
                ))
            }
        </div>
    );
}

export default Home;