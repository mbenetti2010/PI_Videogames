import React, { Fragment } from "react";  
import {useEffect,useState } from 'react';         // useState, useEffect
import { useDispatch, useSelector } from 'react-redux';     // useSelector  useDispatch     
import { getAllGames } from "../actions"
import { Link } from "react-router-dom";
import  Card from "./Card";
import Paginado from './Paginado';



export default function Home() {
    const dispatch = useDispatch()
    const Allgames = useSelector ((state) => state.gamesST)  
    const [currentPage, setCurrentPage] = useState(1);
   const [gamesPerPage, setGamesPerPage] = useState(15);
    const [indexOfLastGame, setIndexOfLastGame] = useState(gamesPerPage*currentPage);
    const [indexOfFirstGame, setIndexOfFirstGame] = useState(indexOfLastGame-gamesPerPage);
  
    const currentGames = Allgames.slice(indexOfFirstGame, indexOfLastGame);
    
    const paginado = (number) => {
        setCurrentPage(number);
        }

    
    useEffect(() => {
        dispatch(getAllGames())
    },[]);      
    function hadleOnClick(e){       
e.preventDefault()
dispatch(getAllGames());        
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

                <Paginado  gamesPerPage={gamesPerPage} Allgames={Allgames.length} paginado={paginado}/>
              
                {
                currentGames?.map((g) => {
                    return(

                        <div >
                            <Link to={"/"+g.id}>
                              <Card name={g.name} image={g.image} genre={g.genres}/>
                              </Link>
                    </div>
                );
            })
            }
                        
            </div>

         </div>    
    )
        
}
