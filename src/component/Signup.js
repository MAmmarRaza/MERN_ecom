// import React from 'react'

// import axios from "axios"
import React, { useState } from 'react'
import Swal from 'sweetalert2';
export default function Signup() {

    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:4000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password, role:2 }),
        });
  
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('auth-token', data.token);
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Successfully Sign Up!'
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
          text: 'Invalid Credentials!'
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
                            <h3>Sign Up</h3>
                        </div>
                    <form action="" onSubmit={handleFormSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingText" placeholder="jhondoe" onChange={(e) => setusername(e.target.value)} />
                            <label for="floatingText">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"  onChange={(e) => setemail(e.target.value)} />
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setpassword(e.target.value)} />
                            <label for="floatingPassword">Password</label>
                        </div>
                        
                        <button type="submit" className="btn btn-danger py-3 w-100 mb-4">Sign Up</button>
                        <p className="text-center mb-0">Already have an Account? <a href="/signin" className='text-danger'>Sign In</a></p>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}


    


