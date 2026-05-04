import React, { useState, useEffect } from 'react';
import { FiStar } from 'react-icons/fi';
import { Button } from './Button';
import { reviewAPI } from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export function RatingBadge({ roadmapId, className = "mb-6", readonly = false }) {
  const { user, requireAuth } = useAuth();
  const [stats, setStats] = useState({ avgRating: 0, totalRatings: 0, hasRated: false });
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      if (roadmapId) {
        const { data } = await reviewAPI.getReviews(roadmapId);
        
        // Check if current user has already rated
        const userReview = user ? data.reviews.find(r => 
          r.user?._id === user._id || r.user === user._id
        ) : null;

        setStats({
          avgRating: data.avgRating,
          totalRatings: data.totalRatings,
          hasRated: !!userReview
        });
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [roadmapId, user]);

  const handleSubmit = async () => {
    if (!requireAuth()) return;
    
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await reviewAPI.submitReview(roadmapId, rating, comment);
      await fetchReviews();
      setShowModal(false);
      setRating(0);
      setComment('');
      toast.success('Review added successfully!');
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to submit review';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const isInteractive = !readonly && !stats.hasRated;

  return (
    <>
      <div 
        className={`flex items-center gap-2 w-fit rounded-lg transition-colors ${className} ${isInteractive ? 'cursor-pointer group hover:bg-bg-base p-1.5 -ml-1.5' : 'cursor-default p-1.5 -ml-1.5'}`}
        onClick={(e) => {
          if (readonly) return;
          e.preventDefault();
          e.stopPropagation();
          if (!stats.hasRated) {
            if (requireAuth()) {
              setShowModal(true);
            }
          }
        }}
      >
        <div className={`flex ${(stats.totalRatings === 0 && isInteractive) ? 'text-text-muted group-hover:text-yellow-400 transition-colors' : 'text-yellow-400'}`}>
          <FiStar className="w-5 h-5 fill-current" />
        </div>
        
        {stats.totalRatings === 0 ? (
          <span className={`font-bold text-sm ${isInteractive ? 'text-text-muted group-hover:text-brand transition-colors' : 'text-text-muted'}`}>
            {readonly ? 'No ratings' : 'Add Rating'}
          </span>
        ) : (
          <>
            <span className="font-bold text-text-main text-sm">
              {stats.avgRating}
            </span>
            <span className="text-text-muted text-sm font-medium">
              ({stats.totalRatings} {stats.totalRatings === 1 ? 'rating' : 'ratings'})
            </span>
            {isInteractive && (
              <span className="text-brand text-xs font-bold ml-2">
                Add rating
              </span>
            )}
          </>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-bg-surface w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 relative animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold mb-4">Rate this Roadmap</h2>
            
            <div className="flex gap-2 mb-6 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-yellow-400 focus:outline-none transition-transform hover:scale-110"
                >
                  <FiStar 
                    className="w-10 h-10" 
                    fill={(hoverRating || rating) >= star ? "currentColor" : "none"} 
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-text-muted mb-2">
                Leave a comment (optional)
              </label>
              <textarea
                className="w-full border border-border-subtle rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all resize-none"
                rows={4}
                placeholder="What did you think of this content?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium mb-4 text-center">{error}</p>
            )}

            <div className="flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setShowModal(false)} disabled={loading}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Rating'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
