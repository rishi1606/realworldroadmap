import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export function LoginModal() {
  const { login, setShowLoginModal, showLoginModal } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (showLoginModal) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      // Reset error when closing
      setError('');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [showLoginModal]);

  if (!showLoginModal) return null;

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      }, {
        withCredentials: true
      });

      login(res.data);
      setShowLoginModal(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.post('http://localhost:5000/api/auth/google', {
        credential: credentialResponse.credential,
      }, {
        withCredentials: true
      });

      login(res.data);
      setShowLoginModal(false);
    } catch (err) {
      console.error(err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-sans">
      <div
        className="fixed inset-0 z-0"
        onClick={() => !loading && setShowLoginModal(false)}
      ></div>
      <div className="bg-bg-surface w-full max-w-[400px] rounded-xl border border-border-subtle shadow-sm p-8 relative z-10 animate-in fade-in zoom-in-95 duration-200">

        {/* Close Button */}
        <button
          onClick={() => setShowLoginModal(false)}
          disabled={loading}
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center rounded-sm opacity-70 ring-offset-bg-surface transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-border-subtle focus:ring-offset-2 disabled:opacity-30"
        >
          <FiX className="w-4 h-4 text-text-muted" />
        </button>

        <div className="flex flex-col space-y-1.5 text-center mb-6 mt-2">
          <h2 className="text-2xl font-semibold tracking-tight text-text-main">
            Track Your Progress
          </h2>
          <p className="text-sm text-text-muted px-2">
            Login to save notes and pick up right where you left off.
          </p>
        </div>

        {error && <div className="mb-4 text-red-500 text-sm text-center font-medium bg-red-50/50 p-2 rounded-md">{error}</div>}

        <form onSubmit={handleEmailLogin} className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-sm font-medium text-text-main">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-10 w-full rounded-md border border-border-subtle bg-bg-base px-3 py-2 text-sm text-text-main ring-offset-bg-surface placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="m@example.com"
            />
          </div>
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-sm font-medium text-text-main">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex h-10 w-full rounded-md border border-border-subtle bg-bg-base px-3 py-2 text-sm text-text-main ring-offset-bg-surface placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-text-main text-bg-base hover:bg-text-main/90 h-10 px-4 py-2 w-full mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="relative mb-4 mt-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border-subtle"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-bg-surface px-2 text-text-muted">Or continue with</span>
          </div>
        </div>

        <div className="flex justify-center w-full mt-4 mb-2">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Login failed.')}
            width="336"
            shape="rectangular"
            theme="outline"
            text="continue_with"
            size="large"
          />
        </div>

        <div className="mt-6 text-center text-sm text-text-muted">
          Don't have an account? <Link onClick={() => setShowLoginModal(false)} to="/signup" className="text-text-main font-medium underline underline-offset-4 hover:text-text-main/80">Sign up</Link>
        </div>

      </div>
    </div>,
    document.body
  );
}
