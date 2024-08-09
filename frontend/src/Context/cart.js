import {useState, createContext, useContext, useEffect} from 'react';

const CartContext = createContext();

const CartProvider = (props) => {
    const [cart, setCart ] = useState([]);

    useEffect(() => {
        let existingItem = localStorage.getItem('cart');
        if(existingItem){
            setCart(JSON.parse(existingItem));
        }
    }, []);
             
    return(
        <CartContext.Provider value={[cart, setCart]}>
            {props.children}
        </CartContext.Provider>
    );
};

//custom hook
const useCart = () => useContext(CartContext);
export {useCart, CartProvider};