import axios from "axios";

export const GetAllWithSprites = async () => {
	try {
		const listResponse = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
		const pokemonList = listResponse.data.results;

		const pokemonData = pokemonList.map(async pokemon => {
			const spriteReponse = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
			);
			const id = spriteReponse.data.id;
			const spriteData = spriteReponse.data.sprites.front_default;
			// console.log(id, spriteData);
			// console.log(spriteReponse);
			return {
				id: id,
				name: pokemon.name,
				sprite: spriteData,
			};
		});

		const pokemons = await Promise.all(pokemonData);
		return pokemons;

		// console.log(listResponse.data.results);
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const GetDetails = async id => {
	try {
		const pokemonDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
		return pokemonDetails.data;
		// console.log(pokemonDetails.data);
	} catch (error) {
		console.error("Error fetching pokemon data: ", error);
		return [];
	}
};
