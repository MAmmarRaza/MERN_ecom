import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'
import Navbar from './Navbar'
import CheckoutItem from './CheckoutItem'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2';


const CheckOut = () => {

    const [product, setProduct] = useState([]);
    const [total, settotal] = useState(0);
    const [customer, setcustomer] = useState({});
    const [email, setemail] = useState('');


    useEffect(() => {
        // Get the cart data from cookies
        const cartData = Cookies.get('cart') || '[]';
        const token = localStorage.getItem('auth-token');

        const cartItems = JSON.parse(cartData);
        const totalPrice = cartItems.reduce((total, product) => total + product.price, 0);
        settotal(totalPrice);
        setProduct(cartItems);

        async function fetchCustomer() {
            try {
                const response = await fetch('http://localhost:4000/getCustomer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: token }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setcustomer(data);
                    setemail(data.email);
                }
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        }

        fetchCustomer();

    }, []);
    const [username, setusername] = useState('');
    const [address, setaddress] = useState('');
    const [country, setcountry] = useState('');
    const [state, setstate] = useState('');
    const [zip, setzip] = useState('');
    const [message, setMessage] = useState({});
    const navigate = useNavigate();
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:4000/addOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({  email:email, amount:total,username:username, orderDetail:product , address:address,   country:country , state:state , zip:zip }),
        });
  
        const data = await response.json();
        if (response.ok) {
          setMessage('Order added successfully.');
          Swal.fire({
            icon: 'success',
            title: 'Successful!',
            text: 'Order Placed!'
        })
        Cookies.set('cart', []);
        const cartData = Cookies.get('cart') || '[]';
        const cartItems = JSON.parse(cartData);
        const totalPrice = cartItems.reduce((total, product) => total + product.price, 0);
        
        settotal(totalPrice);
        setProduct(cartItems);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error in Order Placing!'
            })
          setMessage(data);
        }
      } catch (error) {
        console.error('Error adding student:', error);
        setMessage("error");
      }
    };
  

    const removeProductFromCart = (productId) => {
        // Get the current cart data from cookies (if any)
        const cartData = Cookies.get('cart') || '[]';
        const cartItems = JSON.parse(cartData);

        // Find the index of the product in the cartItems array
        const productIndex = cartItems.findIndex((item) => item._id === productId);

        // If the product is found in the cartItems array, remove it
        if (productIndex !== -1) {
            cartItems.splice(productIndex, 1);
            // Save the updated cart data back to cookies
            Cookies.set('cart', JSON.stringify(cartItems));
            // Update the state to re-render the component with the updated cart

            const totalPrice = cartItems.reduce((total, product) => total + product.price, 0);
            settotal(totalPrice);
            setProduct(cartItems);

        }
    };



    return (
        <>
            <Navbar />
            <div className="container py-5 ">

            </div>
            <div className="container py-5 ">
                
                
                <div className="row " >
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Your cart</span>
                            <span className="badge badge-secondary badge-pill">3</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {product.map((item) => (
                                <CheckoutItem key={item._id} productId={item._id} removeProduct={removeProductFromCart} title={item.title} size={item.selectedSize} price={item.price} featured={item.featured} quantity={item.quantity} />
                            ))}
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                                <strong>{total}$</strong>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3">Billing address</h4>
                        <form className="needs-validation" onSubmit={handleFormSubmit} >
                            <div className="row">
                            <div className=" col-md-6 mb-3">
                                <label htmlFor="username">Username</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">@</span>
                                    </div>
                                    <input type="text" className="form-control" id="username" placeholder="Username" value={customer.username} onChange={(e) => setusername(e.target.value)} />
                                    <div className="invalid-feedback" style={{ width: "100%" }}>
                                        Your username is required.
                                    </div>
                                </div>
                            </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                                    <input type="email" className="form-control" id="email" placeholder="you@example.com" value={customer.email} onChange={(e) => setemail(e.target.value)} />
                                    <div className="invalid-feedback">
                                        Please enter a valid email address for shipping updates.
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" onChange={(e) => setaddress(e.target.value)} />
                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="country">Country</label>
                                    <select className="custom-select d-block w-100 form-select" id="country" onChange={(e) => setcountry(e.target.value)}>
                                        <option >Choose...</option>
                                        <option>Pakistan</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="state">State</label>
                                    <select className="custom-select d-block w-100 form-select" id="state" onChange={(e) => setstate(e.target.value)}>
                                        <option >Choose...</option>
                                        <option>Punjab</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="zip">Zip</label>
                                    <input type="text" className="form-control" id="zip" placeholder="" onChange={(e) => setzip(e.target.value)} />
                                    <div className="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>
                            </div>
                            <hr className="mb-4" />


                            <h4 className="mb-3">Payment</h4>


                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="cc-name">Name on card</label>
                                    <input type="text" className="form-control" id="cc-name" placeholder=""  />
                                    <small className="text-muted">Full name as displayed on card</small>
                                    <div className="invalid-feedback">
                                        Name on card is required
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="cc-number">Credit card number</label>
                                    <input type="text" className="form-control" id="cc-number" placeholder=""  />
                                    <div className="invalid-feedback">
                                        Credit card number is required
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="cc-expiration">Expiration</label>
                                    <input type="text" className="form-control" id="cc-expiration" placeholder=""  />
                                    <div className="invalid-feedback">
                                        Expiration date required
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="cc-expiration">CVV</label>
                                    <input type="text" className="form-control" id="cc-cvv" placeholder=""  />
                                    <div className="invalid-feedback">
                                        Security code required
                                    </div>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <button className="btn btn-danger btn-lg btn-block" type="submit">Continue to checkout</button>
                        </form>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    )
}

export default CheckOut;