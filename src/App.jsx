
import Header from './components/Header';
import Guitar from './components/Guitar';
import { useCart } from './hooks/useCart';

function App() {

    const { data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, MAX_ITEMS, MIN_ITEMS, isCartEmpty, cartTotal, totalItems } = useCart();

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
              isCartEmpty={isCartEmpty}
              cartTotal={cartTotal}
              totalItems={totalItems}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Guitar Collection</h2>

                <div className="row mt-5">
                    {data.map((guitar) => {
                        return (
                            <Guitar
                              key={guitar.id}
                              guitar={guitar}
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