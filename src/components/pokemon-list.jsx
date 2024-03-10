import React, { useState, useEffect, useRef } from 'react';
import '../styles/pokemon-list.css';

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const limit = 5;
    const loadMoreButtonRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            const data = await response.json();
            setTotal(data.count);

            const loadedPokemons = await Promise.all(
                data.results.map(async (pokemon) => {
                    const response = await fetch(pokemon.url);
                    return response.json();
                })
            );

            setPokemons((prev) => [...prev, ...loadedPokemons]);
        };

        fetchData();
    }, [offset]);

    const loadMore = () => {
        setOffset((prevOffset) => prevOffset + limit);
    };

    // Quando novos Pokémons são carregados, rolar para o botão "Carregar mais"
    useEffect(() => {
        if (loadMoreButtonRef.current) {
            loadMoreButtonRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [pokemons.length]);

    return (
        <div className="pokemon-list">
            {pokemons.map((pokemon) => (
                <div key={pokemon.id} className="pokemon-card">
                    {pokemon.sprites && pokemon.sprites.front_default ? (
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
                    ) : (
                        <div className="pokemon-placeholder-image">No image</div>
                    )}
                    <h2 className="pokemon-name">{pokemon.name}</h2>
                    <div className="pokemon-types">
                        {pokemon.types.map((typeInfo) => (
                            <span key={typeInfo.type.name} className={`pokemon-type ${typeInfo.type.name}`}>
                                {typeInfo.type.name}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
            <div className="load-more-container">
                {pokemons.length < total && (
                    <button onClick={loadMore} className="load-more-button" ref={loadMoreButtonRef}>
                        Load more
                    </button>
                )}
                <p>Displaying {pokemons.length} of {total} results</p>
            </div>
        </div>
    );
};

export default PokemonList;
