import React from 'react';
import { useState } from 'react';
import "../css/Paginado.css";



export default function Paginado ( {gamesPerPage,Allgames,paginado} ) {
  const pageNumbers = []//array que guarda los numeros de paginas
  
  
  for (let i = 0; i <= Math.ceil(Allgames/gamesPerPage)-1; i++) {  //  Redondeo hacia arriba de la division (Math.ceil)de la cantidad de juegos por la cantidad de juegos por pagina
    pageNumbers.push(i+1);  //  Agrego los numeros de paginas al array
    }
     
    return(
    <nav className="numbers">
                
            <ul className="botonesnumero">{
                pageNumbers.map(number => (
                    <li >
                        <button onClick={() => {paginado(number)}}>{number}</button>
                        {/* <button onClick={() => {paginado(number)}}>{number}</button> */}
                          
                    </li>
                ))} 
            </ul>
            </nav>
    )
  }

        