import { memo } from 'react';
import NavbarHome from './NavbarHome';
import Footer from './Footer';

const Privacy = () => {
  return (
    <>
      <NavbarHome />
      <main style={{ paddingTop: '80px' }}>
        <div className="container py-4">
          <h1 className="mb-3">Privacy Policy</h1>
          <p className="text-muted">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-4">
            <h5>1. Information We Collect</h5>
            <p>
              We collect information you provide when creating an account, posting comments, uploading videos, or
              interacting with the platform. This may include your name, email, and content you submit.
            </p>
          </section>

          <section className="mb-4">
            <h5>2. How We Use Your Information</h5>
            <ul>
              <li>To operate and improve FarmHub features</li>
              <li>To authenticate users and secure your account</li>
              <li>To display public content like videos and comments you share</li>
            </ul>
          </section>

          <section className="mb-4">
            <h5>3. Sharing and Disclosure</h5>
            <p>
              We do not sell your personal information. We may share limited data with service providers to operate our
              infrastructure, or when required by law.
            </p>
          </section>

          <section className="mb-4">
            <h5>4. Data Retention</h5>
            <p>
              We retain your data as long as your account is active or as needed to provide services. You can request
              deletion of your videos and comments at any time.
            </p>
          </section>

          <section className="mb-4">
            <h5>5. Your Choices</h5>
            <ul>
              <li>Update or delete your content from your account areas</li>
              <li>Contact us for data requests and questions</li>
            </ul>
          </section>

          <section>
            <h5>6. Contact</h5>
            <p>
              For questions about this policy, reach out via the Contact page.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default memo(Privacy);
