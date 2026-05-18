import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { authAPI } from '../api/client';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [mode, setMode] = useState('login'); // 'login', 'forgot', 'otp', 'reset'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const res = await authAPI.login(email, password);

      login(res.data);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    const isResend = mode === 'otp';
    if (isResend) {
      setResending(true);
    } else {
      setLoading(true);
    }
    try {
      setError('');
      setSuccess('');
      await authAPI.forgotPassword(email);
      setMode('otp');
      setSuccess(isResend ? 'OTP resent successfully to your email!' : 'OTP sent to your email');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please check your email.');
    } finally {
      if (isResend) {
        setResending(false);
      } else {
        setLoading(false);
      }
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      await authAPI.verifyOTP(email, otp);
      setMode('reset');
      setSuccess('OTP verified. Set your new password.');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      await authAPI.resetPassword(email, otp, newPassword);
      setMode('login');
      setSuccess('Password reset successfully. Please login.');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const res = await authAPI.loginWithGoogle(credentialResponse.credential);

      login(res.data);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (mode) {
      case 'forgot':
        return (
          <form onSubmit={handleForgotPassword} className="flex flex-col gap-4 mb-4">
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
            <button 
              type="submit" 
              disabled={loading}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-text-main text-bg-base hover:bg-text-main/90 h-10 px-4 py-2 w-full mt-2"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
            <button 
              type="button"
              onClick={() => setMode('login')}
              className="text-xs text-text-muted hover:text-text-main transition-colors text-center"
            >
              Back to login
            </button>
          </form>
        );
      case 'otp':
        return (
          <form onSubmit={handleVerifyOTP} className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-sm font-medium text-text-main">Enter 6-digit OTP</label>
              <input 
                type="text" 
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="flex h-10 w-full rounded-md border border-border-subtle bg-bg-base px-3 py-2 text-center text-lg font-bold tracking-widest text-text-main ring-offset-bg-surface placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="000000"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-text-main text-bg-base hover:bg-text-main/90 h-10 px-4 py-2 w-full mt-2"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button 
              type="button"
              disabled={resending}
              onClick={() => handleForgotPassword()}
              className="text-xs text-text-muted hover:text-text-main transition-colors text-center disabled:opacity-50 disabled:pointer-events-none"
            >
              {resending ? 'Resending...' : 'Resend OTP'}
            </button>
          </form>
        );
      case 'reset':
        return (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-sm font-medium text-text-main">New Password</label>
              <input 
                type="password" 
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="flex h-10 w-full rounded-md border border-border-subtle bg-bg-base px-3 py-2 text-sm text-text-main ring-offset-bg-surface placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-sm font-medium text-text-main">Confirm Password</label>
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex h-10 w-full rounded-md border border-border-subtle bg-bg-base px-3 py-2 text-sm text-text-main ring-offset-bg-surface placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-text-main text-bg-base hover:bg-text-main/90 h-10 px-4 py-2 w-full mt-2"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        );
      default:
        return (
          <>
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
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-main">Password</label>
                  <button 
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs text-text-muted hover:text-text-main transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
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
          </>
        );
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'forgot': return 'Forgot Password';
      case 'otp': return 'Verify OTP';
      case 'reset': return 'Reset Password';
      default: return 'Welcome back';
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case 'forgot': return 'Enter your email to receive a password reset OTP.';
      case 'otp': return `We've sent a code to ${email}`;
      case 'reset': return 'Create a strong new password for your account.';
      default: return 'Login to your account to continue';
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full bg-bg-surface relative overflow-hidden py-10 px-4">
      {/* Vector Background Graphic */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="w-full max-w-[400px] bg-bg-surface border border-border-subtle rounded-xl shadow-sm p-8 relative z-10 flex flex-col">
        {/* Header */}
        <div className="flex flex-col space-y-1.5 text-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-text-main">
            {getTitle()}
          </h1>
          <p className="text-sm text-text-muted">
            {getSubtitle()}
          </p>
        </div>

        {error && <div className="mb-4 text-red-500 text-sm text-center font-medium bg-red-50/50 p-2 rounded-md">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-sm text-center font-medium bg-green-50/50 p-2 rounded-md">{success}</div>}

        {renderContent()}

        {mode === 'login' && (
          <div className="mt-6 text-center text-sm text-text-muted">
            Don't have an account? <Link to="/signup" className="text-text-main font-medium underline underline-offset-4 hover:text-text-main/80">Sign up</Link>
          </div>
        )}
      </div>

      {/* Terms */}
      <div className="mt-6 text-center text-[13px] text-text-muted leading-relaxed max-w-[360px] relative z-10 px-4">
        By continuing, you agree to our <Link to="/privacy-policy" className="underline underline-offset-4 hover:text-text-main">Privacy Policy</Link>.
      </div>
    </div>
  );
}

