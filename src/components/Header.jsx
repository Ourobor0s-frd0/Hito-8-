const Header = () => {
  return (
    <header 
      className="text-black text-center py-5" 
      style={{
        backgroundImage: 'url("/img/header.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <h1>¡<b>Bienvenido a Pizzería Mamma Mía</b>!</h1>
      <p>Las mejores pizzas con ingredientes frescos y mucho amor.</p>
    </header>
  )
}

export default Header
