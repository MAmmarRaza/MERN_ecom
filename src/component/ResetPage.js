import React, { useState } from 'react'
import { useLocation } from "react-router-dom"
import Swal from 'sweetalert2';

export default function ResetPage() {
    const [password, setpassword]=useState('')
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const handleForgetPassword = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:4000/reset', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, password }),
          });
    
          const data = await response.json();
          if (response.ok) {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Successfully Updated!'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Form Not Submitted!',
              text: 'Please Try Again!'
          });
          }
        } catch (error) {
            console.log("error")
          Swal.fire({
            icon: 'error',
            title: 'Form Not Submitted!',
            text: 'Please Try Again!'
        });
        }
      };
  return (
    
    <div classsName="card text-center" style={{width: "300px"}}>
    <div classsName="card-header h5 text-white bg-primary">Password Reset</div>
    <div classsName="card-body px-5">
        <p classsName="card-text py-2">
            Enter your email address and we'll send you an email with instructions to reset your password.
        </p>
       
        <form onSubmit={handleForgetPassword} >
        <div classsName="form-outline">
            <input type="password" name='password' className='form-control my-3' onChange={(e) => setpassword(e.target.value)} />
            <label classsName="form-label" for="typeEmail">Email input</label>
        </div>
            <input  type='submit' classsName="btn btn-primary w-100" value={"Reset password"}/>
        </form>
        
    </div>
    
</div>
    
  )
}
