import { useEffect, useState } from "react";
import { GetAllWithSprites, GetDetails, GetSearchedPokemon } from "../../api/api";
import "./home.scss";
import Details from "../detials/details";
import Search from "../search/search";

const Home = () => {
	const [pokemonList, setPokemonList] = useState([]);
	const [selectedPokemon, setSelectedPokemon] = useState("");
	const [searchValue, setSearchValue] = useState(null);

	const getAll = async () => {
		try {
			const pokemonData = await GetAllWithSprites();
			setPokemonList(pokemonData);
		} catch (error) {
			console.error(error);
		}
	};

	const getSearched = async () => {
		try {
			const pokemonData = await GetSearchedPokemon(searchValue);
			setPokemonList([pokemonData]);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSelection = (e, id) => {
		// console.log(GetDetails(id));
		setSelectedPokemon(id);
	};

	useEffect(() => {
		if (searchValue === "" || searchValue === null) {
			getAll();
		} else {
			getSearched(searchValue);
		}
	}, [searchValue]);

	console.log(GetAllWithSprites());

	return (
		<>
			<Search setSearch={setSearchValue} setPokemon={setSelectedPokemon} />
			{selectedPokemon !== "" ? (
				<Details pokemon={selectedPokemon} setPokemon={setSelectedPokemon} />
			) : (
				<section className="pokemon__container">
					{pokemonList.map(poke => (
						<div key={poke.id} className="pokemon__display">
							<h2>{poke.name}</h2>
							<img
								src={poke.sprite}
								alt={poke.name}
								onClick={e => handleSelection(e, poke.id)}
							/>
						</div>
					))}
				</section>
			)}
		</>
	);
};

export default Home;
