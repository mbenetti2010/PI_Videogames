import React from "react";


export default function Card({name,genre,image}) {
  return (
    <div >
        <h3>  {name}</h3>
        <img src={image}   width="300px" height="250px"   alt="Not found"/>
        <h5>{genre}</h5>
      
    </div>
  );
}