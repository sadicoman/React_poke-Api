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
					<div className="details__top">
						<h2>{poke.name}</h2>
						{poke.stats
							.filter(stat => stat.stat.name === "hp")
							.map((stat, index) => (
								<p key={index}>{stat.base_stat} HP</p>
							))}
					</div>
					<img src={poke.sprites.front_default} alt={poke.name} />
					<div className="details__banner">
						<p>Weight : {poke.weight}kg</p>
						<p>|</p>
						<p>Height: {poke.height}cm</p>
					</div>
					<ul className="details__types">
						{poke.types.map(type => (
							<li key={type.type.name} className={`type-${type.type.name}`}>
								{type.type.name}
							</li>
						))}
					</ul>
					<ul className="details__attaque">
						{poke.moves.slice(0, 4).map(move => (
							<li key={move.move.name}>{`${move.move.name.toUpperCase()}`}</li>
						))}
					</ul>
					<ul className="details__stats">
						{poke.stats
							.filter(stat => stat.stat.name !== "hp")
							.map(stat => (
								<li key={stat.stat.name}>{`${stat.stat.name.toUpperCase()}: ${
									stat.base_stat
								}`}</li>
							))}
					</ul>
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
