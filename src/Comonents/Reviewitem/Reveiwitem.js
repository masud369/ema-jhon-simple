import React from 'react';

const Reveiwitem = (props) => {
    const {name,quantity,id,price} = props.product;
    const reviewItem = {
        borderBottom:"1px solid red",
        padding:'10px',
    }
    return (
        <div style={reviewItem}>
            <h4>Name:{' '+name}</h4> 
            <p>Quantity:{' '+ quantity}</p> 
            <p>Price:{' '+ price} </p>
            <button 
            onClick={()=>props.removeItem(id)}
            className='add-cart'> Remove</button>
        </div>
    );
};

export default Reveiwitem;