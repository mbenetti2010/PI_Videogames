import React, { Fragment } from "react";  
import {useEffect,useState } from 'react';         // useState, useEffect
import { useDispatch, useSelector } from 'react-redux';     // useSelector  useDispatch     
import { getAllGames,FilterGamesByGenre} from "../actions"
import { Link } from "react-router-dom";
import  Card from "./Card";
import Paginado from './Paginado';
import "../css/Home.css"



export default function Home() {

    const dispatch = useDispatch()
    const Allgames = useSelector ((state) => state.gamesALL)  
    const [currentPage, setCurrentPage] = useState(1
        );
   const [gamesPerPage, setGamesPerPage] = useState(15);
    const [indexOfLastGame, setIndexOfLastGame] = useState(gamesPerPage*currentPage);
    const [indexOfFirstGame, setIndexOfFirstGame] = useState(indexOfLastGame-gamesPerPage);
  
    const currentGames = Allgames.slice(indexOfFirstGame, indexOfLastGame);
    
    const paginado = (number) => {
        setCurrentPage(number);
        }

    
    useEffect(() => {
        dispatch(getAllGames())
    },[dispatch]);      
    function hadleOnClick(e){       
e.preventDefault()


dispatch(getAllGames());        
    }      
   function handleFilterGenre(e){
        e.preventDefault()
        dispatch(FilterGamesByGenre(e.target.value))
    }
    
    return (
        <div>
            <h1>HENRY VIDEOGAMES APP</h1> 
            <h2>TODOS LOS JUEGOS </h2>
            <Link to="/NewVideogame">CREA TU PROPIO JUEGO</Link>
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

                <Paginado  gamesPerPage={gamesPerPage} Allgames={Allgames.length} paginado={paginado}/>
              
                {
                currentGames?.map((g) => {
                    return(

                        <div >
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
