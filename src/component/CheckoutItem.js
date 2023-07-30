import React from 'react'

export default function CheckoutItem(props) {
    const handleRemoveProduct = () => {
        // Call the removeProduct function passed as a prop with the product ID
        props.removeProduct(props.productId);
      };
    return (
        // <div className="d-flex align-items-center mb-5">
        //     <div className="flex-shrink-0">
        //         <img src={`http://localhost:4000/images/${props.featured}`} className="img-fluid" style={{ width: 150 }} alt='This is about checkout details' />
        //     </div>
        //     <div className="flex-grow-1 ms-3">
        //         <a style={{cursor:"pointer"}} className="float-end text-black" onClick={handleRemoveProduct} >
        //             <i className="fas fa-times"></i>
        //         </a>
        //         <h5 className="text-primary">{props.title}</h5>
        //         <h6 style={{ color: "#9e9e9e" }}>Color: white</h6>
        //         <div className="d-flex align-items-center">
        //             <p className="fw-bold mb-0 me-5 pe-3">{props.price}$</p>
                   
        //         </div>
        //     </div>
        // </div>
        <li class="list-group-item d-flex justify-content-between lh-condensed d-flex align-items-center">
            <img src={`http://localhost:4000/images/${props.featured}`} className="img-fluid" style={{ width: 80 }} alt='This is about checkout details' />
              <div className=''>
                <h6 class="mx-1">{props.title}</h6>
                <span class="text-muted">{props.price}$</span>
              </div>
              <a style={{cursor:"pointer"}} className="float-end text-black" onClick={handleRemoveProduct} >
                     <i className="fas fa-times"></i>
                 </a>
              
        </li>
    )
}
