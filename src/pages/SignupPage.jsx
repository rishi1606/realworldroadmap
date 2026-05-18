import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { authAPI } from '../api/client';
import { useAuth } from '../context/AuthContext';

export function SignupPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      const res = await authAPI.register(name, email, password);

      login(res.data);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError('');
      
      const res = await authAPI.loginWithGoogle(credentialResponse.credential);

      login(res.data);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full bg-bg-surface relative overflow-hidden py-10 px-4">
      {/* Vector Background Graphic */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="w-full max-w-[400px] bg-bg-surface border border-border-subtle rounded-xl shadow-sm p-8 relative z-10 flex flex-col">
        {/* Header */}
        <div className="flex flex-col space-y-1.5 text-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-text-main">Create an account</h1>
          <p className="text-sm text-text-muted">
            Join us and track your roadmap progress
          </p>
        </div>

        {error && <div className="mb-4 text-red-500 text-sm text-center font-medium bg-red-50/50 p-2 rounded-md">{error}</div>}

        <form onSubmit={handleEmailSignup} className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-main">Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex h-10 w-full rounded-md border border-border-subtle bg-bg-base px-3 py-2 text-sm text-text-main ring-offset-bg-surface placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col gap-1.5">
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
          <div className="flex flex-col gap-1.5">
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border-subtle"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-bg-surface px-2 text-text-muted">Or continue with</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              setError('Google Signup failed.');
            }}
            shape="rectangular"
            theme="outline"
            text="signup_with"
            size="large"
            width="336"
          />
        </div>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm text-text-muted">
          Already have an account? <Link to="/login" className="text-text-main font-medium underline underline-offset-4 hover:text-text-main/80">Log in</Link>
        </div>
      </div>

      {/* Terms */}
      <div className="mt-6 text-center text-[13px] text-text-muted leading-relaxed max-w-[360px] relative z-10 px-4">
        By continuing, you agree to our <Link to="/privacy-policy" className="underline underline-offset-4 hover:text-text-main">Privacy Policy</Link>.
      </div>
    </div>
  );
}
