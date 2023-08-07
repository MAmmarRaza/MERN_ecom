import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import Swal from 'sweetalert2';

function Login() {
    const [login_email , login_set_email] = useState("");
    const [login_password , login_set_password] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Make the HTTP POST request to send the form data to the server
        axios.post("http://localhost:4000/Customerlogin", { login_email,login_password })
          .then(result => {
            console.log(result.data); // Assuming the server sends back a response with data
            // navigate("/");
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Successfully Login In!'
            });
          })
          .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to Login!'
            });
            console.error(error);
          });
      }
    return (
        <div>
            <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black mt-3 mb-3">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="card-body">

                                            <div className="text-center">
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                    style={{ width: 185 }} alt="logo" />
                                                <h4 className="mt-1 mb-5 pb-1">We are The Chain Ecommerce</h4>
                                            </div>

                                            <form onSubmit={handleSubmit}>
                                                <p>Please login to your account</p>
                                                <div className="form-outline mb-4">
                                                    <input type="email" id="login_email" name='login_email' className="form-control"
                                                        placeholder="Enter your email address" value={login_email}
                                                        onChange={(e) => login_set_email(e.target.value)}/>
                                                    <label className="form-label">Email</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="password" id="login_password" name='login_password' className="form-control" placeholder="Enter your password" value={login_password}
                                                        onChange={(e) => login_set_password(e.target.value)}/>
                                                    <label className="form-label">Password</label>
                                                </div>

                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit" style={{ width: 85, height: 28 }}>Log
                                                        in</button>
                                                    <a className="text-muted" href="#!"> Forgot password?</a>
                                                </div>

                                                <div className="d-flex align-items-center justify-content-center pb-4" style={{ marginTop: -30 }}>
                                                    <p className="mb-0 me-2">Don't have an account?</p>
                                                    <Link className="btn btn-outline-danger" to="/signup">Create new</Link>
                                                </div>

                                            </form>

                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                            <h4 className="mb-4">We are more than just a company</h4>
                                            <p className="small mb-0" style={{ color: "white" }}>
                                                Welcome to ChainMart - Your One-Stop Shop for All Your Shopping Needs!
                                                ChainMart is a leading chain e-commerce platform, offering a wide range of products from various categories to meet your shopping desires. With our user-friendly interface and secure checkout process, shopping has never been easier.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
