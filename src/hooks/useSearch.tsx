import React, { useState } from 'react';

export const useSearch = ({ placeholder, onSearch }: SearchProps) => {
	const [searchValue, setSearchValue] = useState('');

	const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSearch(searchValue);
	};

	return {
		searchValue,
		handleSearchInput,
		handleSearchSubmit,
	};
};
