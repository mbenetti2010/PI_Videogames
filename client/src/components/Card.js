import React from "react";
import "../css/Card.css"

export default function Card({name,genre,image}) {
  return (
    <div className="card2" >
        <h3 className="name">  {name}</h3>
        <img src={image}   width="300px" height="180px"   alt="Not found"/>
        <h5>{genre}</h5>
      
    </div>
  );
}