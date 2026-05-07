import { memo, useState } from 'react';
import NavbarHome from './NavbarHome';
import Footer from './Footer';
import './css/Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page pt-fixed">
      <NavbarHome />

      <div className="container mt-4">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-body p-4">
                <h1 className="h3 fw-bold mb-3">Contact Us</h1>
                <p className="text-muted">Have questions, feedback, or partnership ideas? Send us a message.</p>

                {submitted && (
                  <div className="alert alert-success" role="alert">
                    Thanks! Your message has been submitted.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-3">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-control"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      className="form-control"
                      placeholder="How can we help?"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      className="form-control"
                      placeholder="Write your message here..."
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-success px-4">Submit</button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-3">Our Office</h2>
                <p className="text-muted mb-1">FarmHub HQ</p>
                <p className="text-muted">123 Greenfields Road, Coimbatore</p>

                <h2 className="h5 fw-bold mt-4 mb-3">Support</h2>
                <ul className="list-unstyled text-muted">
                  <li>Email: support@farmhub.com</li>
                  <li>Phone: +91 8072039429</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default memo(Contact);
