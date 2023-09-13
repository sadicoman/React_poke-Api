import PropTypes from "prop-types";
import { useState } from "react";

const Search = props => {
	const { setSearch } = props;
	const [searchValue, setSearchValue] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		setSearch(searchValue);
        
	};
	const handleInputChange = e => {
		setSearchValue(e.target.value);
	};

	return (
		<div className="search__container">
			<h3>Search field</h3>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Search pokemon..."
					onChange={handleInputChange}
					className="search__input"
				/>
				<input type="submit" value="Search" className="search__button" />
			</form>
		</div>
	);
};

Search.propTypes = {
	setSearch: PropTypes.func,
};

export default Search;
