const SearchForm = ({ handleSubmit, handleChange, searchQuery }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="search"
        onChange={handleChange}
        value={searchQuery}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
