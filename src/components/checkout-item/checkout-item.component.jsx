import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {
    CheckoutItemContainer, 
    ImageContainer, 
    BaseSpan, 
    Arrow, 
    Value, 
    RemoveButton, 
    Quantity
} from './checkout-item.styles'


const CheckoutItem = ({checkoutItem}) => {
    const {name, quantity, imageUrl, price} = checkoutItem;

    const { addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(checkoutItem);
    const addItemHandler = () => addItemToCart(checkoutItem);
    const removeItemHandler = () => removeItemFromCart(checkoutItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick = {clearItemHandler} >&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;