const initialState = {
    gamesFILTRED: [],
    gamesALL: [],
    gamesPLAT:[]
};

 function rootReducer(state = initialState, action) {    // root reducer
    switch (action.type) {  // switch statement to determine what action to take
        case 'GET_ALL_GAMES':   // if action type is GET_ALL_GAMES
            return {...state, 
                gamesALL : action.payload, 
                gamesFILTRED : action.payload,
                gamesPLAT:action.payload}
                // return state with gamesALL and gamesFILTRED set to action.payload
            
              
             // return state with games array set to action payload
             case 'FILTER_GENRE':  
              const getAllGames = state.gamesALL;
              const GenreFiltred = action.payload==="allGenre"? getAllGames : getAllGames.map(game => game.genres.includes(action.payload) ? game : null).filter(game => game !== null); // if action.payload is allGenre, return all games, else return games with action.payload genre included in genres array   return state with games array set to action payload       
              /* const GenreFiltred = action.payload==="allGenre"? getAllGames : getAllGames.map( genre =>  genre.genres);//da array con generos */
                console.log(action.payload);
                console.log(GenreFiltred);
                return {...state,gamesFILTRED : GenreFiltred}; 
                    
                    case 'FILTER_PLAT':  
                    const getAllPlats= state.gamesPLAT;
                    const PlatFiltred = action.payload==="allPlats"? getAllPlats : getAllPlats.map(plat => plat.platforms.includes(action.payload) ? plat : null).filter(plat => plat !== null); // if action.payload is allGenre, return all games, else return games with action.payload genre included in genres array   return state with games array set to action payload       
                    /* const GenreFiltred = action.payload==="allGenre"? getAllGames : getAllGames.map( genre =>  genre.genres);//da array con generos */
                      console.log(action.payload);
                      console.log(PlatFiltred);
                      return {...state, 
                          gamesPLAT : PlatFiltred}; 


             default:
                 return state;
    }
    }


export default rootReducer;     // export root reducer