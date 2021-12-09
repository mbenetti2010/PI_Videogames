import axios from 'axios';

export  function getAllGames() { 
  return  function(dispatch) {     // return a function that takes dispatch as an argument
      axios("http://localhost:3001/videogames") // get all games
        .then ( (json)=>{

          return dispatch({   // dispatch action
            type: 'GET_ALL_GAMES',    // type of action
            payload: json.data    // payload
          })
        })
        .catch()
    }
}

export function FilterPlatform(payload) {
  console.log(payload);
  return { 
      type: 'FILTER_PLAT',
      payload}}


export function FilterGamesByGenre(payload) {
  console.log(payload);
  return { 
      type: 'FILTER_GENRE',
      payload
  }




}
    
      
   


