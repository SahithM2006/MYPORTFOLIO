import React, { useState, useMemo, useEffect } from 'react';
import { CERTIFICATIONS } from '../data-store.js';

export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewCert, setPreviewCert] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Close modal on Escape
  useEffect(() => {
    if (!previewCert) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setPreviewCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewCert]);

  const categories = [
    { id: 'all', label: 'All Credentials', count: CERTIFICATIONS.length },
    {
      id: 'ai',
      label: 'Deep Learning & AI',
      count: CERTIFICATIONS.filter((c) => c.discipline === 'ai').length
    },
    {
      id: 'coursera',
      label: 'Coursera (Packt)',
      count: CERTIFICATIONS.filter((c) => c.category === 'coursera').length
    },
    {
      id: 'security',
      label: 'Cloud & Security',
      count: CERTIFICATIONS.filter((c) => c.discipline === 'security').length
    },
    {
      id: 'data-prog',
      label: 'Databases & Programming',
      count: CERTIFICATIONS.filter((c) => ['data', 'programming'].includes(c.discipline)).length
    }
  ];

  const filteredCerts = useMemo(() => {
    return CERTIFICATIONS.filter((cert) => {
      let matchesCat = activeCategory === 'all';
      if (activeCategory === 'ai') matchesCat = cert.discipline === 'ai';
      else if (activeCategory === 'coursera') matchesCat = cert.category === 'coursera';
      else if (activeCategory === 'security') matchesCat = cert.discipline === 'security';
      else if (activeCategory === 'data-prog') matchesCat = ['data', 'programming'].includes(cert.discipline);

      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        cert.title.toLowerCase().includes(q) ||
        cert.platform.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        (cert.credentialId && cert.credentialId.toLowerCase().includes(q));

      return matchesCat && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const handleCopyId = (text, id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section className="certifications-section" id="certifications" aria-labelledby="certifications-title">
      <div className="certifications-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker-strip">
            <span className="section-kicker-dot" />
            <span className="section-kicker">STAGE 04 // EVOLUTION &bull; VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="section-title" id="certifications-title">
            Certifications &amp; <span className="accent-text">Technical Credentials</span>
          </h2>
          <p className="section-subtitle">
            Verified course completions and specializations across PyTorch deep learning,
            enterprise cloud security, relational databases, and sequential neural architectures.
          </p>
        </div>

        {/* Toolbar: Category Filters & Search */}
        <div className="cert-toolbar">
          <div className="cert-filter-tabs" role="tablist" aria-label="Filter certifications">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`cert-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="cert-count-badge">{cat.count}</span>
              </button>
            ))}
          </div>

          <div className="cert-search-wrap">
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              className="cert-search-input"
              placeholder="Search title, platform, credential ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter credentials by keyword"
            />
            {searchQuery && (
              <button
                type="button"
                className="cert-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear keyword search"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="cert-cards-grid" role="list">
          {filteredCerts.map((cert) => {
            const hasVerifyUrl = Boolean(cert.verifyUrl);
            const hasFile = Boolean(cert.fileUrl);

            return (
              <article key={cert.id} className="cert-card" role="listitem">
                <div className="cert-card-topbar">
                  <div className="cert-platform-wrap">
                    <span className="cert-platform-tag">{cert.platform}</span>
                    <span className="cert-issuer-dot">&bull;</span>
                    <span className="cert-issuer-name">{cert.issuer}</span>
                  </div>
                  <span className="cert-badge-tag">{cert.badge}</span>
                </div>

                <h3 className="cert-card-title">{cert.title}</h3>
                <p className="cert-card-desc">{cert.desc}</p>

                {/* Metadata Strip */}
                <div className="cert-meta-strip">
                  <div className="cert-date-info">
                    <span className="meta-icon" aria-hidden="true">&#128197;</span>
                    <span>Completed: <strong>{cert.date}</strong></span>
                  </div>

                  {cert.credentialId && (
                    <div className="cert-id-info">
                      <span className="meta-lbl">ID:</span>
                      <code className="cert-code">{cert.credentialId}</code>
                      <button
                        type="button"
                        className="btn-cert-copy"
                        onClick={() => handleCopyId(cert.credentialId, cert.id)}
                        title="Copy Credential ID"
                      >
                        {copiedId === cert.id ? 'Copied ✓' : 'Copy'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Verified Action Buttons */}
                <div className="cert-actions-bar">
                  {hasVerifyUrl ? (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cert-action verify"
                      title="Verify credential on issuing platform"
                    >
                      <span>Verify Credential</span>
                      <span className="btn-arrow" aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className="cert-offline-badge" title="Verification verified via local certificate file">
                      <span>Offline Verified</span>
                    </span>
                  )}

                  {hasFile && (
                    <button
                      type="button"
                      className="btn-cert-action view"
                      onClick={() => setPreviewCert(cert)}
                      title="View certificate document preview"
                    >
                      <span>View Document</span>
                      <span className="btn-arrow" aria-hidden="true">↗</span>
                    </button>
                  )}

                  {hasFile && (
                    <a
                      href={cert.fileUrl}
                      download
                      className="btn-cert-action download"
                      title="Download verified certificate file"
                    >
                      <span>Download</span>
                      <span className="btn-arrow" aria-hidden="true">↓</span>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {filteredCerts.length === 0 && (
          <div className="cert-empty-state">
            <span className="empty-icon" aria-hidden="true">&empty;</span>
            <h4>No credentials match &ldquo;{searchQuery}&rdquo;</h4>
            <p>Try resetting the category filter or searching for another term.</p>
            <button
              type="button"
              className="btn-cert-reset"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* In-Page Certificate Document Viewer Modal */}
      {previewCert && (
        <div
          className="cert-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          onClick={() => setPreviewCert(null)}
        >
          <div className="cert-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="cert-modal-header">
              <div className="cert-modal-title-wrap">
                <span className="cert-modal-platform">{previewCert.platform}</span>
                <h3 id="cert-modal-title" className="cert-modal-title">
                  {previewCert.title}
                </h3>
              </div>
              <button
                type="button"
                className="cert-modal-close"
                onClick={() => setPreviewCert(null)}
                aria-label="Close document preview"
              >
                &times;
              </button>
            </div>

            <div className="cert-modal-body">
              {previewCert.fileUrl.endsWith('.png') ? (
                <div className="cert-modal-image-wrap">
                  <img
                    src={previewCert.fileUrl}
                    alt={previewCert.title}
                    className="cert-modal-image"
                    loading="lazy"
                  />
                </div>
              ) : (
                <iframe
                  src={`${previewCert.fileUrl}#view=FitH`}
                  title={previewCert.title}
                  className="cert-modal-iframe"
                />
              )}
            </div>

            <div className="cert-modal-footer">
              <div className="cert-modal-meta">
                <span>Completed: <strong>{previewCert.date}</strong></span>
                {previewCert.credentialId && (
                  <span>ID: <code>{previewCert.credentialId}</code></span>
                )}
              </div>
              <div className="cert-modal-actions">
                <a
                  href={previewCert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-modal-open"
                >
                  Open in New Tab ↗
                </a>
                <a
                  href={previewCert.fileUrl}
                  download
                  className="btn-modal-download"
                >
                  Download File ↓
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
