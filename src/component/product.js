import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import ProductItem from './ProductItem';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Set the number of items per page

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

  // Calculate the index of the last item and the first item for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change the current page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
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
                  {currentProducts && currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <div className="col-lg-4 col-md-4 all des" key={product._id}>
                        <ProductItem product={product} />
                      </div>
                    ))
                  ) : (
                    <p>No products available</p>
                  )}
                </div>
              </div>
            </div>
            {/* Pagination */}
            <div className="col-md-12 mt-5">
              <ul className="pages">
                {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
                  <li key={pageNumber} className={currentPage === pageNumber ? 'active' : ''}>
                    <a onClick={() => handlePageChange(pageNumber)} href="/productsPage">{pageNumber}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='container' >
        <div className='row'>

        </div>
        <script>
        {/* host: 'smtp.gmail.com',
  port: 587,
  secureConnection: false,
  auth: { */}
    {/* 'ammarqadri280@gmail.com',
    'wfpevymcqumxjhhc',
  '},'
  tls: {
    'ciphers: TLSv1.2', // Use TLSv1.2 instead of SSLv3
  }, */}
        </script>

      </div>

      <Footer />
    </>
  )
}

export default Products
