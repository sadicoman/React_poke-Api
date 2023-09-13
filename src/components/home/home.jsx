import { useEffect, useState } from "react";
import { GetAllWithSprites, GetDetails } from "../../api/api";

import "./home.scss";

const Home = () => {
	const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState('');

	const getAll = async () => {
		try {
			const pokemonData = await GetAllWithSprites();
			setPokemonList(pokemonData);
		} catch (error) {
			console.error(error);
		}
	};

    const handleSelection = (e, id) => {
			// console.log(GetDetails(id));
            setSelectedPokemon(id);
		};

	useEffect(() => {
		pokemonList.length === 0 ? getAll() : null;
	}, [pokemonList]);

	console.log(GetAllWithSprites());

	return (
		<section className="pokemon__container">
			{pokemonList.map(poke => (
				<div key={poke.id} className="pokemon__display">
					<h2>{poke.name}</h2>
					<img src={poke.sprite} alt={poke.name} onClick={(e) => handleSelection(e, poke.id)} />
				</div>
			))}
		</section>
	);
};

export default Home;
