import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './component/Home';
import Products from './component/Products';
import CheckOut from './component/CheckOut';
import ProductsDetail from './component/ProductsDetail';
// import Login from './component/Login';
import Signup from './component/Signup';
import Signin from './component/Signin';
import { isUserAuthenticated } from './utils/auth';
import ContactUs from './component/ContactUs';
import ResetPage from './component/ResetPage';

function App() {
  const isAuthenticated = isUserAuthenticated();
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/productsPage" element={<Products />} />
        <Route exact path="/productDetailPage" element={<ProductsDetail />} />
        <Route exact path="/checkOutPage" element={isAuthenticated ? <CheckOut />  : <Navigate to="/signin" />}   />
        <Route exact path="/contact"  element={<ContactUs/>} />
        <Route exact path="/resetpage" element={ <ResetPage/> } />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/signin" element={ <Signin/> } />
       
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;