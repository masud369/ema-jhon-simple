import React from 'react';
import './Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const Products = (props) => {
    console.log(props.product)
    const {name,img,seller,price,stock}=props.product;
    return (
        <div className='product-container'>
            <div className="product-img"> 
                <img src={img} alt="" />
            </div>
            <div className="product-description">
                <h4 className='product-name'>Product Name:{" "+name}</h4>
                <br />  
                <p><small>seller: {seller}</small></p>  
                <p>Price:{price}</p>
                <p><small>Only {stock} in left -Order soon</small></p>
                <button className='add-cart' onClick={()=>props.handelProduct(props.product)}><FontAwesomeIcon icon={faCartShopping} />add to cart</button>
             </div>
        </div>
    );
};

export default Products;