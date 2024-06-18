import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from '../features/movies/moviesSlice'

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


