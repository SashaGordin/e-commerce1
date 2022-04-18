import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import './checkout-item.styles.scss'


const CheckoutItem = ({checkoutItem}) => {
    const {name, quantity, imageUrl, price} = checkoutItem;

    const { addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);
    const addCheckoutItemToCart = () => addItemToCart(checkoutItem);
    const removeCheckoutItemFromCart = () => removeItemFromCart(checkoutItem);

    const clearItemHandler = () => clearItemFromCart(checkoutItem);
    const addItemHandler = () => addCheckoutItemToCart(checkoutItem);
    const removeItemHandler = () => removeCheckoutItemFromCart(checkoutItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div classNamae = 'arrow' onClick={removeItemHandler}>&#10094;</div>
                <span className = 'value'>{quantity}</span>
                <div classNamae = 'arrow' onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div onClick = {clearItemHandler} className='remove-button'>
                &#10005;
            </div>
        </div>
    )
}

export default CheckoutItem;