import React, { useState, useRef } from 'react';

export default function Contact() {
  const [copyFeedback, setCopyFeedback] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formNotice, setFormNotice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactRef = useRef(null);

  const copyEmail = () => {
    const email = 'sahithm2006@gmail.com';
    const markCopied = () => {
      setIsCopied(true);
      setCopyFeedback('✓ Copied to clipboard!');
      setTimeout(() => {
        setIsCopied(false);
        setCopyFeedback('');
      }, 3000);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email)
        .then(markCopied)
        .catch(() => fallbackCopy(email, markCopied));
    } else {
      fallbackCopy(email, markCopied);
    }
  };

  const fallbackCopy = (text, onSuccess) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        onSuccess();
      } else {
        setCopyFeedback('Press Ctrl+C to copy: ' + text);
      }
    } catch {
      setCopyFeedback('Press Ctrl+C to copy: ' + text);
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
      `Hi Sahith,\n\n${formData.message.trim()}\n\n---\nSender: ${formData.name.trim()}\nEmail: ${formData.email.trim()}`
    );
    const mailtoUrl = `mailto:sahithm2006@gmail.com?subject=${subject}&body=${body}`;

    // Prompt user with real pre-filled mailto trigger
    window.location.href = mailtoUrl;

    setFormNotice({
      type: 'success',
      message: 'Launching your default email client with this pre-filled message.',
      mailtoUrl: mailtoUrl
    });

    setIsSubmitting(false);
  };

  return (
    <section
      ref={contactRef}
      className="contact-section motion-finale-section is-in-view"
      id="contact"
      aria-labelledby="contact-title"
    >
      {/* Background Watermark */}
      <div className="section-bg-watermark watermark-contact" aria-hidden="true">
        09 // TRANSMIT
      </div>

      <div className="contact-container">
        <div className="contact-split-grid">
          {/* Left Column: Direct Inquiries & Email Card */}
          <div className="contact-intro-col">
            <div className="section-kicker">
              <span className="kicker-dot" />
              <span className="kicker-code">STAGE 04 // EVOLUTION</span>
              <span className="kicker-sep">•</span>
              <span className="kicker-label">INITIATE CONTACT</span>
            </div>

            <h2 className="contact-headline" id="contact-title">
              LET&apos;S BUILD SOMETHING <span className="highlight-name">SIGNIFICANT</span>
            </h2>

            <p className="contact-subhead">
              Actively seeking technical internships and engineering roles in applied ML, Python backend systems, and security analytics. Whether you have an engineering role to discuss, want to review my code, or explore a collaboration — reach out directly.
            </p>

            {/* Direct 1-Click Email Card */}
            <div className="copy-email-card">
              <span className="card-kicker">DIRECT EMAIL ACCESS</span>
              <div className="email-action-row">
                <a
                  href="mailto:sahithm2006@gmail.com"
                  className="email-string email-mailto-link"
                  id="email-address"
                  title="Click to compose email to sahithm2006@gmail.com"
                >
                  sahithm2006@gmail.com
                </a>

                <div className="email-buttons-cluster">
                  <button
                    className={`btn-copy-email ${isCopied ? 'copied' : ''}`}
                    id="btn-copy-email"
                    aria-label={isCopied ? 'Email address copied' : 'Copy email address to clipboard'}
                    type="button"
                    onClick={copyEmail}
                  >
                    <span className="copy-icon" aria-hidden="true">{isCopied ? '✓' : '📋'}</span>
                    <span className="copy-text">{isCopied ? 'Copied!' : 'Copy'}</span>
                  </button>

                  <a
                    href="mailto:sahithm2006@gmail.com"
                    className="btn-open-email"
                    id="btn-open-email"
                    title="Open in your default email client"
                    aria-label="Open email client"
                  >
                    <span className="open-icon" aria-hidden="true">↗</span>
                    <span className="open-text">Send</span>
                  </a>
                </div>
              </div>
              {copyFeedback && (
                <span className="copy-feedback" id="copy-feedback" aria-live="polite">
                  {copyFeedback}
                </span>
              )}
            </div>

            {/* Academic & Social Badges */}
            <div className="contact-meta-group">
              <div className="meta-badge">
                <span className="meta-icon" aria-hidden="true">📍</span>
                <span>Saveetha Engineering College (Autonomous), Chennai</span>
              </div>

              <div className="social-links-row">
                <a
                  href="https://github.com/SahithM2006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-chip"
                  title="Explore Sahith's GitHub Profile"
                >
                  <span>GitHub</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/sahith-m-sahith518"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-chip"
                  title="Connect with Sahith on LinkedIn"
                >
                  <span>LinkedIn</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Pre-filled Email Dispatch Form */}
          <div className="contact-form-col">
            <div className="form-wrapper">
              <div className="form-header-badge">
                <span className="form-kicker-dot" />
                <h3 className="form-title">Send a Direct Message</h3>
              </div>
              <p className="form-lead">
                Fill out the details below to dispatch a message directly to my inbox via your preferred mail client.
              </p>

              <form className="contact-form" id="contact-form" noValidate onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="form-name">
                    Your Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="form-name"
                    required
                    placeholder="Engineering Lead / Recruiter / Collaborator"
                    autoComplete="name"
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? "form-name-error" : undefined}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (formErrors.name) setFormErrors({ ...formErrors, name: null });
                    }}
                  />
                  {formErrors.name && (
                    <span className="field-error" id="form-name-error" role="alert">
                      {formErrors.name}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="form-email">
                    Your Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="form-email"
                    required
                    placeholder="name@organization.com"
                    autoComplete="email"
                    aria-invalid={!!formErrors.email}
                    aria-describedby={formErrors.email ? "form-email-error" : undefined}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (formErrors.email) setFormErrors({ ...formErrors, email: null });
                    }}
                  />
                  {formErrors.email && (
                    <span className="field-error" id="form-email-error" role="alert">
                      {formErrors.email}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="form-message">
                    Project / Role Details <span className="required">*</span>
                  </label>
                  <textarea
                    id="form-message"
                    rows="4"
                    required
                    placeholder="Describe the opportunity, engineering project, or question you would like to discuss..."
                    aria-invalid={!!formErrors.message}
                    aria-describedby={formErrors.message ? "form-message-error" : undefined}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (formErrors.message) setFormErrors({ ...formErrors, message: null });
                    }}
                  />
                  {formErrors.message && (
                    <span className="field-error" id="form-message-error" role="alert">
                      {formErrors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-submit-message"
                  id="btn-submit-message"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Preparing...' : 'Compose Email →'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>

                {formNotice && (
                  <div className="form-dispatch-notice" id="form-status" aria-live="polite">
                    <div className="notice-icon">✓</div>
                    <div className="notice-content">
                      <p className="notice-text">{formNotice.message}</p>
                      <a href={formNotice.mailtoUrl} className="notice-action-link">
                        Click here if your email client didn't open automatically &rarr;
                      </a>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
