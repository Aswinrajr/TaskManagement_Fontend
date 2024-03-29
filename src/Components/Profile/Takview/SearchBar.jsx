const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
    </div>
  );
};

export default SearchBar;
