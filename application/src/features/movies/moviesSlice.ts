import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, movieType } from '../../types';

interface MoviesState {
    allMovies: movieType[],
    filteredMovies: movieType[],
}

const initialState: MoviesState = {
    allMovies: [],
    filteredMovies: [],
}

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setInitialData: (state, action: PayloadAction<movieType[]>) => {
            return {
                ...state,
                allMovies: action.payload,
                filteredMovies: action.payload,
            };
        },
        removeMovie: (state, action: PayloadAction<string>) => {
            return {
                allMovies: state.allMovies.filter((movie) => movie.id !== action.payload),
                filteredMovies: state.filteredMovies.filter((movie) => movie.id !== action.payload)

            };

        },
        filterMovies: (state, action: PayloadAction<Category[]>) => {
            if (action.payload.length) {
                const newFilteredMovies = state.allMovies.filter((movie) => action.payload.includes(movie.category))
                return {
                    ...state,
                    filteredMovies: newFilteredMovies
                };
            } else {
                return {
                    ...state,
                    filteredMovies: state.allMovies
                };
            }

        },
    }
});

export const { setInitialData, removeMovie, filterMovies } = moviesSlice.actions;
export default moviesSlice.reducer;