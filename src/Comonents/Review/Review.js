import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/dataBaseManager';
import fakeData from '../../fakeData/products.json';
import Reveiwitem from '../Reviewitem/Reveiwitem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'


const Review = () => {

    const [ cart,setCart ]=useState([]);
    useEffect(()=>{
        
       const savCart = getDatabaseCart();
       const prosuctKeys = Object.keys(savCart)
       const cartProducts = prosuctKeys.map(id=>{
         const product = fakeData.find(pd=>pd.id===id);
         product.quantity = savCart[id];
         return product;
         
       });
       setCart(cartProducts);
       console.log(cartProducts);
    },[])

    const removeItem = (idName)=>{
      const newCart  = cart.filter(pd=>pd.id !== idName);
      setCart(newCart);
      removeFromDatabaseCart(idName);
    }
    const [orderplaced, setOrderplaced] = useState(false);
    const handelOrderPlace = ()=>{
           setCart([]); 
           setOrderplaced(true);
           processOrder();
          
        }
        let thanksImage;
        if(orderplaced){
          thanksImage = <img src={happyImage} alt="" />
        }
    return (
        <div className="shop-container">
          <div className='products-container'>
           <h2> The total item {cart.length}</h2>
          {
            cart.map(pd=> <Reveiwitem removeItem={removeItem} product={pd} key={pd.id}></Reveiwitem> )
          }
           {thanksImage}
        </div>
        <div className="cart-container"> 
                <Cart cart={cart}>
                  <button onClick={handelOrderPlace} className='add-cart'>Place order</button>
                </Cart>
                
            </div>
        </div>
    );
};

export default Review;