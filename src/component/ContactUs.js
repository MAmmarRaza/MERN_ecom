import React, { useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Swal from 'sweetalert2';
export default function ContactUs() {

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [subject, setsubject] = useState('');
  const [message, setmessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();
      if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Successfully Form Submitted!'
        });
        window.location.href = '/contact';
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Form Not Submitted!',
          text: 'Please Try Again!'
      });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Form Not Submitted!',
        text: 'Please Try Again!'
    });
    }
  };

  return (
    <>
        <Navbar />
      <div className="page-heading contact-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="text-content">
                <h4>contact us</h4>
                <h2>lets get in touch</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="find-us">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2>Our Location on Maps</h2>
              </div>
            </div>
            <div className="col-md-8">
              <div id="map">
                <iframe
                  src="https://maps.google.com/maps?q=Av.+L%C3%BAcio+Costa,+Rio+de+Janeiro+-+RJ,+Brazil&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="330px"
                  frameborder="0"
                  style={{ border: 0 }}
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div className="col-md-4">
              <div className="left-content">
                <h4>About our office</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed
                  voluptate nihil eumester consectetur similiqu consectetur.
                  {"\n\n"}
                  Lorem ipsum dolor sit amet, consectetur adipisic elit. Et,
                  consequuntur, modi mollitia corporis ipsa voluptate corrupti.
                </p>
                <ul className="social-icons">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-behance"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="send-message">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2>Send us a Message</h2>
              </div>
            </div>
            <div className="col-md-8">
              <div className="contact-form">
                <form id="contact" onSubmit={handleFormSubmit} >
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <fieldset>
                        <input
                          name="name"
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Full Name"
                          required=""
                          onChange={(e) => setname(e.target.value)}
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <fieldset>
                        <input
                          name="email"
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="E-Mail Address"
                          required=""
                          onChange={(e) => setemail(e.target.value)}
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <fieldset>
                        <input
                          name="subject"
                          type="text"
                          className="form-control"
                          id="subject"
                          placeholder="Subject"
                          required=""
                          onChange={(e) => setsubject(e.target.value)}
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <textarea
                          name="message"
                          rows="6"
                          className="form-control"
                          id="message"
                          placeholder="Your Message"
                          required=""
                          onChange={(e) => setmessage(e.target.value)}
                        ></textarea>
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <button
                          type="submit"
                          id="form-submit"
                          className="filled-button"
                        >
                          Send Message
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-4">
              <ul className="accordion">
                <li>
                  <a>Accordion Title One</a>
                  <div className="content">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisic elit.
                      Sed voluptate nihil eumester consectetur similiqu
                      consectetur.
                      {"\n\n"}
                      Lorem ipsum dolor sit amet, consectetur adipisic elit. Et,
                      consequuntur, modi mollitia corporis ipsa voluptate
                      corrupti elite.
                    </p>
                  </div>
                </li>
                <li>
                  <a>Second Title Here</a>
                  <div className="content">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisic elit.
                      Sed voluptate nihil eumester consectetur similiqu
                      consectetur.
                      {"\n\n"}
                      Lorem ipsum dolor sit amet, consectetur adipisic elit. Et,
                      consequuntur, modi mollitia corporis ipsa voluptate
                      corrupti elite.
                    </p>
                  </div>
                </li>
                <li>
                  <a>Accordion Title Three</a>
                  <div className="content">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisic elit.
                      Sed voluptate nihil eumester consectetur similiqu
                      consectetur.
                      {"\n\n"}
                      Lorem ipsum dolor sit amet, consectetur adipisic elit. Et,
                      consequuntur, modi mollitia corporis ipsa voluptate
                      corrupti elite.
                    </p>
                  </div>
                </li>
                <li>
                  <a>Fourth Accordion Title</a>
                  <div className="content">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisic elit.
                      Sed voluptate nihil eumester consectetur similiqu
                      consectetur.
                      {"\n\n"}
                      Lorem ipsum dolor sit amet, consectetur adipisic elit. Et,
                      consequuntur, modi mollitia corporis ipsa voluptate
                      corrupti elite.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
