import React from 'react';
import '../App.css'; // Import the external CSS file for Footer styling (create a "Footer.css" file)

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="inner-content">
                <p>Copyright &copy; 2023 Ammar Raza.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
