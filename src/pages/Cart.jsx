import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; 
import "../assets/css/Form.css";

export default function Cart() {
  const { token } = useAuth();
  const { cart = [], clearCart, removeFromCart, updateQuantity } = useCart();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!token) {
      setMessage("Debe iniciar sesión para realizar la compra.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error en el checkout");
      setMessage("Compra realizada con éxito. ¡Gracias!");
      clearCart && clearCart();
    } catch (err) {
      setMessage("Error al procesar la compra: " + err.message);
    } finally {
      setLoading(false);
    }
  }; 

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0).toFixed(2);
  };

  const handleQuantityChange = (item, change) => {
    const newQuantity = (item.quantity || 1) + change;
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '800px' }}>
        <h2 className="text-center mb-4">🛒 Mi Carrito </h2>(Productos seleccionados)

        {!cart || cart.length === 0 ? (
          <div className="text-center p-4">
            <p className="text-muted">El carrito está vacío</p>
          </div>
        ) : (
          <div className="list-group mb-4">
            {cart.map((p, i) => (
              <div key={i} className="list-group-item">
                <div className="d-flex align-items-center">
                  <img 
                    src={p.img} 
                    alt={p.name} 
                    className="rounded me-3"
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover'
                    }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-0">{p.title || p.name}</h6>
                    <small className="text-muted">Precio: <b>${p.price}</b></small>
                    <div className="mt-2 d-flex align-items-center">
                      <div className="btn-group me-3">
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleQuantityChange(p, -1)}
                        >
                          -
                        </button>
                        <span className="btn btn-sm btn-outline-secondary disabled">
                          {p.quantity || 1}
                        </span>
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleQuantityChange(p, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => removeFromCart(p.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <div className="ms-3">
                    <strong>${((p.quantity || 1) * p.price).toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            ))}
            <div className="list-group-item d-flex justify-content-between align-items-center bg-light">
              <strong>Total:</strong>
              <strong>${calculateTotal()}</strong>
            </div>
          </div>
        )}

        {cart?.length > 0 && (
          <div className="d-grid gap-2">
            <button 
              className={`btn ${loading ? 'btn-secondary' : 'btn-success'}`}
              onClick={handleCheckout} 
              disabled={loading}
            >
              {loading ? "Procesando..." : "Proceder al pago"}
            </button>
          </div>
        )}

        {message && (
          <div className={`alert ${message.includes('éxito') ? 'alert-success' : 'alert-danger'} mt-3`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
