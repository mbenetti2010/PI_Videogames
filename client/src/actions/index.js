import axios from 'axios';

export  function getAllGames() { 
  return async function(dispatch) {     // return a function that takes dispatch as an argument
    var json = await axios("http://localhost:3001/videogames"); // get all games
        return dispatch({   // dispatch action
          type: 'GET_ALL_GAMES',    // type of action
          payload: json.data    // payload
        })
    }
}

export function FilterGamesByGenre(payload) {
  console.log(payload);
  return { 
      type: 'FILTER_GENRE',
      payload
  }
}
