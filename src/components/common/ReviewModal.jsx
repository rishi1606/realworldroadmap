import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiStar } from 'react-icons/fi';
import { reviewAPI } from '../../api/client';

export function ReviewModal({ roadmapId, roadmapTitle, user, isOpen, onClose, onReviewSuccess }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Fetch existing rating/comment when modal opens
  useEffect(() => {
    if (isOpen && user && roadmapId) {
      setError('');
      setLoading(true);
      reviewAPI.getMyRating(roadmapId)
        .then(res => {
          setRating(res.data.rating || 0);
          setComment(res.data.comment || '');
        })
        .catch(err => {
          console.error('Error fetching existing review:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setRating(0);
      setComment('');
      setError('');
    }
  }, [isOpen, user, roadmapId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const { data } = await reviewAPI.rate(roadmapId, rating, comment);
      if (onReviewSuccess) {
        onReviewSuccess(data);
      }
      onClose();
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(err.response?.data?.message || 'Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md font-sans">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative animate-in fade-in zoom-in-95 duration-200 border border-slate-200">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
          type="button"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center">
          <h3 className="text-[20px] font-bold text-slate-900 mb-1">Rate & Review</h3>
          <p className="text-[13px] text-slate-500 mb-6 text-center leading-relaxed">
            Share your thoughts on the <span className="font-semibold text-slate-700">"{roadmapTitle}"</span> roadmap.
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            {error && (
              <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 text-[13px] font-semibold text-center">
                {error}
              </div>
            )}

            {/* Stars Selector */}
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Your Rating</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-125 focus:outline-none cursor-pointer p-1"
                  >
                    <svg
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-slate-200 text-slate-300'
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Area */}
            <div className="flex flex-col gap-1.5 text-left w-full">
              <label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Comment / Feedback</label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="What did you learn? How can we make this roadmap better?"
                rows={4}
                maxLength={400}
                className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
              <div className="text-right text-[11px] text-slate-400 font-medium">
                {comment.length}/400 characters
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-[14px] h-10 px-4 py-2 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-bold text-[14px] h-10 px-4 py-2 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
