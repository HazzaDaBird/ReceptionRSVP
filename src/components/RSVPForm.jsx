import React, { useState } from 'react';
import { submitToGoogleForm } from '../utils/googleForm';
import chapelBackground from '../assets/chapel.png';

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    names: [''],
    dietary: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNameChange = (index, value) => {
    const newNames = [...formData.names];
    newNames[index] = value;
    setFormData((prev) => ({ ...prev, names: newNames }));
  };

  const addNameField = () => {
    setFormData((prev) => ({ ...prev, names: [...prev.names, ''] }));
  };

  const removeNameField = (index) => {
    if (formData.names.length > 1) {
      const newNames = formData.names.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, names: newNames }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Combine names into a single string
    const namesString = formData.names.filter(n => n.trim()).join(' & ');
    
    // Create submission payload with the combined name string
    const submissionData = {
      ...formData,
      name: namesString
    };
    
    // Simulate submission or call actual Google Form logic
    const success = await submitToGoogleForm(submissionData); // Using our utility

    setIsSubmitting(false);
    if (success) {
      setIsSubmitted(true);
      // alert('Thank you for your RSVP!');
    } else {
      alert('There was an error submitting your RSVP. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen bg-wedding-sand bg-cover bg-center bg-no-repeat py-12 px-4 sm:px-6 lg:px-8 font-serif flex items-center justify-center"
      style={{ backgroundImage: `url(${chapelBackground})` }}
    >
      <div className="max-w-lg w-full bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-stone-100 relative">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wedding-gold to-transparent opacity-70"></div>

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6 tracking-tight font-serif">Harrison <span className="text-wedding-gold">&</span> Giovanna</h1>
          <div className="text-stone-600 space-y-1 font-sans font-light tracking-wide text-sm uppercase">
            <p>Invite you to celebrate their reception</p>
          </div>
          <div className="mt-6 space-y-2">
            <p className="text-xl font-semibold text-stone-800">July 11th, 2026</p>
            <p className="text-stone-500 font-sans">From 5:00 PM until 2:00 AM</p>
            <p className="text-lg font-medium text-stone-700 mt-2">The Chapel Bar</p>
            <p className="text-stone-500 text-sm">
              <a
                href="https://www.google.com/maps/search/?api=1&query=29%20Penton%20St%2C%20London%20N1%209PX"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-stone-700 transition-colors"
              >
                29 Penton St, London N1 9PX
              </a>
            </p>
            <div className="pt-2 text-stone-600 text-sm font-sans space-y-1">
              <p>Buffet dinner will be served at 5:30 PM, with more food later in the evening.</p>
              <p>Very close to Angel Station and King’s Cross / St Pancras</p>
            </div>
          </div>
        </div>

        {isSubmitted && (
          <div className="mb-6 rounded-lg border border-wedding-gold/20 bg-wedding-sand px-4 py-3 font-sans text-stone-700">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm">
                <span className="font-semibold">Submitted successfully.</span> We’ve received your RSVP.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs uppercase tracking-wider text-stone-600 hover:text-stone-900 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div className="space-y-3">
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Full Name(s)</label>
              {formData.names.map((name, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-2.5 px-3.5 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-wedding-gold sm:text-sm sm:leading-6 bg-stone-50/50 transition-shadow"
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={index === 0 ? "Your Name" : `Guest ${index + 1} Name`}
                  />
                  {formData.names.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeNameField(index)}
                      className="text-stone-400 hover:text-red-500 transition-colors p-2"
                      aria-label="Remove name"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addNameField}
                className="text-sm text-wedding-gold hover:text-stone-800 font-medium flex items-center gap-1 transition-colors mt-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Another Person
              </button>
            </div>

            {/* Attending removed */}

          </div>

          <div className="space-y-5 pt-2 animate-fade-in transition-all duration-500 ease-in-out">
              {/* Guests removed */}

              <div>
                <label htmlFor="dietary" className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Dietary Requirements</label>
                <textarea
                  id="dietary"
                  name="dietary"
                  rows={3}
                  className="block w-full rounded-md border-0 py-2.5 px-3.5 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-wedding-gold sm:text-sm sm:leading-6 bg-stone-50/50"
                  value={formData.dietary}
                  onChange={handleChange}
                  placeholder="Vegetarian, nut allergy, etc."
                />
              </div>
          </div>

          {/* Message removed */}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 ${
                (isSubmitting || isSubmitted)
                  ? 'bg-stone-400 cursor-not-allowed' 
                  : 'bg-stone-800 hover:bg-stone-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 transform hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? 'Sending RSVP...' : (isSubmitted ? 'Submitted' : 'Submit RSVP')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RSVPForm;
