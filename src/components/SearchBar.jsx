function SearchBar({ searchTerm, setSearchTerm, placeholder }) {
  return (
    <div className="search-section">
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  )
}

export default SearchBar
