import React from "react";
import { Link } from "react-router-dom";

export default function CardPizza({ pizza }) {
  return (
    <article className="card-pizza">
      <h3>{pizza.name}</h3>
      <p>{pizza.description}</p>
      <Link to={`/pizza/${pizza.id}`}>Ver detalle</Link>
    </article>
  );
}
