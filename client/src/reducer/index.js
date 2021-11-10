const initialState = {
    gamesFILTRED: [],
    gamesALL: [],
};

 function rootReducer(state = initialState, action) {    // root reducer
    switch (action.type) {  // switch statement to determine what action to take
        case 'GET_ALL_GAMES':   // if action type is GET_ALL_GAMES
            return {...state, 
                gamesALL : action.payload, 
                gamesFILTRED : action.payload};  // return state with gamesALL and gamesFILTRED set to action.payload
            
              
             // return state with games array set to action payload
             case 'FILTER_GENRE':  
              const getAllGames = state.gamesALL;
                const gamesFiltred = state.gamesFILTRED;
                /* const GenreFiltred = action.payload==="allGenre"? getAllGames : getAllGames.map( genre =>  genre.genres);//da array con generos */
                const GenreFiltred = action.payload==="allGenre"? getAllGames : gamesFiltred.filter( genre =>   genre.genres===action.payload);//da array con generos
                console.log(action.payload);
          
                console.log(GenreFiltred);
                //genres: game.genres.map(genre => genre.name)
                return {...state, gamesFILTRED : GenreFiltred}; 
            


             default:
                 return state;
    }
    }


export default rootReducer;     // export root reducer