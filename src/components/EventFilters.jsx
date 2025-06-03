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
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
      <input
        type="text"
        placeholder="Search by title or description"
        className="bg-white w-full focus:outline-frenchViolet md:w-1/3 px-4 py-2 rounded border"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        className="bg-white focus:outline-frenchViolet w-full md:w-1/4 px-4 py-2 rounded border"
      >
        <option value="">All Locations</option>
        {uniqueLocations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <input
        type="date"
        className="bg-white focus:outline-frenchViolet w-full md:w-1/5 px-4 py-2 rounded border"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="bg-white focus:outline-frenchViolet w-full md:w-1/6 px-4 py-2 rounded border"
      >
        <option value="asc">Date ascending</option>
        <option value="desc">Date descending</option>
      </select>

      <button
        onClick={clearFilters}
        className="text-sm text-frenchViolet underline hover:text-darkPurple"
      >
        Clear Filters
      </button>
    </div>
  );
}
