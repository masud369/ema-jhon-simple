import React from 'react';
import './App.css';
import Header from './Comonents/Header/Header';
import Shop from './Comonents/Shops/Shop';
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link
} from "react-router-dom";
import Review from './Comonents/Review/Review';
import Nomatch from './Comonents/No-match/Nomatch';
import Inventory from './Comonents/Cart/Inventory/Inventory';
import Productdetails from './Comonents/Product-details/Product-details';

function App() {
  return (
    <div>

        <Header></Header>
      <div>
        <Router>
          <Routes > 
            <Route path='/shop' element={<Shop/>} /> 
              {/* <Shop></Shop> */}
            
            <Route path='/review' element={<Review/>} /> 
            <Route path='/' element={<Shop/>} /> 
              {/* <Review></Review> */}
             
             <Route path='/manage' element={<Inventory/> }/>
             <Route path='/product/:productId' element={<Productdetails/> }/>
             
             <Route path='/*' element={<Nomatch/>} /> 
           
          </Routes >
        </Router>
      </div>
      </div>
  );
}

export default App;
