import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Footer from './Footer'
import ProductItem from './ProductItem'
import Corousel from './Corousel';
import Navbar from './Navbar'

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('http://localhost:4000/showproducts');

                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.result);
                }
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        }

        fetchProducts();
    }, []);

    return (
        <>
            <Navbar />
            <div id="preloader">
                <div className="jumper">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <Corousel />
            
            <div className="latest-products">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <h2>Latest Products</h2>
                                <a href="products.html">view all products <i className="fa fa-angle-right"></i></a>
                            </div>
                        </div>
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <div className="col-md-4" key={product._id}>
                                    <ProductItem product={product} />
                                </div>
                            ))
                        ) : (
                            <p>No products available</p>
                        )}
                    </div>
                </div>
            </div>


            <div className="best-features">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <h2>About Chain Clothing</h2>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="left-content">
                                <h4>Looking for the best products?</h4>
                                <p><a rel="nofollow" href="https://templatemo.com/tm-546-Chain-clothing" target="_parent">This template</a> is free to use for your business websites. However, you have no permission to redistribute the downloadable ZIP file on any template collection website. <a rel="nofollow" href="https://templatemo.com/contact">Contact us</a> for more info.</p>
                                <ul className="featured-list">
                                    <li><a href="/">Lorem ipsum dolor sit amet</a></li>
                                    <li><a href="/">Consectetur an adipisicing elit</a></li>
                                    <li><a href="/">It aquecorporis nulla aspernatur</a></li>
                                    <li><a href="/">Corporis, omnis doloremque</a></li>
                                    <li><a href="/">Non cum id reprehenderit</a></li>
                                </ul>
                                <a href="about.html" className="filled-button">Read More</a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="right-image">
                                <img src="assets/images/feature-image.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="call-to-action">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="inner-content">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4>Creative &amp; Unique <em>Chain</em> Products</h4>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque corporis amet elite author nulla.</p>
                                    </div>
                                    <div className="col-md-4">
                                        <a href="/" className="filled-button">Purchase Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home
