const initialState = {
    gamesST: [],
};

 function rootReducer(state = initialState, action) {    // root reducer
    switch (action.type) {  // switch statement to determine what action to take
        case 'GET_ALL_GAMES':   // if action type is GET_ALL_GAMES
            return {...state, gamesST : action.payload}   
             // return state with games array set to action payload
             case 'FILTER_GENRE':  
              const getAllGames = state.gamesST;
                const filteredGames = action.payload==="allGenre"? getAllGames : getAllGames.filter(game => game.genre === action.payload);
                return {...state, gamesST : filteredGames}; 
            


             default:
                 return state;
    }
    }


export default rootReducer;     // export root reducer