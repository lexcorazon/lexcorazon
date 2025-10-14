import React from 'react';
import ReviewCard from './ReviewCard';


export default function Reviews({ reviewsData }) {
  return (
    <section
      id="reviews"
      style={{
        width: '100%',
        background: '#000',
        color: '#fff',
        padding: '120px 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        className="reviews-container no-scrollbar"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          overflowX: 'auto',
          gap: 24,
          padding: '0 16px 40px 16px',
        }}
      >
        {reviewsData.map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
      </div>

      <style>{`
        .reviews-container {
          scroll-snap-type: x mandatory;
        }
        @media (max-width: 768px) {
          .reviews-container {
            justify-content: flex-start;
          }
        }
        @media (min-width: 769px) {
          .reviews-container {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
