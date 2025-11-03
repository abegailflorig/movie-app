import { useState } from "react";
import SearchBar from "./SearchBar";
import { Menu, X, Clapperboard } from "lucide-react";

export default function Header({
  searchTerm,
  setSearchTerm,
  onSearch,
  genres,
  genreFilter,
  setGenreFilter,
  loading,
  onHome,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-purple-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <Clapperboard size={22} className="text-purple-950" />
            </div>
            <h1 className="text-lg font-bold">Movie App</h1>
          </div>

          {/*menu toggle */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/*Search and filters*/}
        <div
          className={`transition-all duration-300 overflow-hidden w-full md:w-auto ${
            menuOpen
              ? "max-h-[500px] opacity-100 mt-3"
              : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={onSearch}
              genres={genres}
              genreFilter={genreFilter}
              setGenreFilter={setGenreFilter}
              loading={loading}
              onHome={onHome}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
