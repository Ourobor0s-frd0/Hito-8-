// src/pages/Pizza.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Pizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(`http://localhost:5000/api/pizzas/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setPizza(data);
      })
      .catch((err) => {
        if (!cancelled) console.error("Error:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (!pizza) return <div>Pizza no encontrada</div>;

 const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={pizza.img}
              alt={pizza.name}
              className="img-fluid rounded-start"
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h2 className="card-title mb-3"><b>{capitalize(pizza.name)}</b></h2>
              <p className="card-text mb-3">{pizza.description}</p>
              <h5 className="mb-3">Ingredientes:</h5>
              <ul className="list-unstyled">
                {pizza.ingredients?.map((ingredient, i) => (
                  <li key={i}>✓ {ingredient}</li>
                ))}
              </ul>
              <div className="mt-4">
                <h4 className="mb-3">Precio: ${pizza.price}</h4>
                <button
                  className="btn btn-primary"
                  onClick={() => addItem(pizza)}
                >
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
