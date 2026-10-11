import React, { useState, useMemo } from 'react';
import { CERTIFICATIONS } from '../data-store.js';

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewCert, setPreviewCert] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const categories = [
    { id: 'all', label: 'All Credentials', count: CERTIFICATIONS.length },
    { id: 'coursera', label: 'Coursera', count: CERTIFICATIONS.filter((c) => c.category === 'coursera').length },
    { id: 'skillup', label: 'Simplilearn SkillUp', count: CERTIFICATIONS.filter((c) => c.category === 'skillup').length },
    { id: 'ai', label: 'Deep Learning & AI', count: CERTIFICATIONS.filter((c) => c.discipline === 'ai').length },
    { id: 'cloud-db', label: 'Cloud & Databases', count: CERTIFICATIONS.filter((c) => ['security', 'data'].includes(c.discipline)).length }
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
            <span className="section-kicker">ACADEMIC &amp; INDUSTRY RECOGNITION</span>
          </div>
          <h2 className="section-title" id="certifications-title">Certifications &amp; Courses</h2>
          <p className="section-subtitle">
            Verified course completions and industry credentials spanning PyTorch deep learning, cloud security, and relational database systems.
          </p>

          {/* Filter & Search Bar */}
          <div className="cert-toolbar-row">
            <div className="cert-filters-bar" role="tablist" aria-label="Filter certifications">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`cert-filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
                  role="tab"
                  aria-selected={activeFilter === cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>

            <div className="cert-search-box">
              <span className="cert-search-icon" aria-hidden="true">⌕</span>
              <input
                type="text"
                className="cert-search-input"
                placeholder="Search certifications (e.g. PyTorch, Cloud Security)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search certifications"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="cert-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="certifications-grid">
          {filteredCerts.map((cert) => {
            const isSpecialization = cert.badge.includes('Specialization');
            return (
              <article
                key={cert.id}
                className={`cert-card ${cert.highlight ? 'cert-highlight' : ''} ${isSpecialization ? 'cert-specialization' : ''}`}
              >
                <div className="cert-card-header">
                  <div className="cert-platform-strip">
                    <span className="cert-platform-badge">{cert.platform.toUpperCase()}</span>
                    <span className="cert-type-pill">{cert.badge}</span>
                  </div>
                  <h3 className="cert-card-title">{cert.title}</h3>
                </div>

                <div className="cert-card-body">
                  <p className="cert-desc">{cert.desc}</p>

                  <div className="cert-meta-details">
                    <div className="cert-meta-row">
                      <span className="cert-meta-label">Issuer / Org:</span>
                      <strong className="cert-meta-val">{cert.issuer}</strong>
                    </div>
                    <div className="cert-meta-row">
                      <span className="cert-meta-label">Completed:</span>
                      <span className="cert-meta-val">{cert.date}</span>
                    </div>
                    {cert.credentialId && (
                      <div className="cert-meta-row">
                        <span className="cert-meta-label">Credential ID:</span>
                        <div className="cert-id-badge">
                          <code>{cert.credentialId}</code>
                          <button
                            type="button"
                            className="btn-copy-id"
                            title="Copy Credential ID"
                            onClick={() => handleCopy(cert.credentialId, cert.id)}
                          >
                            {copiedId === cert.id ? 'Copied ✓' : 'Copy'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="cert-card-actions">
                  {cert.fileUrl && (
                    <button
                      type="button"
                      className="btn-cert-view"
                      onClick={() => setPreviewCert(cert)}
                    >
                      <span>View Certificate</span>
                      <span className="action-arrow">↗</span>
                    </button>
                  )}

                  {cert.verifyUrl ? (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cert-verify"
                      title="Verify authentic credential on issuing platform"
                    >
                      <span>Verify on Platform</span>
                      <span className="action-arrow">↗</span>
                    </a>
                  ) : (
                    cert.fileUrl && (
                      <a
                        href={cert.fileUrl}
                        download
                        className="btn-cert-download"
                        title="Download certificate PDF"
                      >
                        <span>Download PDF</span>
                        <span className="action-arrow">↓</span>
                      </a>
                    )
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {filteredCerts.length === 0 && (
          <div className="cert-empty-state">
            <span className="cert-empty-icon">🛡️</span>
            <h4>No certifications matched your filter</h4>
            <p>Try clearing your search query or selecting "All Credentials".</p>
            <button
              type="button"
              className="btn-cert-reset"
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

      {/* Interactive Certificate Preview Modal */}
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
