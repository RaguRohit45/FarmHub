import { memo } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="Footer">
            <footer className="mt-5 py-4 border-top">
                <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <span className="text-muted">&copy; {new Date().getFullYear()} FarmHub</span>
                    <div className="d-flex gap-3 mt-2 mt-md-0">
                        <Link to="/privacy" className="link-secondary text-decoration-none">Privacy</Link>
                        <Link to="/terms" className="link-secondary text-decoration-none">Terms</Link>
                        <Link to="/contact" className="link-secondary text-decoration-none">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default memo(Footer);