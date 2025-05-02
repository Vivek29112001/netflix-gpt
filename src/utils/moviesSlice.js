import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        trailerVideo:null,
        popularMovies:null,
        trendingVideo:null,
        upCommingMovies:null,
        horrorMovies:null,
    },
    reducers:{
        addNowPlayingMovies:(state,actions)=>{
            state.nowPlayingMovies = actions.payload;
        },
        addTrailerVideo:(state,actions)=>{
            state.trailerVideo = actions.payload;
        },
        addPopularMovies:(state,actions)=>{
            state.popularMovies = actions.payload;
        },
        addTrendingVideo:(state,actions)=>{
            state.trendingVideo = actions.payload;
        },
        addUpCommingMovies:(state,actions)=>{
            state.upCommingMovies = actions.payload;
        },
        addHorrorMovies:(state,actions)=>{
            state.horrorMovies = actions.payload;
        },
    },
});

export const {addNowPlayingMovies, addTrailerVideo, addPopularMovies, addTrendingVideo, addHorrorMovies, addUpCommingMovies} = moviesSlice.actions;

export default moviesSlice.reducer;