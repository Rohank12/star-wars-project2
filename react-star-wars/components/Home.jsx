const Home = ({ data }) => {
    return (
        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {
                data.map((character) => (
                    <div key={character.id}> {character.name} </div>
                ))
            }
        </div>
    );
}

export default Home;