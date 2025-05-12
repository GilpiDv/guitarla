import { useEffect, useState, useMemo } from 'react';
import { db } from '../data/db';

export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 10;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

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

    // If using braces {} for the useMemo function, use return.
    const isCartEmpty = useMemo(() => {
        return cart.length === 0;
    }, [cart]);

    // Otherwise, omit braces and doesn't need the return.
    const cartTotal = useMemo(() => 
        cart.reduce((total, item) => total + (item.quantity * item.price), 0), 
    [cart])

    const totalItems = useMemo(() => 
        cart.reduce((total, item) => total + (item.quantity), 0), 
    [cart])

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        MAX_ITEMS,
        MIN_ITEMS,
        isCartEmpty,
        cartTotal,
        totalItems
    }
}