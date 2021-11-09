import React from 'react';
import { Link } from 'react-router-dom';




export default function Paginado({gamesPerPage,Allgames,paginado,setCurrentPage,currentPage} ) {
  const pageNumbers = [];//array que guarda los numeros de paginas

  
  for (let i = 0; i <= Math.ceil(Allgames/gamesPerPage); i++) {  //  Redondeo hacia arriba de la division (Math.ceil)de la cantidad de juegos por la cantidad de juegos por pagina
    pageNumbers.push(i+1);  //  Agrego los numeros de paginas al array
    }
     
    return(
    <div className="botonesnumero">
                
            
            { pageNumbers && 
            pageNumbers.map(number => (
            <li className="number">
    <button  onClick={()=> paginado(number)}>{number}</button> 
    </li>

                  ))}

              
        
                
                </div>
    )
  }

        