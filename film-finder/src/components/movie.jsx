import React, { useState, useEffect } from "react";
import "/src/styles/movie.scss";
import axios from "axios";
import { API_KEY } from "../config.js";

const Movie = ({ movie }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            const response = await axios.get(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
            );
            setGenres(response.data.genres);
        };
        fetchGenres();
    }, []);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const getGenreName = (genreIds) => {
        const genreNames = genreIds.map((genreId) => {
            const foundGenre = genres.find((genre) => genre.id === genreId);
            return foundGenre ? foundGenre.name : "";
        });
        return genreNames.join(", ");
    };

    const truncateOverview = (overview) => {
        if (overview && overview.length > 350) {
            return `${overview.slice(0, 350)}...`;
        }
        return overview;
    };

    return (
        <div
            className={"box"}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={isHovered ? "hidden" : ""}
            />
            <div className={`title-div ${isHovered ? "hidden" : ""}`}>
                <h6>{movie.title}</h6>
            </div>
            {isHovered && (
                <div className={"info"}>
                    <p>{truncateOverview(movie.overview)}</p>
                    <div className={"small-info"}>
                        <span>Genre: {getGenreName(movie.genre_ids)}</span>
                        <span> Release Date: {movie.release_date}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export { Movie };
