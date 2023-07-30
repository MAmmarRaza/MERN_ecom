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
                <p>Copyright &copy; 2020 Chain Clothing Co., Ltd.

                  - Design: <a href="https://templatemo.com" target="_blank">TemplateMo</a></p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
