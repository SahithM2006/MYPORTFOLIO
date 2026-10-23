import React, { useState, useRef } from 'react';

export default function Contact() {
  const [copyFeedback, setCopyFeedback] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0, active: false });
  const contactRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!contactRef.current) return;
    const rect = contactRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPointerPos({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setPointerPos((prev) => ({ ...prev, active: false }));
  };

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
        .catch(() => {
          fallbackCopy(email, markCopied);
        });
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
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Please provide a valid email address.';
    if (!formData.message.trim() || formData.message.trim().length < 5) errs.message = 'Please provide a message (minimum 5 characters).';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setFormStatus('Sending message...');

    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus('✓ Message sent successfully! Thank you for reaching out.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 5000);
    }, 800);
  };

  return (
    <section
      ref={contactRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="contact-section motion-finale-section is-in-view"
      id="contact"
      aria-labelledby="contact-title"
    >
      {/* Oversized Cinematic Typography Watermark */}
      <div className="section-bg-watermark watermark-contact" aria-hidden="true">09 // TRANSMIT</div>

      {/* Large Kinetic Orbital Aura & Sonar Radar in Background */}
      <div className="contact-kinetic-aura" id="contact-kinetic-aura" aria-hidden="true">
        <div className="aura-orbit aura-orbit-1"></div>
        <div className="aura-orbit aura-orbit-2"></div>
        <div className="aura-center-beacon"></div>
        <div className="radar-sweep-beam"></div>
        {pointerPos.active && (
          <div
            className="radar-pointer-tracker"
            style={{
              left: `${pointerPos.x}px`,
              top: `${pointerPos.y}px`
            }}
          >
            <span className="tracker-ping"></span>
            <span className="tracker-coord">SIGNAL LOCK</span>
          </div>
        )}
      </div>

      <div className="contact-container">
        <div className="contact-split-grid">
          {/* Left Column: Big Invitation & Direct Email */}
          <div className="contact-intro-col">
            <h2 className="contact-headline" id="contact-title">
              <span className="word-mask"><span className="word-reveal word-c1">GOT</span></span>{' '}
              <span className="word-mask"><span className="word-reveal word-c2">SOMETHING</span></span>{' '}
              <span className="word-mask"><span className="word-reveal word-c3">INTERESTING</span></span>{' '}
              <span className="word-mask"><span className="word-reveal word-c4 highlight-name">IN MIND?</span></span>
            </h2>
            <p className="contact-subhead">
              Actively seeking technical internships and roles in applied ML, Python backends, and security systems. Whether you have an engineering role to discuss, want to review my code, or wish to collaborate — reach out anytime.
            </p>

            {/* 1-Click Copy Email Card */}
            <div className="copy-email-card">
              <span className="card-kicker">DIRECT EMAIL</span>
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
              {copyFeedback && <span className="copy-feedback" id="copy-feedback" aria-live="polite">{copyFeedback}</span>}
            </div>

            {/* Academic & Social Badges */}
            <div className="contact-meta-group">
              <div className="meta-badge">
                <span className="meta-icon" aria-hidden="true">🏛️</span>
                <span>Saveetha Engineering College (Autonomous), Chennai</span>
              </div>
              <div className="social-links-row">
                <a href="https://github.com/SahithM2006" target="_blank" rel="noopener noreferrer" className="social-chip" title="Explore Sahith's GitHub Profile">
                  <span>GitHub</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/sahith-m-sahith518" target="_blank" rel="noopener noreferrer" className="social-chip" title="Connect with Sahith on LinkedIn">
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

          {/* Right Column: Validated Message Form */}
          <div className="contact-form-col">
            <div className="form-wrapper">
              <h3 className="form-title">Send a Message</h3>
              <form className="contact-form" id="contact-form" noValidate onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="form-name">Your Name <span className="required">*</span></label>
                  <input
                    type="text"
                    id="form-name"
                    required
                    placeholder="Guest Name / Collaborator"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {formErrors.name && <span className="field-error" id="form-name-error">{formErrors.name}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="form-email">Your Email <span className="required">*</span></label>
                  <input
                    type="email"
                    id="form-email"
                    required
                    placeholder="name@domain.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {formErrors.email && <span className="field-error" id="form-email-error">{formErrors.email}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="form-message">Your Message <span className="required">*</span></label>
                  <textarea
                    id="form-message"
                    rows="4"
                    required
                    placeholder="Tell me about your idea, research question, or project inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                  {formErrors.message && <span className="field-error" id="form-message-error">{formErrors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary btn-submit-full" id="btn-submit-message" disabled={isSubmitting}>
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
                {formStatus && <div className="form-status" id="form-status" aria-live="polite" style={{ marginTop: '12px' }}>{formStatus}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
