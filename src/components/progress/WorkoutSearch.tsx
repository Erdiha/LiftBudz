import { useState } from 'react';

interface WorkoutPlan {
  id: number;
  name: string;
  description: string;
}

interface SearchResult {
  id: number;
  name: string;
}

interface SearchProps {
  workoutPlans: WorkoutPlan[];
}

function Search({ workoutPlans }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();

    const filteredResults = workoutPlans
      .filter((plan) => plan.name.toLowerCase().includes(query))
      .map((plan) => ({ id: plan.id, name: plan.name }));

    setQuery(query);
    setResults(filteredResults);
  };

  const handleClick = (id: number) => {
    // handle click on a search result, e.g. navigate to a plan details page
    console.log(`Clicked workout plan with ID ${id}`);
  };

  return (
    <div>
      <input
        type='text'
        value={query}
        onChange={handleSearch}
        placeholder='Search for a workout plan'
        className='w-full px-4 py-2 mb-4 leading-tight bg-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
      />
      {results.map((result) => (
        <div
          key={result.id}
          onClick={() => handleClick(result.id)}
          className='px-4 py-2 mb-2 bg-white border rounded shadow cursor-pointer hover:bg-gray-100'>
          {result.name}
        </div>
      ))}
    </div>
  );
}

export default Search;
