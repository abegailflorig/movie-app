import { Search, Loader, Film, Home } from "lucide-react";

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  onSearch,
  genres = ["All"],
  genreFilter,
  setGenreFilter,
  loading,
  onHome,
}) {
  return (
    <div className="flex items-center gap-4 flex-wrap justify-end w-full">
      {/* 🏠 Home Button (first after logo) */}
      <button
        onClick={onHome}
        className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-lg transition"
      >
        <Home size={18} /> Home
      </button>

      {/* 🎭 Genre Dropdown */}
      <div className="relative flex items-center">
        <Film
          size={18}
          className="absolute left-3 text-gray-400 pointer-events-none"
        />
        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="p-2 pl-9 pr-4 rounded-lg text-black bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* 🔍 Search input + button */}
      <div className="flex items-center gap-1">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          className="p-2 px-4 rounded-lg text-black bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-500 w-56 md:w-44"
        />

        <button
          onClick={onSearch}
          disabled={loading}
          className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg transition flex items-center gap-1"
        >
          {loading ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            <Search size={18} />
          )}
        </button>
      </div>
    </div>
  );
}
