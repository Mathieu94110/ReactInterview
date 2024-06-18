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
            };
        },
    }
});

export const { setInitialData } = moviesSlice.actions;
export default moviesSlice.reducer;