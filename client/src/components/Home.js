import React, { Fragment } from "react";  
import {useEffect,useState } from 'react';         // useState, useEffect
import { useDispatch, useSelector } from 'react-redux';     // useSelector  useDispatch     
import { getAllGames,FilterGamesByGenre,FilterPlatform} from "../actions"
import { Link } from "react-router-dom";
import  Card from "./Card";
import Paginado from './Paginado';
import "../css/Home.css"



export default function Home() {

    const dispatch = useDispatch()
    const Allgames = useSelector ((state) => state.gamesFILTRED) 
    const [currentPage, setCurrentPage] = useState(1);///1//2//3///4
   const [gamesPerPage, setGamesPerPage] = useState(15);                            // /1/ 2/   3/ /4/  5  /6 / 7     
    const [indexOfLastGame, setIndexOfLastGame] = useState(gamesPerPage*currentPage);//15//30//45//60//75//90/100
    const [indexOfFirstGame, setIndexOfFirstGame] = useState((indexOfLastGame-gamesPerPage));
   
    
    //const currentGames = Allgames.slice(indexOfFirstGame, indexOfLastGame);
    const currentGames = Allgames.slice(indexOfFirstGame, indexOfLastGame);
    
    const paginado = (number) => {
        if (number === 1) {
            setCurrentPage(1)
            setIndexOfLastGame( (gamesPerPage * number));
        setIndexOfFirstGame(number);
            console.log(currentPage)
            console.log(indexOfFirstGame)
            console.log(indexOfLastGame)
            ;
        }
        else if (number === 2) {
            setCurrentPage(2);
            console.log(currentPage)
            console.log(indexOfFirstGame)
            console.log(indexOfLastGame)
        }
        else if (number === 3) {
            setCurrentPage(3);
            console.log(indexOfFirstGame)
            console.log(indexOfLastGame)
            console.log(currentPage)
        }

        else if (number === 4) {
            setCurrentPage(4);
            console.log(indexOfFirstGame)
            console.log(indexOfLastGame)
            console.log(currentPage)
        }
            
        else if (number === 5) {
            setCurrentPage(5);
            console.log(currentPage)
            console.log(indexOfFirstGame)
            console.log(indexOfLastGame)
        }
        else if (number === 6) {
            setCurrentPage(6);
            console.log(currentPage)
            console.log(indexOfFirstGame)
            console.log(indexOfLastGame)
        }
        else if (number === 7) {
            setCurrentPage(7);
            console.log(currentPage)
            console.log(indexOfFirstGame)
            console.log(indexOfLastGame)

        }
        
        setIndexOfLastGame( (gamesPerPage * number));
        setIndexOfFirstGame(indexOfLastGame - gamesPerPage);
    }
       

        console.log(currentGames, "currentGames")
        
        console.log(currentPage, "currentPage")
        console.log(indexOfLastGame, "indexOfLastGame")
        console.log(indexOfFirstGame, "indexOfFirstGame")
        console.log(gamesPerPage, "gamesPerPage")
        console.log(Allgames, "Allgames")
        console.log(paginado, "paginado")



        
    
    useEffect(() => {
        dispatch(getAllGames())
    },[dispatch]);  
    
    
    function hadleOnClick(e){       
       e.preventDefault();
dispatch(getAllGames(),FilterGamesByGenre(e.target.value),FilterPlatform(e.target.value));        
    }      
   function handleFilterGenre(e){
        e.preventDefault()
        dispatch(FilterGamesByGenre(e.target.value))
    }
    function handleFilterPlats(e){
        e.preventDefault()
        dispatch(FilterPlatform(e.target.value))
    }
    return (
        <div>
            <h1 className="avenir">HENRY VIDEOGAMES APP</h1> 
            <h2 className="avenir">TODOS LOS JUEGOS </h2>
            <Link className="avenir" to="/GameCreate">CREA TU PROPIO JUEGO</Link>
            <button onClick={e => {hadleOnClick(e)}}>Cargar Todos los juegos</button>         
                          
            <div>
                <select>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                </select>

                <select>
                    <option value="alf">Alfabetico</option>
                    <option value="rat">Rating</option>
                </select>
                
                <select onChange={e =>handleFilterGenre(e)}>
                          <option value="allGenre">Todos</option>
                          <option value="Action">Action</option>
                          <option value="RPG">RPG</option>
                          <option value="Indie">Indie</option>
                          <option value="Adventure">Adventure</option>
                          <option value="Shooter">Shooter</option>
                          <option value="Casual">Casual</option>
                          <option value="RPG">RPG</option>
                          <option value="Strategy">Strategy</option>
                          <option value="Simulation">Simulation</option>
                          <option value="Puzzle">Puzzle</option>
                          <option value="Platformer">Platformer</option>
                          <option value="Racing">Racing</option>
                          <option value="Massively Multiplayer">Massively Multiplayer</option>
                          <option value="Sports">Sports</option>
                          <option value="Fighting">Fighting</option>
                          <option value="Family">Family</option>
                          <option value="Board Games">Board Games</option>
                          <option value="Educational">Educational</option>
                          <option value="Card">Card</option>
                        </select>    
<p>Selecciona una plataforma</p>
                        <select onChange={e =>handleFilterPlats(e)}>
                             <option value="allPlats">Todas las Plataformas</option>
                                <option value="PlayStation">PlayStation</option>
                                <option value="Xbox">Xbox</option>
                                <option value="Nintendo">Nintendo</option>
                                <option value="PC">PC</option>
                                <option value="Mobile">Mobile</option>
                                <option value="Nintendo Switch">Nintendo Switch</option>
                                <option value="PlayStation 4">PlayStation 4</option>
                                <option value="Xbox One">Xbox One</option>
                                <option value="Nintendo Switch">Nintendo Switch</option>
                                
                       </select>              

                <Paginado  gamesPerPage={gamesPerPage} Allgames={Allgames.length} paginado={paginado}/>
              
                {
                currentGames?.map((g) => {
                    return(

                        <div className="grid">
                            <Link to={"/"+g.id}>
                              <Card name={g.name} image={g.image} genre={g.genres} key={g.id}/>
                              </Link>
                    </div>
                );
            })
            }
                        
            </div>

         </div>    
    )
        
}
