import React from 'react'
import {Link} from "react-router-dom"

const ProductItem = (props) => {

    const { product } = props;
    return (
        <>
            <div className="product-item">
                <Link to={`/productDetailPage?id=${product._id}`}><img src={`http://localhost:4000/images/${product.featured}`} alt={`${product.featured}`} /></Link>
                <div className="down-content">
                    <Link to="/productDetailPage"><h4>{product.title}</h4></Link>
                    <h6>${product.price}</h6>
                    <p>{product.description.slice(0, 79)}...</p>
                    <ul className="stars">
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                    </ul>
                    <span>Reviews (36)</span>
                </div>
            </div>
        </>
    )
}

export default ProductItem
