import { createContext, useContext, useState } from 'react';

const PizzasContext = createContext(null);

export function PizzasProvider({ children }) {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  const value = {
    pizzas,
    setPizzas,
    loading,
    setLoading
  };
  
  return (
    <PizzasContext.Provider value={value}>
      {children}
    </PizzasContext.Provider>
  );
}

export function usePizzas() {
  const context = useContext(PizzasContext);
  if (!context) {
    throw new Error('usePizzas debe usarse dentro de PizzasProvider');
  }
  return context;
}