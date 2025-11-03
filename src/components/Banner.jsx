import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Banner({ movies }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (movies.length <= 1 || paused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [movies.length, paused]);

  // fetch full movie details including imdbID when the banner changes
  useEffect(() => {
    const movie = movies[index];
    if (!movie?.Title) return;

    const API_KEY = "64c9c2a9"; 
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movie.Title)}`)
      .then((res) => res.json())
      .then((data) => setDetails(data))
      .catch(() => setDetails(null));
  }, [index, movies]);

  if (!movies.length) return null;
  const movie = movies[index];

  const posterUrl =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster.replace("SX300", "SX1080")
      : "https://via.placeholder.com/1280x720?text=No+Image";

  function openTrailer() {
    if (details?.imdbID) {
      window.open(`https://www.imdb.com/title/${details.imdbID}/?ref_=tt_ov_vi`, "_blank");
    } else {
      // fallback: IMDb search
      const query = encodeURIComponent(`${details?.Title || movie.Title} trailer`);
      window.open(`https://www.imdb.com/find/?q=${query}`, "_blank");
    }
  }

  const handleNext = () => setIndex((prev) => (prev + 1) % movies.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + movies.length) % movies.length);

  return (
    <div
      className="relative w-[90%] mx-auto mt-12 h-[420px] md:h-[520px] rounded-2xl overflow-hidden shadow-xl transition-all duration-500"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="block w-full h-full"
        style={{
          backgroundImage: `url(${posterUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(90%)",
          transition: "transform 0.6s ease-in-out",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>

        <div className="absolute bottom-10 left-10 text-white max-w-xl">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg tracking-wide">
            {movie.Title}
          </h2>
          <p className="text-gray-300 text-sm md:text-lg mb-4">
            {movie.Year} • {movie.Type?.toUpperCase() || "MOVIE"}
          </p>

          {/*IMDb-based trailer button */}
          <button
            onClick={openTrailer}
            className="bg-purple-700 hover:bg-purple-900 transition px-6 py-2 rounded-md font-semibold shadow-lg"
          >
            Watch Trailer
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
