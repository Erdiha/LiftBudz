import { Search } from '@/components/search/Search';
import { useState } from 'react';

interface SearchResultsProps {
	results: string[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
	return (
		<div>
			<h2 className="text-lg mb-2">Search Results</h2>
			<ul>
				{results.map((result) => (
					<li key={result}>{result}</li>
				))}
			</ul>
		</div>
	);
};

export function SearchRes() {
	const [searchResults, setSearchResults] = useState<string[]>([]);
	const handleSearch = (value: string) => {
		// Example search results
		setSearchResults(['Result 1', 'Result 2', 'Result 3']);
	};

	return (
		<div>
			<Search placeholder="Search..." onSearch={handleSearch} />
			{searchResults.length > 0 && <SearchResults results={searchResults} />}
		</div>
	);
}
