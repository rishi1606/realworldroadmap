import React, { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    message: '',
    services: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions = [
    'Website Design',
    'UX Design',
    'Content Creation',
    'Strategy & Consulting',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceToggle = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', budget: '', message: '', services: [] });
  };

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 pt-10 md:pt-16 pb-2">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="inline-block text-xs font-medium tracking-wide uppercase text-text-muted border border-border-subtle rounded-full px-3 py-1 mb-3">
              Get in Touch
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-main">
              Connect With Us 👋
            </h1>
          </div>
          <p className="text-text-muted text-[15px] max-w-md leading-relaxed">
            Whether you're looking for more information, have a suggestion, or need help with something, we're here for you.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Left — Form Card */}
          <div className="border border-border-subtle rounded-xl bg-bg-surface p-6 md:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="block text-sm font-medium text-text-main">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Enter your name here..."
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full h-10 rounded-md border border-border-subtle bg-bg-base px-3 text-sm text-text-main placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="block text-sm font-medium text-text-main">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Enter your Email here..."
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-10 rounded-md border border-border-subtle bg-bg-base px-3 text-sm text-text-main placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                />
              </div>

              {/* Budget */}
              <div className="space-y-1.5">
                <label htmlFor="contact-budget" className="block text-sm font-medium text-text-main">
                  Budget
                </label>
                <input
                  id="contact-budget"
                  name="budget"
                  type="text"
                  placeholder="Enter the amount"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full h-10 rounded-md border border-border-subtle bg-bg-base px-3 text-sm text-text-main placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-sm font-medium text-text-main">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-border-subtle bg-bg-base px-3 py-2 text-sm text-text-main placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors resize-none"
                />
              </div>

              {/* Services */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-text-main">Services</p>
                <div className="grid grid-cols-2 gap-3">
                  {serviceOptions.map((service) => (
                    <label
                      key={service}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <div
                        onClick={() => handleServiceToggle(service)}
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                          formData.services.includes(service)
                            ? 'bg-text-main border-text-main'
                            : 'border-border-subtle bg-bg-base group-hover:border-text-muted'
                        }`}
                      >
                        {formData.services.includes(service) && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M8.5 2.5L3.8 7.5L1.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-text-muted group-hover:text-text-main transition-colors">
                        {service}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-11 rounded-md bg-text-main text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
              >
                {submitted ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.5 4.5L6.3 11.5L2.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right — Profile Card */}
          <div className="flex flex-col items-center gap-6">
            {/* Profile Image */}
            <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-sm border border-border-subtle">
              <img
                src="/contact-profile.png"
                alt="realworlddev.io Team"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-text-main shadow-sm border border-border-subtle">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Available for Hire
                </span>
              </div>
            </div>

            {/* Name & Role */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-text-main">realworlddev.io Team</h2>
              <p className="text-sm text-text-muted mt-0.5 flex items-center justify-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-text-muted/50"></span>
                Developers & Educators
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a href="#" className="text-text-muted hover:text-text-main transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* Dribbble */}
              <a href="#" className="text-text-muted hover:text-text-main transition-colors" aria-label="Dribbble">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-text-muted hover:text-text-main transition-colors" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              {/* GitHub */}
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-text-muted hover:text-text-main transition-colors" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
