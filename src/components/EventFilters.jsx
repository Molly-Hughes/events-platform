export function EventFilters({
  events,
  searchTerm,
  setSearchTerm,
  selectedLocation,
  setSelectedLocation,
  selectedDate,
  setSelectedDate,
  sortOrder,
  setSortOrder,
  clearFilters,
}) {
  const uniqueLocations = [...new Set(events.map((e) => e.location))].sort();

  return (
    <div
      className="mb-8 flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between"
      role="search"
      aria-label="Filter events"
    >
      <div className="w-full md:w-1/3">
        <label htmlFor="search" className="sr-only">
          Search events
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search by title or description"
          className="bg-white w-full focus:outline-frenchViolet px-4 py-2 rounded border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

       
      <div className="w-full md:w-1/4">
        <label htmlFor="location-filter" className="sr-only">
          Filter by location
        </label>
        <select
          id="location-filter"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="bg-white focus:outline-frenchViolet w-full px-4 py-2 rounded border"
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-1/5">
        <label htmlFor="date-filter" className="sr-only">
          Filter by date
        </label>
        <input
          id="date-filter"
          type="date"
          className="bg-white focus:outline-frenchViolet w-full px-4 py-2 rounded border"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="w-full md:w-1/6">
        <label htmlFor="sort-order" className="sr-only">
          Sort order
        </label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-white focus:outline-frenchViolet w-full px-4 py-2 rounded border"
        >
          <option value="asc">Date ascending</option>
          <option value="desc">Date descending</option>
        </select>
      </div>

      <button
        onClick={clearFilters}
        type="button"
        className="text-sm text-frenchViolet underline hover:text-darkPurple"
        aria-label="Clear all filters"
      >
        Clear Filters
      </button>
    </div>
  );
}
