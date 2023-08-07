// import React from 'react'

// import axios from "axios"
import React, { useState } from 'react'
import Swal from 'sweetalert2';
export default function Signin() {
    
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:4000/Customerlogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({  email, password }),
        });
  
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('auth-token', data.token);
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Successfully Login In!'
          });
            window.location.href = '/';
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Invalid Credentials!'
        });
        }
      } catch (error) {
        console.error('Error adding student:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid Credentials!!'
      });
      }
    };

    const handleForgetPassword = async (e) => {
      try {
        const response = await fetch('http://localhost:4000/forgetPassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        const data = await response.json();
        if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Check you mail!'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Form Not Submitted!',
            text: 'Please Try Again!'
        });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Form Not Submitted!',
          text: 'Please Try Again!'
      });
      }
    };
  
    return (

        <>
       <div className="container-fluid">
            <div className="row h-100 align-items-center justify-content-center" style={{minHeight: "100vh"}}>
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <a href="index.html" className="">
                                <h3 className="text-danger"><i className="fa fa-hashtag me-2 text-danger"></i>DASHMIN</h3>
                            </a>
                            <h3>Sign In</h3>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setemail(e.target.value)} />
                                <label for="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setpassword(e.target.value)} />
                                <label for="floatingPassword">Password</label>
                            </div>
                            
                            <button type="submit" className="btn btn-danger py-3 w-100 mb-4">Sign In</button>
                            <p className="text-center mb-0">Don't have an Account? <a href="/signup" className='text-danger'>Sign Up</a></p>
                        </form>
                        <p className="text-center mb-0"><p style={{cursor:"pointer"}} onClick={handleForgetPassword } className='text-danger'>Forget Password? </p></p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}


    


