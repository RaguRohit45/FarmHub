import { memo } from 'react';
import NavbarHome from './NavbarHome';
import Footer from './Footer';
import './css/About.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page">
      <NavbarHome />

      <div className="container mt-4">
        <section className="about-hero p-5 shadow-sm">
          <h1 className="display-6 fw-bold mb-3">About FarmHub</h1>
          <p className="lead mb-0">
            FarmHub is a community-driven platform to help farmers learn with videos,
            ask doubts, and get practical answers from experienced farmers and experts.
            This site was created in <strong>2025</strong> to make modern, sustainable farming
            knowledge accessible to all.
          </p>
        </section>
      </div>

      <div className="container mt-5">
        <div className="row g-4">
          <div className="col-md-6">
            <h2 className="section-title mb-3">Our Mission</h2>
            <p className="text-muted">
              Empower every farmer with the skills, tools, and support to grow healthier crops,
              increase yields, and embrace sustainable practices. We bring together curated video
              lessons, an active Q&A community, and region-specific tips—all in one place.
            </p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">High-quality, step-by-step video lessons</li>
              <li className="list-group-item">Fast, reliable answers to real-world farming questions</li>
              <li className="list-group-item">Practical tips from experienced farmers</li>
            </ul>
          </div>
          <div className="col-md-6">
            <div className="row g-3">
              <div className="col-6">
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <h3 className="fw-bold text-success">2025</h3>
                    <p className="mb-0">Year founded</p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <h3 className="fw-bold text-success">100+</h3>
                    <p className="mb-0">Video lessons</p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <h3 className="fw-bold text-success">1K+</h3>
                    <p className="mb-0">Community answers</p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <h3 className="fw-bold text-success">24/7</h3>
                    <p className="mb-0">Support & tips</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="section-title mb-3">Our Story</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h6 className="mb-1 ms-3">2025 — FarmHub Launched</h6>
            <p className="text-muted mb-0">Started with a vision to bring modern farming education to everyone.</p>
          </div>
          <div className="timeline-item">
            <h6 className="mb-1 ms-3">2025 — Video Library Published</h6>
            <p className="text-muted mb-0">Uploaded the first set of training videos with local language support.</p>
          </div>
          <div className="timeline-item">
            <h6 className="mb-1 ms-3">2025 — Community Q&A</h6>
            <p className="text-muted mb-0">Enabled farmers to ask questions and share practical solutions.</p>
          </div>
        </div>
      </div>

      <div className="container mt-5 mb-4">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Get In Touch</h5>
                <p className="card-text text-muted">We’d love to hear from you. Share feedback, suggest topics, or partner with us.</p>
                <Link to="/contact" className="btn btn-success">Contact Us</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Follow Our Journey</h5>
                <p className="card-text text-muted">Stay updated with new videos, tips, and community highlights.</p>
                <div className="d-flex gap-2">
                  <a className="btn btn-outline-secondary" href="#">Facebook</a>
                  <a className="btn btn-outline-secondary" href="#">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default memo(About);