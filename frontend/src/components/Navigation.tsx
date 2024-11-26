function Navigation(): React.JSX.Element {
  return (
    <>
      <nav className="nav" aria-label="Main Navigation">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Our Team</a>
          </li>
          <li>
            <a href="#">Projects</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
        </ul>
        <form className="search" role="search" aria-label="Site Search">
          <label htmlFor="search-input" id="search-label">
            Search
          </label>
          <input
            type="search"
            id="search-input"
            name="q"
            placeholder="Search query"
          />
          <input type="submit" value="Go!" />
        </form>
      </nav>
    </>
  );
}

export default Navigation;
