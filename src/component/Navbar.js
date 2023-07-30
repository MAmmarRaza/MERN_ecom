import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
const Navbar = () => {
    const [cart, setcart]=useState(0);
    useEffect(()=>{
        const cartData = Cookies.get('cart') || '[]';
        const cartItems = JSON.parse(cartData);
        setcart(cartItems.length);
    })
    return (
        <header className="">
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand" href="/"><h2>Chain <em>Ecommerce</em></h2></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse justify-content-end" id="navbarResponsive">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/productsPage">Our Products</a>
                            </li>
                            <li className="nav-item" >
                                <a className="nav-link" href="/checkOutPage" style={{fontSize:"20px"}}> <i className="fas fa-shopping-cart "  ><span style={{fontSize:"10px"}} class="badge bg-danger text-white">{cart}</span></i></a>
                            </li>
                        </ul>
                    </div>
                    <div class="dropdown mx-auto " style={{top:"-5px"}}>
                        <div class="header-dropdown  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJFfdPAfeJKYiwglp2z9IjDwphJAqEgyAsUv9nfcDLPVXRPzL2B0pLAvUoyVf4QTzoyso&usqp=CAU" class="rounded-circle" height="30"
          alt="Black and White Portrait of a Man" loading="lazy" />
                        </div>
                        <div class="dropdown-menu " aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item " href="/signin">Login <i className='fa fa-sign-in' ></i> </a>
                            <a class="dropdown-item " href="/logout">Logout <i className='fa fa-sign-out' ></i></a>
                        </div>
                    </div>
                    
                </div>
                
            </nav>
        </header>
    );
};

export default Navbar;
