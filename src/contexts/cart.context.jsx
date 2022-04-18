import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {


    //find if cartItems contains product to Add
    const existingCartItem = cartItems.find((cartItems) => cartItems.id === productToAdd.id);
    //if found increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
        {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
    }
    //return new array with modified cartITems
    return [...cartItems, { ...productToAdd, quantity:1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {


    const existingCartItem = cartItems.find((cartItems) => cartItems.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
    //return new array with modified cartITems
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ?
    {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );}

    const clearCartItem = (cartItems, cartItemToRemove) => {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);


    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal);
    }, [cartItems]);


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    };

    const clearItemFromCart = (itemToRemove) => {
        setCartItems(clearCartItem(cartItems, itemToRemove));
    };

    const value = { 
        isCartOpen, 
        cartItems, 
        cartTotal, 
        cartCount, 
        setIsCartOpen, 
        clearItemFromCart, 
        addItemToCart, 
        removeItemFromCart
    };

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}