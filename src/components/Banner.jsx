import { useState, useEffect } from "react";

export default function BannerSlideshow({ movies }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (movies.length <= 1 || paused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [movies.length, paused]);

  const movie = movies[index];

  return (
    <div
      className="relative w-full h-[450px] md:h-[550px] bg-cover bg-center shadow-lg overflow-hidden"
      style={{
        backgroundImage:
          movie.Poster && movie.Poster !== "N/A"
            ? `url(${movie.Poster})`
            : "linear-gradient(90deg, #6b21a8, #9f7aea)",
        backgroundPosition: "center center", // ✅ focus image in the middle
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        filter: "brightness(1.05) contrast(1.1) saturate(1.25)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* subtle bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

      {/* movie text */}
      <div className="absolute bottom-10 left-10 text-white">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-1 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
          {movie.Title}
        </h2>
        <p className="text-sm md:text-base opacity-90">
          {movie.Year} • {movie.Type?.toUpperCase() || "MOVIE"}
        </p>
      </div>

      {/* navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {movies.slice(0, 5).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-white" : "bg-gray-400/80"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
