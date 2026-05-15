import React, { useState } from 'react';

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: '6px',
        border: '1px solid #e2e8f0',
        background: copied ? '#f0fdf4' : '#f8fafc',
        color: copied ? '#16a34a' : '#64748b',
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        if (!copied) {
          e.currentTarget.style.background = '#f1f5f9';
          e.currentTarget.style.borderColor = '#cbd5e1';
        }
      }}
      onMouseLeave={(e) => {
        if (!copied) {
          e.currentTarget.style.background = '#f8fafc';
          e.currentTarget.style.borderColor = '#e2e8f0';
        }
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export function SupportPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header Section */}
      <div className="max-w-[700px] mx-auto px-4 md:px-8 pt-10 md:pt-16 pb-2">
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-main)',
            marginBottom: '0',
          }}
        >
          Support the Project ❤️
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-[700px] mx-auto px-4 md:px-8 pb-16">

        {/* Why It Matters */}
        <div style={{ marginTop: '32px', marginBottom: '40px' }}>
          <h2
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: '16px',
            }}
          >
            Why It Matters
          </h2>
          <div
            style={{
              borderLeft: '2px solid var(--color-brand)',
              paddingLeft: '20px',
            }}
          >
            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: 'var(--color-text-muted)',
                marginBottom: '12px',
              }}
            >
              Hi! I'm the author and sole developer of this platform. For over a year I've been building TechPaths solo – no team, no investors. My goal is to create the best platform for real-world tech learning and career preparation.
            </p>
            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: 'var(--color-text-muted)',
                margin: 0,
              }}
            >
              If this project helped you level up your skills, prepare for an interview, or land a job — I'd be grateful for any donation. It's the best motivation to keep going!
            </p>
          </div>
        </div>

        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'var(--color-border-subtle)',
            marginBottom: '40px',
          }}
        />

        {/* Ways to Support */}
        <h2
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            marginBottom: '24px',
          }}
        >
          Ways to Support
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Buy Me a Coffee */}
          <div
            style={{
              border: '1px solid var(--color-border-subtle)',
              borderRadius: '12px',
              padding: '20px 24px',
              background: 'var(--color-bg-surface)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#FEF3C7',
                    color: '#92400E',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    letterSpacing: '0.02em',
                  }}
                >
                  ☕
                </span>
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--color-text-main)',
                  }}
                >
                  Buy Me a Coffee
                </span>
              </div>
              <a
                href="https://buymeacoffee.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border-subtle)',
                  background: 'var(--color-bg-surface)',
                  color: 'var(--color-text-main)',
                  fontSize: '13px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--color-bg-surface)';
                  e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                }}
              >
                Open BMC <ExternalLinkIcon />
              </a>
            </div>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                marginTop: '8px',
                marginBottom: 0,
              }}
            >
              One-time donation. Quick and easy for everyone.
            </p>
          </div>

          {/* Bank Card */}
          <div
            style={{
              border: '1px solid var(--color-border-subtle)',
              borderRadius: '12px',
              padding: '20px 24px',
              background: 'var(--color-bg-surface)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontSize: '16px' }}>💳</span>
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--color-text-main)',
                }}
              >
                Bank Card
              </span>
            </div>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                marginBottom: '16px',
                marginTop: 0,
              }}
            >
              Direct transfer to Visa card. Works from any country.
            </p>

            {/* Card Number */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                marginBottom: '10px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#2563eb',
                  background: '#eff6ff',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  letterSpacing: '0.02em',
                }}
              >
                Visa
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--color-text-main)',
                  letterSpacing: '0.04em',
                  flex: 1,
                }}
              >
                4196 7200 5539 1667
              </span>
              <CopyButton text="4196720055391667" />
            </div>

            {/* Card Holder */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  background: '#f1f5f9',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                Holder
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--color-text-main)',
                  letterSpacing: '0.02em',
                  flex: 1,
                }}
              >
                TECHPATHS DEVELOPER
              </span>
              <CopyButton text="TECHPATHS DEVELOPER" />
            </div>
          </div>

          {/* UPI (India) */}
          <div
            style={{
              border: '1px solid var(--color-border-subtle)',
              borderRadius: '12px',
              padding: '20px 24px',
              background: 'var(--color-bg-surface)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontSize: '16px' }}>🇮🇳</span>
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--color-text-main)',
                }}
              >
                UPI (India)
              </span>
            </div>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                marginBottom: '16px',
                marginTop: 0,
              }}
            >
              UPI payment. Best for users in India.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              {/* QR Code placeholder */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="#94a3b8" strokeWidth="2" fill="none"/>
                  <rect x="8" y="8" width="8" height="8" rx="1" fill="#94a3b8"/>
                  <rect x="28" y="4" width="16" height="16" rx="2" stroke="#94a3b8" strokeWidth="2" fill="none"/>
                  <rect x="32" y="8" width="8" height="8" rx="1" fill="#94a3b8"/>
                  <rect x="4" y="28" width="16" height="16" rx="2" stroke="#94a3b8" strokeWidth="2" fill="none"/>
                  <rect x="8" y="32" width="8" height="8" rx="1" fill="#94a3b8"/>
                  <rect x="28" y="28" width="4" height="4" rx="1" fill="#94a3b8"/>
                  <rect x="36" y="28" width="4" height="4" rx="1" fill="#94a3b8"/>
                  <rect x="28" y="36" width="4" height="4" rx="1" fill="#94a3b8"/>
                  <rect x="36" y="36" width="8" height="8" rx="1" fill="#94a3b8"/>
                </svg>
              </div>

              {/* UPI ID */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  flex: 1,
                  minWidth: '200px',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#7c3aed',
                    background: '#f5f3ff',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  UPI
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--color-text-main)',
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  techpaths@upi
                </span>
                <CopyButton text="techpaths@upi" />
              </div>
            </div>
          </div>

          {/* USDT Crypto */}
          <div
            style={{
              border: '1px solid var(--color-border-subtle)',
              borderRadius: '12px',
              padding: '20px 24px',
              background: 'var(--color-bg-surface)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontSize: '16px' }}>💰</span>
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--color-text-main)',
                }}
              >
                USDT (Crypto)
              </span>
            </div>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                marginBottom: '16px',
                marginTop: 0,
              }}
            >
              USDT cryptocurrency. TRC-20 network.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              {/* QR Code placeholder */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="#94a3b8" strokeWidth="2" fill="none"/>
                  <rect x="8" y="8" width="8" height="8" rx="1" fill="#94a3b8"/>
                  <rect x="28" y="4" width="16" height="16" rx="2" stroke="#94a3b8" strokeWidth="2" fill="none"/>
                  <rect x="32" y="8" width="8" height="8" rx="1" fill="#94a3b8"/>
                  <rect x="4" y="28" width="16" height="16" rx="2" stroke="#94a3b8" strokeWidth="2" fill="none"/>
                  <rect x="8" y="32" width="8" height="8" rx="1" fill="#94a3b8"/>
                  <rect x="28" y="28" width="4" height="4" rx="1" fill="#94a3b8"/>
                  <rect x="36" y="28" width="4" height="4" rx="1" fill="#94a3b8"/>
                  <rect x="28" y="36" width="4" height="4" rx="1" fill="#94a3b8"/>
                  <rect x="36" y="36" width="8" height="8" rx="1" fill="#94a3b8"/>
                </svg>
              </div>

              {/* Crypto Address */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  flex: 1,
                  minWidth: '200px',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#059669',
                    background: '#ecfdf5',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  TRC-20
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--color-text-main)',
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  TPdJx1TELHDgSCyiUAbtlS3x...
                </span>
                <CopyButton text="TPdJx1TELHDgSCyiUAbtlS3xYourFullAddressHere" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div
          style={{
            marginTop: '40px',
            padding: '16px 20px',
            borderRadius: '12px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-text-muted)',
              margin: 0,
              lineHeight: '1.6',
            }}
          >
            Every contribution, no matter how small, helps keep this project alive and free for everyone. Thank you! 🙏
          </p>
        </div>
      </div>
    </div>
  );
}
