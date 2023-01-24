import { useSearch } from '@/hooks/useSearch';
interface SearchProps {
  placeholder: string;
  onSearch: (value: string) => void;
}

export const Search: React.FC<SearchProps> = ({ placeholder, onSearch }) => {
  const { searchValue, handleSearchInput, handleSearchSubmit } = useSearch({
    placeholder,
    onSearch,
  });

  return (
    <form onSubmit={handleSearchSubmit} className="gap-2 flex">
      <input
        className="bg-gray-200 rounded-md border border-gray-400 p-2 "
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleSearchInput}
      />
      <button className="bg-blue-500 rounded-md text-white px-2">Search</button>
    </form>
  );
};
