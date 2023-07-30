import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const Products = () => {
  return (
    <>
    <Navbar />
    <div className="page-heading products-heading header-text">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="text-content">
              <h4>new arrivals</h4>
              <h2>Chain products</h2>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div className="products">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="filters">
              <ul>
                  <li className="active" data-filter="*">All Products</li>
                  <li data-filter=".des">Featured</li>
                  <li data-filter=".dev">Flash Deals</li>
                  <li data-filter=".gra">Last Minute</li>
              </ul>
            </div>
          </div>
          <div className="col-md-12 mb-5">
            <div className="filters-content">
                <div className="row grid">
                    <div className="col-lg-4 col-md-4 all des">
                      <div className="product-item">
                        <a href="/"><img src="assets/images/product_01.jpg" alt="Detail" /></a>
                        <div className="down-content">
                          <a href="/"><h4>Tittle goes here</h4></a>
                          <h6>$18.25</h6>
                          <p>Lorem ipsume dolor sit amet, adipisicing elite. Itaque, corporis nulla aspernatur.</p>
                          <ul className="stars">
                            <li><i className="fa fa-star"></i></li>
                            <li><i className="fa fa-star"></i></li>
                            <li><i className="fa fa-star"></i></li>
                            <li><i className="fa fa-star"></i></li>
                            <li><i className="fa fa-star"></i></li>
                          </ul>
                          <span>Reviews (12)</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 all dev">
                      <div className="product-item">
                        <a href="/"><img src="assets/images/product_05.jpg" alt="Detail" /></a>
                        <div className="down-content">
                          <a href="/"><h4>Tittle goes here</h4></a>
                          <h6>$18.75</h6>
                          <p>Lorem ipsume dolor sit amet, adipisicing elite. Itaque, corporis nulla aspernatur.</p>
                          <ul className="stars">
                            <li><i className="fa fa-star"></i></li>
                            <li><i className="fa fa-star"></i></li>
                            <li><i className="fa fa-star"></i></li>
                            <li><i className="fa fa-star"></i></li>
                            <li><i className="fa fa-star"></i></li>
                          </ul>
                          <span>Reviews (60)</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 all des">
                      <div className="product-item">
                        <a href="/"><img src="assets/images/product_06.jpg" alt="Detail" /></a>
                        <div className="down-content">
                          <a href="/"><h4>Tittle goes here</h4></a>
                          <h6>$12.50</h6>
                          <p>Lorem ipsume dolor sit amet, adipisicing elite. Itaque, corporis nulla aspernatur.</p>
                          <ul className="stars">
                            <li><i className="fa fa-star"></i></li>
                            <li><i className="fa fa-star"></i></li>
                            <li><i className="fa fa-star"></i></li>
                            <li><i className="fa fa-star"></i></li>
                            <li><i className="fa fa-star"></i></li>
                          </ul>
                          <span>Reviews (72)</span>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="col-md-12 mt-5">
            <ul className="pages">
              <li><a href="/productsPage">1</a></li>
              <li className="active"><a href="/productsPage">2</a></li>
              <li><a href="/productsPage">3</a></li>
              <li><a href="/productsPage">4</a></li>
              <li><a href="/productsPage"><i className="fa fa-angle-double-right"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Products
