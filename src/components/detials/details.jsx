import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { GetDetails } from "../../api/api";

import "./details.scss";

const Details = props => {
	const { pokemon, setPokemon } = props;
	const [pokemonDetails, setPokemonDetails] = useState([]);

	const handleSelection = () => {
		setPokemon("");
	};

	useEffect(() => {
		if (pokemon !== "") {
			const getPokemonDetails = async () => {
				try {
					const details = await GetDetails(pokemon);
					setPokemonDetails([details]);
				} catch (error) {
					console.error(error);
				}
			};
			getPokemonDetails(pokemon);
		}
	}, [pokemon]);

	return (
		<div className="details__container">
			<button onClick={handleSelection}>Back th the list</button>
			{pokemonDetails.map(poke => (
				<div className="details__display" key={poke.id}>
					<h2>{poke.name}</h2>
					<img src={poke.sprites.front_default} alt={poke.name} />
					<p>{poke.weight}</p>
				</div>
			))}
		</div>
	);
};

Details.propTypes = {
	pokemon: PropTypes.number,
	setPokemon: PropTypes.func,
};

export default Details;
