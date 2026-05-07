import { memo } from 'react';
import NavbarHome from './NavbarHome';
import { Link } from 'react-router-dom';
import './css/Home.css';
import Footer from './Footer';
import farmingVideo from './Video/farming.mp4';

const Home = () => {
    return (
        <div className="home-page">
            <NavbarHome />

            <div className="container mt-4">
                <section className="hero-section p-5 text-center shadow-sm">
                    <h1 className="display-5 fw-bold">Learn Modern Farming with Videos</h1>
                    <p className="lead mx-auto mt-3">
                        Watch step-by-step tutorials, learn best practices, and get answers to your questions
                        from experienced farmers and agri-experts. Join the FarmHub community today.
                    </p>
                    <div className="d-flex gap-3 justify-content-center mt-4">
                        <Link to="/learn" className="btn btn-success btn-lg px-4">Start Learning</Link>
                        <Link to="/ask" className="btn btn-outline-light btn-lg px-4">Ask a Doubt</Link>
                    </div>
                </section>
            </div>

            <div className="container mt-5">
                <h2 className="section-title mb-4">Why FarmHub?</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card h-100 card-hover shadow-sm">
                            <div className="card-body">
                                <div className="feature-icon bg-success bg-opacity-10 text-success mb-3">
                                    <span role="img" aria-label="video">🎥</span>
                                </div>
                                <h5 className="card-title">Video-first Learning</h5>
                                <p className="card-text">Curated video lessons on soil prep, irrigation, pest control, harvesting and more.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 card-hover shadow-sm">
                            <div className="card-body">
                                <div className="feature-icon bg-warning bg-opacity-10 text-warning mb-3">
                                    <span role="img" aria-label="question">❓</span>
                                </div>
                                <h5 className="card-title">Ask Doubts Anytime</h5>
                                <p className="card-text">Post your questions and get practical answers from real farmers and experts.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 card-hover shadow-sm">
                            <div className="card-body">
                                <div className="feature-icon bg-info bg-opacity-10 text-info mb-3">
                                    <span role="img" aria-label="community">🤝</span>
                                </div>
                                <h5 className="card-title">Community & Tips</h5>
                                <p className="card-text">Learn from success stories, seasonal tips, and region-specific best practices.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row align-items-center g-4">
                    <div className="col-lg-6">
                        <div className="ratio ratio-16x9 rounded overflow-hidden shadow-sm">
                            <video
                                controls
                                src={farmingVideo}
                                title="Farming Basics"
                            >
                                <source src={farmingVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h2 className="section-title">Watch. Practice. Grow.</h2>
                        <p className="text-muted">
                            Explore our growing library of short, easy-to-follow videos across crop selection,
                            soil testing, composting, drip irrigation, greenhouse setup, and organic farming.
                        </p>
                        <div className="d-flex gap-2">
                            <Link to="/learn" className="btn btn-success px-4">Browse Video Library</Link>
                            <Link to="/learn" className="btn btn-outline-secondary px-4">Download Guides</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="p-4 p-md-5 bg-success text-white rounded-3">
                    <div className="d-lg-flex align-items-center justify-content-between gap-3">
                        <div>
                            <h3 className="mb-2">Have a farming question?</h3>
                            <p className="mb-0">Ask the community and get answers from experienced farmers within hours.</p>
                        </div>
                        <Link to="/ask" className="btn btn-light text-success fw-semibold px-4 mt-3 mt-lg-0">Ask a Doubt</Link>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <h2 className="section-title mb-4">Recent Answers from Farmers</h2>
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h6 className="text-success">Q: Best time to sow wheat in North India?</h6>
                                <p className="mb-2">A: Late October to mid-November works well with proper soil moisture.</p>
                                <span className="badge text-bg-light">Wheat</span>
                                <span className="badge text-bg-light ms-2">Seasonal</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h6 className="text-success">Q: How to control aphids organically?</h6>
                                <p className="mb-2">A: Use neem oil spray every 7–10 days and encourage ladybugs.</p>
                                <span className="badge text-bg-light">Pest Control</span>
                                <span className="badge text-bg-light ms-2">Organic</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <h2 className="section-title mb-4">In the Field</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 gallery">
                    <div className="col"><img className="w-100" src="https://media.istockphoto.com/id/1451084434/photo/male-farmer-and-agronomist-using-digital-tablet-while-standing-in-corn-field-against-sky.jpg?s=612x612&w=0&k=20&c=VvPFPbmmQEfeM7xPrSBsC-EgS0vtOLbiIZZS8Ai1eRg=" alt="Field" /></div>
                    <div className="col"><img className="w-100" src="https://media.istockphoto.com/id/1320570548/photo/peanuts-plantation-in-countryside-thailand-near-mountain.jpg?s=612x612&w=0&k=20&c=Rth_YqBkOw4_GA0Ed-zrENSelOnvIopyTH-WYbclrCg=" alt="Irrigation" /></div>
                    <div className="col"><img className="w-100" src="https://media.istockphoto.com/id/1297214346/photo/happy-family-in-corn-field-family-standing-in-corn-field-an-looking-at-sun-rise.jpg?s=612x612&w=0&k=20&c=Mw6OBynraDoWqGHZYk86DMLDULq8vwQM76aL2WxlU5c=" alt="Harvest" /></div>
                    <div className="col"><img className="w-100" src="https://media.istockphoto.com/id/1586165598/photo/coffee-harvesting.jpg?s=612x612&w=0&k=20&c=koK8oGHaJcd6KtITDu74Z4yYgcCuye8ioEGXa_g2vMo=" alt="Greenhouse" /></div>
                    <div className="col"><img className="w-100" src="https://media.istockphoto.com/id/649730320/photo/beautiful-view-of-corn-farm-during-sunset.jpg?s=612x612&w=0&k=20&c=bpvwKOZWfnsRuJk3azrLgb9GcWlcI18ov53rRzHzyaY=" alt="Plants" /></div>
                    <div className="col"><img className="w-100" src="https://media.istockphoto.com/id/1451085670/photo/male-farmer-and-agronomist-shaking-hands-in-corn-field.jpg?s=612x612&w=0&k=20&c=rj2vN4uH5u6pQeEg07AtQDA5zHV_9eAxCm9PKWfGykI=" alt="Tractor" /></div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default memo(Home);