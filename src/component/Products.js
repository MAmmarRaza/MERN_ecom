import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import ProductItem from './ProductItem';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Set the number of items per page

  // const history = useHistory(); // Step 1: Get access to the history object
  const location = useLocation(); // Step 1: Get access to the location object
  const searchParams = new URLSearchParams(location.search); // Step 1: Get URL parameters

  const selectedBrandFromURL = searchParams.get('brand') || 'All'; // Step 5: Get the selected brand from URL parameter or default to 'All'
  const [selectedBrand, setSelectedBrand] = useState(selectedBrandFromURL); // Step 5: Set the selected brand state


  useEffect(() => {
    // Step 3: Fetch products based on the selected brand from the URL parameter
    async function fetchProducts() {
      try {
        const brandQueryParam = selectedBrand === 'All' ? '' : `?brand=${encodeURIComponent(selectedBrand)}`;
        const response = await fetch(`http://localhost:4000/showproducts${brandQueryParam}`);

        if (response.ok) {
          const data = await response.json();
          setProducts(data.result);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    }

    fetchProducts();
  }, [selectedBrand]);



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
            <div className="filters">
              <ul>
                <li
                  className={selectedBrand === 'All' ? 'active px-3' : 'px-3'}
                  onClick={() => setSelectedBrand('All')} // Set the selected brand to 'All' when clicked
                  data-filter="*" >
                  All Products
                </li>
                <li
                  className={selectedBrand === "Levi's" ? 'active px-3' : 'px-3'}
                  onClick={() => setSelectedBrand("Levi's")} // Set the selected brand to "Levi's" when clicked
                  data-filter=".des">
                  Levi's
                </li>
                <li
                  className={selectedBrand === 'Nike' ? 'active px-3' : 'px-3'}
                  onClick={() => setSelectedBrand('Nike')} // Set the selected brand to 'Nike' when clicked
                  data-filter=".dev" >
                  Nike
                </li>
                <li
                  className={selectedBrand === 'Adidas' ? 'active px-3' : 'px-3'}
                  onClick={() => setSelectedBrand('Adidas')} // Set the selected brand to 'Adidas' when clicked
                >
                  Adidas
                </li>
                <li
                  className={selectedBrand === 'Gucci' ? 'active px-3' : 'px-3'}
                  onClick={() => setSelectedBrand('Gucci')} // Set the selected brand to 'Gucci' when clicked
                >
                  Gucci
                </li>
              </ul>
            </div>
            <div className="col-md-12 mb-5">
              <div className="filters-content">
                <div className="row">
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




      <Footer />
    </>
  )
}

export default Products
