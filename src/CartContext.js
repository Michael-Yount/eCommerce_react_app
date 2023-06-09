import { createContext, useState } from 'react';
import { productsArray, getProductData } from './productsStore';

// This is the centext (cart, addToCart, delete)
export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteOneFromCart: () => {},
    getTotalCost: () => {}
});


export function CartProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);

    //[ { id: 1, quantity: 2 } ]

function getProductQuantity(id) {
    const quantity = cartProducts.find(product => product.id === id)?.quantity

    if (quantity === undefined) {
        return 0;
    }

    return quantity;
    
}

function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
        setCartProducts(
            [
                ...cartProducts,
                {
                    id:id,
                    quantity: 1
                }
            ]
        )
    }else {
        setCartProducts(
            cartProducts.map(
                product => 
                product.id === id
                ? {...product, quantity: product.quantity + 1}
                : product
            )
        )
    }
}
function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if(quantity === 1) {
        deleteOneFromCart(id);
    } else {
        setCartProducts(
            cartProducts.map(
                product => 
                product.id === id
                ? {...product, quantity: product.quantity - 1}
                : product
            )
        )
    }
}


function deleteOneFromCart(id) {

    setCartProducts(
            cartProducts =>
            cartProducts.filter(currentProduct => {
                return currentProduct.id !== id;
            })
        )
}

function getTotalCost() {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
        const productData = getProductData(cartItem.id);
        totalCost += (productData.price * cartItem.quantity);
    });
    return totalCost;
}

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteOneFromCart,
        getTotalCost

    
    }
//Provider -> gives your react app access to all the things in your context
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;