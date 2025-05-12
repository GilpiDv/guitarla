import { useState } from 'react';
import Header from './components/Header';
import Guitar from './components/Guitar';
import { db } from './data/db';

function App() {
    const [data, setData] = useState(db);
    const [cart, setCart] = useState([]);

    const MAX_ITEMS = 10;
    const MIN_ITEMS = 1;

    const addToCart = (item) => {
      const itemExists = cart.findIndex((guitar) => {
        return guitar.id === item.id;
      });

      if (itemExists >= 0) {
        if(cart[itemExists].quantity >= MAX_ITEMS) return;
        const updatedCart = [...cart]; // Create copy of the state current values, this way you wont mutate directly the state.
        updatedCart[itemExists].quantity++; // Add 1 quantity to the cart item selected
        setCart(updatedCart); // Update the state, this will not add a new element but update it.
      } else {
        item.quantity = 1;
        setCart([...cart, item]);
      }
    };

    const removeFromCart = (id) => {
      setCart((prevCart) => {
        return prevCart.filter(item => item.id !== id)
      });
    }

    const increaseQuantity = (id) => {
      const updatedCart = cart.map(item => {
        if(item.id === id && item.quantity < MAX_ITEMS) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }

        return item;
      });

      setCart(updatedCart);
    }

    const decreaseQuantity = (id) => {
      const updatedCart = cart.map(item => {
        if(item.id === id && item.quantity > MIN_ITEMS) {
          return {
            ...item,
            quantity: item.quantity - 1
          };
        }

        return item;
      });

      setCart(updatedCart);
    }

    const clearCart = () => {
      setCart([]);
    }

    return (
        <>
            <Header 
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              maxItems={MAX_ITEMS}
              minItems={MIN_ITEMS}
              clearCart={clearCart}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Guitar Collection</h2>

                <div className="row mt-5">
                    {data.map((guitar) => {
                        return (
                            <Guitar
                              key={guitar.id}
                              guitar={guitar}
                              setCart={setCart}
                              addToCart={addToCart}
                            />
                        );
                    })}
                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">
                        GuitarLA - Todos los derechos Reservados
                    </p>
                </div>
            </footer>
        </>
    );
}

export default App;