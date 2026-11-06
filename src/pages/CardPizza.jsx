export default function CardPizza({ name, price, img, ingredients }) {
  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <img src={img} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <ul>
          {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
        </ul>
        <p><strong>${price}</strong></p>
        <button className="btn btn-primary">Añadir al carrito</button>
      </div>
    </div>
  );
}

