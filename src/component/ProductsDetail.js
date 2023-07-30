import React, { useEffect, useState }  from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Link, useLocation } from "react-router-dom"
import Cookies from 'js-cookie';
function ProductsDetail() {

    const [product, setProduct] = useState({});
    const [bigImage, setBigImage] = useState('');
    const [quantity, setQuantity]=useState(1);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    
    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`http://localhost:4000/showUpdateProduct?id=${id}`);


                if (response.ok) {
                    const data = await response.json();
                    if (data !== null) {
                        setProduct(data);
                        setBigImage(`http://localhost:4000/images/${data.featured}`);
                    } else {
                        console.error('Product not found');
                        // Handle the scenario where the product is not found, e.g., show an error message or redirect to a not-found page.
                    }
                } else {
                    console.error('Error fetching product:', response.statusText);
                    // Handle other error scenarios, e.g., show an error message to the user.
                }
            } catch (err) {
                console.error('Error fetching product:', err);
            }
        }

        fetchProduct();
    }, [id]);
    const handleThumbnailClick = (image) => {
        setBigImage(`http://localhost:4000/images/${image}`);
        
    };

// Function to add a product to the cart
const addToCart = (productToAdd) => {
    // Get the current cart data from cookies (if any)
    const cartData = Cookies.get('cart') || '[]';
    const cartItems = JSON.parse(cartData);

    // Check if the product is already in the cart
    const existingProduct = cartItems.find((item) => item._id === productToAdd._id);

    // If the product is not in the cart, add it to the cart with an initial quantity of 1
    if (!existingProduct) {
      cartItems.push({ ...productToAdd, quantity: quantity,price:quantity*productToAdd.price });
    } else {
      // If the product is already in the cart, increase its quantity by 1
      existingProduct.quantity += quantity;
      existingProduct.price += quantity*productToAdd.price;
    }

    // Save the updated cart data back to cookies
    Cookies.set('cart', JSON.stringify(cartItems));
  };

  const increment=()=>{
    setQuantity(prevQuantity => prevQuantity + 1);
  }

  const decrement=()=>{
    setQuantity(prevQuantity => prevQuantity - 1);
  }

// Add a loading state to handle the data fetching process
const isLoading = Object.keys(product).length === 0;
    return (
        <>
            <Navbar />
            {isLoading ? (
                <div>Loading...</div>
            ) : (
            <section className="py-5">
                <div className="container mt-5">
                    <div className="row gx-5">
                        <aside className="col-lg-6">
                            <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                <div data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image" >
                                    <img style={{ maxWidth: "100%", maxHeight: "100vh", margin: "auto" }} className="rounded-4 fit" src={bigImage} alt={`${product.featured}`}  />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                            {product.images.map((image, index) => (
                                <div key={index} onClick={() => handleThumbnailClick(image)} data-fslightbox="mygalley" className="border mx-1 rounded-2 item-thumb" target="_blank" data-type="image"  >
                                    <img width="60" height="60" className="rounded-2" src={`http://localhost:4000/images/${image}`} alt={`${image}`} />
                                </div>
                            ))}
                            </div>

                        </aside>
                        <main className="col-lg-6">
                            <div className="ps-lg-3">
                                <h4 className="title text-dark">
                                {product.title}
                                </h4>
                                <div className="d-flex flex-row my-3">
                                    <div className="text-warning mb-1 me-2">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fas fa-star-half-alt"></i>
                                        <span className="ms-1">
                                            4.5
                                        </span>
                                    </div>
                                    <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>154 orders</span>
                                    <span className="text-success ms-2">In stock</span>
                                </div>

                                <div className="mb-3">
                                    <span className="h5">${product.price}</span>
                                    <span className="text-muted">/per box</span>
                                </div>

                                <p>
                                    {product.description}
                                </p>

                                <div className="row">
                                    <dt className="col-3">Type:</dt>
                                    <dd className="col-9">Regular</dd>

                                    <dt className="col-3">Color</dt>
                                    <dd className="col-9">Brown</dd>

                                    <dt className="col-3">Material</dt>
                                    <dd className="col-9">Cotton, Jeans</dd>

                                    <dt className="col-3">Brand</dt>
                                    <dd className="col-9">{product.brand}</dd>
                                </div>

                                <hr />

                                <div className="row mb-4">
                                    <div className="col-md-4 col-6">
                                        <label className="mb-2">Size</label>
                                        <select className="form-select border border-secondary" style={{ height: "35px" }}>
                                        {product.size.map((size, index) => (
                                            <option key={index} >{size}</option>
                                            // <option>Medium</option>
                                            // <option>Large</option>
                                        ))}
                                        </select>
                                    </div>
                                    <div className="col-md-4 col-6 mb-3">
                                        <label className="mb-2 d-block">Quantity</label>
                                        <div className="input-group mb-3" style={{ width: "170px" }}>
                                            <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark" onClick={decrement}>
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            
                                            <input id="quantityValue" type="number" className="form-control text-center border border-secondary" value={quantity} onChange={e => setQuantity(Number(e.target.value))}  aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                            <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark" onClick={increment} >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/checkOutPage" className="btn btn-warning shadow-0"> check out </Link>
                                <div onClick={() => addToCart(product)} className="btn btn-primary shadow-0" style={{ marginLeft: 10 }}> <i className="me-1 fa fa-shopping-basket"></i> Add to cart </div>
                                <Link to="/" className="btn btn-light border border-secondary py-2 icon-hover px-3" style={{ marginLeft: 10 }}> <i className="me-1 fa fa-heart fa-lg"></i> Save </Link>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
            )}
            <Footer />
        </>
    )
}

export default ProductsDetail
