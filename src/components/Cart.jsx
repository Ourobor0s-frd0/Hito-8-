import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart, total } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>🛒 Tu carrito está vacío</h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>🛒 Carrito de Compras</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price.toLocaleString()}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toLocaleString()}</td>
              <td>
                <button onClick={() => addToCart(item)}>➕</button>
                <button onClick={() => decreaseQuantity(item.id)}>➖</button>
                <button onClick={() => removeFromCart(item.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <h3>Total: ${total.toLocaleString()}</h3>
        <button onClick={clearCart}>Vaciar Carrito</button>
        <button className="checkout-btn">Finalizar Compra</button>
      </div>
    </div>
  );
};

export default Cart;
