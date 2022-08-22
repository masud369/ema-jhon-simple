import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData/products.json';
import Products from '../Prduct/Products';
import Cart from '../Cart/Cart';

const Shop = () => {
    console.log(fakeData); 
    const fake10 = fakeData.slice(0,15);
    const [products, setProducts] = useState(fake10);
    const [cart, setCart] = useState([]);

    const productHandeler = (product)=>{
      console.log("product added "+ product);
      const newCart = [ ...cart, product];
      setCart(newCart);
    }

    return (
        <div className='shop-container'>
            <div className='products-container'>
    
              {
                products.map(product=> <Products key={product.id}
                   product={product}
                   handelProduct={productHandeler} 
                   ></Products> )
              }
            
            </div>
            <div className="cart-container"> 
                <Cart cart={cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;