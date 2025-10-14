import React, { useState } from 'react';

export default function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const MAX_HEIGHT = 180;

  return (
    <div
      style={{
        flex: '0 0 auto',
        width: 320,
        minHeight: 300,
        background: '#fff',
        color: '#000',
        borderRadius: 12,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
        scrollSnapAlign: 'center',
        position: 'relative',
      }}
    >
      <div style={{ maxHeight: expanded ? 'none' : MAX_HEIGHT, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <p style={{ fontStyle: 'italic', fontSize: 18, lineHeight: 1.6 }}>
          “{review.text}”
        </p>
      </div>

      {review.text.length > 200 && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            marginTop: 12,
            background: 'none',
            border: 'none',
            color: '#000',
            fontWeight: 600,
            cursor: 'pointer',
            textAlign: 'right',
          }}
        >
          {expanded ? 'Ver menos' : 'Ver más'}
        </button>
      )}

      <footer style={{ fontWeight: 700, color: '#333', fontSize: 16, textAlign: 'right', marginTop: 16 }}>
        — {review.name}
      </footer>
    </div>
  );
}
