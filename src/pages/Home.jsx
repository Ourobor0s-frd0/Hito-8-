import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState({});
  const { addItem } = useCart(); 

  useEffect(() => {
    fetch("http://localhost:5000/api/pizzas")
      .then((res) => res.json())
      .then((data) => setPizzas(data))
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = async (pizza) => {
    if (addingToCart[pizza.id]) return;

    try {
      setAddingToCart((prev) => ({ ...prev, [pizza.id]: true }));
      await addItem(pizza);
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
    } finally {
      setAddingToCart((prev) => ({ ...prev, [pizza.id]: false }));
    }
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (loading) {
    return <div>Cargando pizzas...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>🍕 Nuestras Pizzas</h2>
      <div className="row">
        {pizzas.map((pizza) => (
          <div className="col-md-4 mb-3" key={pizza.id}>
            <div className="card">
              <img src={pizza.img} className="card-img-top" alt={pizza.name} />
              <div className="card-body">
                <h5 className="card-title"><b>{capitalize(pizza.name)}</b></h5>
                <p className="card-text">Precio: ${pizza.price}</p>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(pizza)}
                    disabled={addingToCart[pizza.id]}
                  >
                    {addingToCart[pizza.id]
                      ? "Añadiendo..."
                      : "Añadir al carrito"}
                  </button>
                  <Link 
                    to={`/pizza/${pizza.id}`} 
                    className="btn btn-outline-primary"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
