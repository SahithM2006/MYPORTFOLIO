import React, { useState, useMemo, useEffect } from 'react';
import { CERTIFICATIONS } from '../data-store.js';

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewCert, setPreviewCert] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    if (!previewCert) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setPreviewCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewCert]);

  const categories = [
    { id: 'all', label: 'All Certifications', count: CERTIFICATIONS.length },
    { id: 'coursera', label: 'Coursera', count: CERTIFICATIONS.filter((c) => c.category === 'coursera').length },
    { id: 'skillup', label: 'Simplilearn SkillUp', count: CERTIFICATIONS.filter((c) => c.category === 'skillup').length },
    { id: 'ai', label: 'Deep Learning & AI', count: CERTIFICATIONS.filter((c) => c.discipline === 'ai').length },
    { id: 'cloud-db', label: 'Cloud & Database', count: CERTIFICATIONS.filter((c) => ['security', 'data'].includes(c.discipline)).length }
  ];

  const filteredCerts = useMemo(() => {
    return CERTIFICATIONS.filter((cert) => {
      const matchesFilter =
        activeFilter === 'all' ||
        cert.category === activeFilter ||
        cert.discipline === activeFilter ||
        (activeFilter === 'cloud-db' && ['security', 'data'].includes(cert.discipline));

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        cert.title.toLowerCase().includes(query) ||
        cert.platform.toLowerCase().includes(query) ||
        cert.issuer.toLowerCase().includes(query) ||
        (cert.credentialId && cert.credentialId.toLowerCase().includes(query));

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, searchQuery]);

  const handleCopy = (text, id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      });
    }
  };

  return (
    <section className="certifications-section" id="certifications" aria-labelledby="certifications-title">
      <div className="certifications-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker-strip">
            <span className="section-kicker-dot" />
            <span className="section-kicker">ACADEMIC &amp; INDUSTRY CREDENTIALS</span>
          </div>
          <h2 className="section-title" id="certifications-title">Certifications &amp; Courses</h2>
          <p className="section-subtitle">
            A chronological timeline of verified course completions and technical credentials across PyTorch deep learning, cloud security architectures, and relational database systems.
          </p>

          {/* Minimal Filter & Search Toolbar */}
          <div className="cert-timeline-toolbar">
            <div className="cert-timeline-filters" role="tablist" aria-label="Filter certifications">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`cert-timeline-filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
                  role="tab"
                  aria-selected={activeFilter === cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className="filter-count">{cat.count}</span>
                </button>
              ))}
            </div>

            <div className="cert-timeline-search">
              <span className="search-glyph" aria-hidden="true">⌕</span>
              <input
                type="text"
                className="cert-timeline-input"
                placeholder="Search credential or issuer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search certifications"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Vertically Arranged Timeline / Numbered Entries */}
        <div className="cert-timeline-list" role="list">
          {filteredCerts.map((cert, index) => {
            const itemNumber = String(index + 1).padStart(2, '0');
            const hasVerifyLink = Boolean(cert.verifyUrl);
            const isSpecialization = cert.badge && cert.badge.includes('Specialization');

            return (
              <article
                key={cert.id}
                className={`cert-timeline-row ${cert.highlight ? 'highlighted-entry' : ''} ${isSpecialization ? 'specialization-entry' : ''}`}
                role="listitem"
              >
                {/* Timeline Column: Numbered Entry & Slim Node Track */}
                <div className="cert-timeline-rail" aria-hidden="true">
                  <span className="cert-timeline-index">{itemNumber}</span>
                  <div className="cert-timeline-node-wrap">
                    <span className="cert-timeline-node" />
                    <span className="cert-timeline-line" />
                  </div>
                </div>

                {/* Primary Content Container */}
                <div className="cert-timeline-main">
                  {/* Top Row: Meta Tags & Date */}
                  <div className="cert-timeline-meta-header">
                    <div className="cert-timeline-badges">
                      <span className={`cert-platform-pill platform-${cert.category}`}>
                        {cert.platform}
                      </span>
                      <span className="cert-issuer-badge">
                        {cert.issuer}
                      </span>
                      {cert.badge && (
                        <span className="cert-type-badge">
                          {cert.badge}
                        </span>
                      )}
                    </div>

                    <div className="cert-timeline-date-block">
                      <span className="cert-date-icon" aria-hidden="true">📅</span>
                      <span className="cert-date-text">{cert.date}</span>
                    </div>
                  </div>

                  {/* Course Name with High-Contrast Typography */}
                  <div className="cert-timeline-heading-wrap">
                    <h3 className="cert-timeline-course-title">
                      {cert.title}
                    </h3>
                  </div>

                  {/* Course Abstract / Description */}
                  <p className="cert-timeline-description">
                    {cert.desc}
                  </p>

                  {/* Bottom Strip: Credential Verification & Document Actions */}
                  <div className="cert-timeline-footer-row">
                    <div className="cert-credential-id-wrap">
                      {cert.credentialId && (
                        <div className="cert-id-tag">
                          <span className="cert-id-label">Credential ID:</span>
                          <code>{cert.credentialId}</code>
                          <button
                            type="button"
                            className="cert-id-copy"
                            onClick={() => handleCopy(cert.credentialId, cert.id)}
                            title="Copy credential ID to clipboard"
                          >
                            {copiedId === cert.id ? 'Copied ✓' : 'Copy'}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="cert-timeline-links">
                      {hasVerifyLink && (
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cert-link-action verify-link"
                          title="Verify credential on issuing platform"
                        >
                          <span>Verify Credential</span>
                          <span className="cert-link-arrow">↗</span>
                        </a>
                      )}

                      {cert.fileUrl && (
                        <button
                          type="button"
                          className="cert-link-action view-link"
                          onClick={() => setPreviewCert(cert)}
                          title="View certificate preview"
                        >
                          <span>View Certificate</span>
                          <span className="cert-link-arrow">↗</span>
                        </button>
                      )}

                      {cert.fileUrl && (
                        <a
                          href={cert.fileUrl}
                          download
                          className="cert-link-action download-link"
                          title={cert.fileUrl.endsWith('.png') ? 'Download certificate Image' : 'Download certificate PDF'}
                        >
                          <span>{cert.fileUrl.endsWith('.png') ? 'Download Image' : 'Download PDF'}</span>
                          <span className="cert-link-arrow">↓</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCerts.length === 0 && (
          <div className="cert-timeline-empty">
            <span className="empty-glyph" aria-hidden="true">🛡️</span>
            <h4>No credentials match your filter</h4>
            <p>Try resetting the search query or selecting "All Certifications".</p>
            <button
              type="button"
              className="btn-reset-timeline-filter"
              onClick={() => {
                setActiveFilter('all');
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
                <span className="cert-platform-badge">{previewCert.platform}</span>
                <h3 id="cert-modal-title" className="cert-modal-title">
                  {previewCert.title}
                </h3>
              </div>
              <button
                type="button"
                className="cert-modal-close"
                onClick={() => setPreviewCert(null)}
                aria-label="Close certificate preview"
              >
                ✕
              </button>
            </div>

            <div className="cert-modal-body">
              {previewCert.fileUrl.endsWith('.png') ? (
                <div className="cert-modal-img-wrap">
                  <img src={previewCert.fileUrl} alt={previewCert.title} className="cert-modal-img" />
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
