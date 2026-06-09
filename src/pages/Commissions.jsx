import React, { useState } from 'react';
import commissionShowcase from '../assets/artwork/commission-showcase.png';
import { CONFIG } from '../config';

export default function Commissions() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    style: 'Classic Thuluth',
    size: '',
    description: '',
  });

  const [formStatus, setFormStatus] = useState('IDLE'); // IDLE, SENDING, SUCCESS, ERROR

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setFormStatus('ERROR');
      return;
    }

    setFormStatus('SENDING');

    // Construct the WhatsApp message with form details
    const whatsappText = `New Commission Inquiry:\n\n` +
      `• Name: ${formData.name}\n` +
      `• Email: ${formData.email}\n` +
      `• Desired Style: ${formData.style}\n` +
      `• Size/Medium: ${formData.size || 'Not Specified'}\n` +
      `• Project Description: ${formData.description || 'Not Specified'}`;

    const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;

    // Mock network request before redirecting/opening WhatsApp
    setTimeout(() => {
      setFormStatus('SUCCESS');
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      // Reset form
      setFormData({
        name: '',
        email: '',
        style: 'Classic Thuluth',
        size: '',
        description: '',
      });
    }, 1200);
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-16 pb-section-gap">
      {/* Header Section */}
      <div className="mb-24 max-w-3xl">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6">
          Bespoke Commissions
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Collaborate on a unique piece of art tailored to your space and story. Each stroke is a deliberate meditation. You can inquire by submitting the form below, or reach out directly via Instagram Direct Message (DM) to initiate your project.
        </p>
      </div>

      {/* Main Commission Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
        {/* Image Side */}
        <div className="md:col-span-5 order-2 md:order-1">
          <div className="relative group overflow-hidden border border-primary/5">
            <img
              src={commissionShowcase}
              alt="Finished Calligraphy Commission"
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-[1.02]"
            />
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">
              Recent Project
            </span>
            <p className="font-label-md text-label-md text-on-surface-variant">
              Surah Al-Ikhlas, Traditional Thuluth Script. Ink on Ahar Paper. 120cm x 80cm.
            </p>
          </div>
        </div>

        {/* Form Side */}
        <div className="md:col-span-7 order-1 md:order-2 bg-surface-container-low p-8 md:p-12">
          {formStatus === 'SUCCESS' ? (
            <div className="flex flex-col items-center justify-center text-center py-20 space-y-6">
              <span className="material-symbols-outlined text-secondary text-6xl animate-pulse">
                check_circle
              </span>
              <h3 className="font-headline-md text-headline-md text-primary">Inquiry Received</h3>
              <p className="font-body-md text-on-surface-variant max-w-sm">
                Thank you for sharing your project details. We will review your inquiry and get back to you within 2-3 business days.
              </p>
              <button
                onClick={() => setFormStatus('IDLE')}
                className="mt-4 px-8 py-3 border border-primary text-primary font-label-md text-label-md uppercase tracking-widest hover:bg-primary hover:text-white transition-colors duration-300"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10" id="commissionForm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Name field */}
                <div className="flex flex-col gap-2 group">
                  <label
                    className="font-label-md text-label-md text-primary group-focus-within:text-secondary transition-colors duration-300"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="bg-transparent border-b border-primary/15 focus:border-secondary focus:outline-none py-2 font-body-md text-body-md transition-colors duration-300"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="E.g. Mohammed Irshad"
                    type="text"
                    disabled={formStatus === 'SENDING'}
                    required
                  />
                </div>
                {/* Email field */}
                <div className="flex flex-col gap-2 group">
                  <label
                    className="font-label-md text-label-md text-primary group-focus-within:text-secondary transition-colors duration-300"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="bg-transparent border-b border-primary/15 focus:border-secondary focus:outline-none py-2 font-body-md text-body-md transition-colors duration-300"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@studio.com"
                    type="email"
                    disabled={formStatus === 'SENDING'}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Script style field */}
                <div className="flex flex-col gap-2 group">
                  <label
                    className="font-label-md text-label-md text-primary group-focus-within:text-secondary transition-colors duration-300"
                    htmlFor="style"
                  >
                    Desired Script Style
                  </label>
                  <select
                    className="bg-transparent border-b border-primary/15 focus:border-secondary focus:outline-none py-2 font-body-md text-body-md border-0 focus:ring-0 transition-colors duration-300"
                    id="style"
                    value={formData.style}
                    onChange={handleChange}
                    disabled={formStatus === 'SENDING'}
                  >
                    <option value="Classic Thuluth">Classic Thuluth</option>
                    <option value="Minimalist Kufic">Minimalist Kufic</option>
                    <option value="Contemporary Abstract">Contemporary Abstract</option>
                    <option value="Maghrebi">Maghrebi</option>
                    <option value="Undecided / Open to Suggestion">Undecided / Open to Suggestion</option>
                  </select>
                </div>
                {/* Size/Medium field */}
                <div className="flex flex-col gap-2 group">
                  <label
                    className="font-label-md text-label-md text-primary group-focus-within:text-secondary transition-colors duration-300"
                    htmlFor="size"
                  >
                    Size/Medium
                  </label>
                  <input
                    className="bg-transparent border-b border-primary/15 focus:border-secondary focus:outline-none py-2 font-body-md text-body-md transition-colors duration-300"
                    id="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="E.g. 100x100cm, Canvas"
                    type="text"
                    disabled={formStatus === 'SENDING'}
                  />
                </div>
              </div>

              {/* Project Description field */}
              <div className="flex flex-col gap-2 group">
                <label
                  className="font-label-md text-label-md text-primary group-focus-within:text-secondary transition-colors duration-300"
                  htmlFor="description"
                >
                  Project Description
                </label>
                <textarea
                  className="bg-transparent border-b border-primary/15 focus:border-secondary focus:outline-none py-2 font-body-md text-body-md resize-none transition-colors duration-300"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about the story or the space this piece is intended for..."
                  rows="4"
                  disabled={formStatus === 'SENDING'}
                ></textarea>
              </div>

              {formStatus === 'ERROR' && (
                <p className="text-error font-body-md text-sm">
                  Please fill in all required fields.
                </p>
              )}

              {/* Submit panel */}
              <div className="mt-4 flex flex-col md:flex-row items-center gap-6">
                <button
                  className="w-full md:w-auto px-12 py-4 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest hover:bg-secondary transition-colors duration-300 disabled:opacity-50"
                  type="submit"
                  disabled={formStatus === 'SENDING'}
                >
                  {formStatus === 'SENDING' ? 'Sending...' : 'Submit Inquiry'}
                </button>
                <p className="font-label-md text-label-md text-on-surface-variant opacity-70 italic text-center md:text-left">
                  Response time typically 2-3 business days.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Subtle Divider */}
      <hr className="mt-section-gap border-t border-primary/10" />
    </div>
  );
}
