import React, { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "./movie.jsx";
import { API_KEY } from "../config.js";
import "/src/styles/movies.scss";


const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios
            .get(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
            )
            .then((res) => {
                const genresObject = {};
                res.data.genres.forEach((genre) => {
                    genresObject[genre.id] = genre.name;
                });
                setGenres(genresObject);
            })
            .catch((err) => console.log(err));

        axios
            .get(
                `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`
            )
            .then((res) => setMovies(res.data.results.slice(0,12)))
            .catch((err) => console.log(err));
    }, [currentPage]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className={"container-box"}>
                <div className="search-container">
                    <input className={'search'}
                        type="text"
                        placeholder="Search movies"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className={"big-box"}>
                    {filteredMovies.map((movie) => (
                        <Movie key={movie.id} movie={movie} genres={genres} />
                    ))}
                </div>
                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Prev
                    </button>
                    <button onClick={handleNextPage}>Next</button>
                </div>
                <div className={'logo'}>Find Movie</div>
            </div>
        </>
    );
};

export { Movies };
