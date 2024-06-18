import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { movieType } from '../../types';

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
            const newFilteredMovies = state.filteredMovies.filter((movie) => movie.id !== action.payload)
            return {
                ...state,
                filteredMovies: newFilteredMovies

            };

        },
    }
});

export const { setInitialData, removeMovie } = moviesSlice.actions;
export default moviesSlice.reducer;