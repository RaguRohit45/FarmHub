import { memo } from 'react';
import NavbarHome from './NavbarHome';
import Footer from './Footer';

const Terms = () => {
  return (
    <>
      <NavbarHome />
      <main style={{ paddingTop: '80px' }}>
        <div className="container py-4">
          <h1 className="mb-3">Terms of Service</h1>
          <p className="text-muted">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-4">
            <h5>1. Acceptance of Terms</h5>
            <p>
              By accessing or using FarmHub, you agree to be bound by these terms. If you do not agree, please do not
              use the platform.
            </p>
          </section>

          <section className="mb-4">
            <h5>2. User Responsibilities</h5>
            <ul>
              <li>Provide accurate information during registration and use</li>
              <li>Respect community guidelines and other users</li>
              <li>Do not upload illegal, harmful, or infringing content</li>
            </ul>
          </section>

          <section className="mb-4">
            <h5>3. Content Ownership</h5>
            <p>
              You retain ownership of the content you upload. By posting, you grant FarmHub a license to host, store,
              and display that content to users as intended by the platform.
            </p>
          </section>

          <section className="mb-4">
            <h5>4. Termination</h5>
            <p>
              We may suspend or terminate access if you violate these terms. You may delete your content or request
              account deletion at any time.
            </p>
          </section>

          <section className="mb-4">
            <h5>5. Disclaimer</h5>
            <p>
              FarmHub is provided "as is" without warranties of any kind. Use at your own risk. We are not liable for
              any damages arising from your use of the service.
            </p>
          </section>

          <section>
            <h5>6. Contact</h5>
            <p>
              For questions about these Terms, contact us via the Contact page.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default memo(Terms);
