import React, { useState } from 'react';

export default function Contact() {
  const [copyFeedback, setCopyFeedback] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formNotice, setFormNotice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailAddress = 'sahithm2006@gmail.com';

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(emailAddress).then(() => {
        setIsCopied(true);
        setCopyFeedback('Copied to clipboard ✓');
        setTimeout(() => {
          setIsCopied(false);
          setCopyFeedback('');
        }, 2500);
      });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = 'Please provide a message (minimum 5 characters).';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name.trim()}`);
    const body = encodeURIComponent(
      `Hello Sahith,\n\n${formData.message.trim()}\n\n---\nSender: ${formData.name.trim()}\nEmail: ${formData.email.trim()}`
    );
    const mailtoUrl = `mailto:${emailAddress}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;

    setFormNotice({
      type: 'success',
      message: 'Launching your email client with this pre-filled message.'
    });

    setIsSubmitting(false);
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker-strip">
            <span className="section-kicker-dot" />
            <span className="section-kicker">STAGE 04 // EVOLUTION &bull; TRANSMIT</span>
          </div>
          <h2 className="section-title" id="contact-title">
            Let&apos;s Build <span className="accent-text">Something Meaningful</span>
          </h2>
          <p className="section-subtitle">
            Open to technical internships, applied AI engineering roles, backend systems development,
            and collaborative research opportunities.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Coordinates & Contact Channels */}
          <div className="contact-info-col">
            <div className="contact-info-card">
              <span className="contact-card-kicker">DIRECT TRANSMISSION</span>
              <h3 className="contact-info-heading">Direct Channels</h3>
              <p className="contact-info-desc">
                Whether discussing an upcoming placement drive, a technical internship opportunity,
                or agentless security architecture &mdash; feel free to reach out.
              </p>

              {/* Email Block with Copy Action */}
              <div className="contact-channel-item">
                <span className="channel-label">EMAIL ADDRESS</span>
                <div className="channel-value-row">
                  <a href={`mailto:${emailAddress}`} className="channel-email-link">
                    {emailAddress}
                  </a>
                  <button
                    type="button"
                    className="btn-copy-email"
                    onClick={handleCopyEmail}
                    title="Copy email to clipboard"
                  >
                    {isCopied ? 'Copied ✓' : 'Copy Email'}
                  </button>
                </div>
                {copyFeedback && <span className="copy-feedback-text">{copyFeedback}</span>}
              </div>

              {/* Location Block */}
              <div className="contact-channel-item">
                <span className="channel-label">BASE LOCATION</span>
                <div className="channel-text">
                  Chennai, Tamil Nadu, India &bull; Open to Remote / Hybrid / On-site Relocation
                </div>
              </div>

              {/* Social Profiles */}
              <div className="contact-channel-item">
                <span className="channel-label">PROFESSIONAL NETWORKS</span>
                <div className="contact-social-links">
                  <a
                    href="https://linkedin.com/in/sahith-m-sahith518"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-social-network"
                  >
                    <span>LinkedIn Profile</span>
                    <span className="btn-arrow" aria-hidden="true">↗</span>
                  </a>

                  <a
                    href="https://github.com/SahithM2006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-social-network"
                  >
                    <span>GitHub Repositories</span>
                    <span className="btn-arrow" aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accessible Dispatch Form */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <span className="contact-card-kicker">INQUIRY FORM</span>
              <h3 className="contact-form-heading">Send a Message</h3>

              {formNotice && (
                <div className="contact-notice-box success" role="status">
                  <span className="notice-icon">✓</span>
                  <span>{formNotice.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="contact-form-element">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Your Name <span className="req-star">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className={`form-input ${formErrors.name ? 'has-error' : ''}`}
                    placeholder="e.g. Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  {formErrors.name && (
                    <span className="form-error-msg" role="alert">{formErrors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Your Email Address <span className="req-star">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className={`form-input ${formErrors.email ? 'has-error' : ''}`}
                    placeholder="e.g. jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  {formErrors.email && (
                    <span className="form-error-msg" role="alert">{formErrors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message <span className="req-star">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    className={`form-textarea ${formErrors.message ? 'has-error' : ''}`}
                    placeholder="Introduce yourself or share details regarding an engineering role or collaboration..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                  {formErrors.message && (
                    <span className="form-error-msg" role="alert">{formErrors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-submit-contact"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Preparing Transmission...' : 'Dispatch Message →'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
