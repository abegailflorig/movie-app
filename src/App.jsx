import { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";
import BannerSlideshow from "./components/Banner";

const API_URL = "https://www.omdbapi.com/?apikey=64c9c2a9";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [genreFilter, setGenreFilter] = useState("All");

  const fetchMovies = async (term = searchTerm) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}&s=${encodeURIComponent(term)}`);
      const data = await res.json();
      if (!data.Search) return setMovies([]);

      const details = await Promise.all(
        data.Search.slice(0, 20).map(async (m) => {
          const r = await fetch(`${API_URL}&i=${m.imdbID}`);
          const d = await r.json();
          if (!d.Poster || d.Poster === "N/A") d.Poster = m.Poster;
          return d;
        })
      );

      setMovies(details.filter((d) => d && d.imdbID));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const defaultSearches = ["Action", "Comedy", "Romance", "Horror"];
    const fetchAll = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          defaultSearches.map(async (term) => {
            const res = await fetch(`${API_URL}&s=${encodeURIComponent(term)}`);
            const data = await res.json();
            return data.Search || [];
          })
        );

        const combined = results.flat();
        const unique = Array.from(
          new Map(combined.map((m) => [m.imdbID, m])).values()
        );

        const details = await Promise.all(
          unique.slice(0, 40).map(async (m) => {
            const r = await fetch(`${API_URL}&i=${m.imdbID}`);
            const d = await r.json();
            if (!d.Poster || d.Poster === "N/A") d.Poster = m.Poster;
            return d;
          })
        );

        const valid = details.filter(
          (m) => m && m.imdbID && m.Genre && m.Genre !== "N/A"
        );
        setMovies(valid);
      } catch (err) {
        console.error("fetchAll error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const genres = useMemo(() => {
    const set = new Set();
    movies.forEach((m) => {
      if (m.Genre) m.Genre.split(",").forEach((g) => set.add(g.trim()));
    });
    return ["All", ...Array.from(set).sort()];
  }, [movies]);

  const filtered = movies.filter((m) => {
    if (genreFilter !== "All" && !m.Genre?.includes(genreFilter)) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 text-gray-800">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={() => fetchMovies(searchTerm)}
        genres={genres}
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
        loading={loading}
        onHome={() => {
          setSearchTerm("");
          window.location.reload();
        }}
      />

      {searchTerm === "" && (
        <section className="relative w-screen  -mx-[50vw] overflow-hidden">
          {movies.length > 0 ? (
            <BannerSlideshow movies={movies} />
          ) : (
            <div className="w-full h-44 md:h-64 bg-gradient-to-r from-purple-700 to-purple-500 flex items-center justify-center text-white">
              <h2 className="text-2xl font-bold">Movie Banner</h2>
            </div>
          )}
        </section>
      )}

      <main className="w-full max-w-6xl px-4">
        <section className="mt-6">
          <MovieList movies={filtered} loading={loading} allMovies={movies} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
