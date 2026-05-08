import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FadeUp } from '../components/Motion';

export function Onboarding() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [form, setForm] = useState({
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@gmail.com',
    phone: '+91 98765 43210',
    dob: '1996-03-14',
    gender: 'female',
    city: 'Mumbai',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!form.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (form.firstName.trim().length < 2) {
      errors.firstName = 'Must be at least 2 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(form.firstName.trim())) {
      errors.firstName = 'Only letters, spaces, hyphens and apostrophes';
    }

    if (!form.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (form.lastName.trim().length < 2) {
      errors.lastName = 'Must be at least 2 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(form.lastName.trim())) {
      errors.lastName = 'Only letters, spaces, hyphens and apostrophes';
    }

    if (!form.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = 'Enter a valid email address';
    }

    if (!form.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s-]{10,15}$/.test(form.phone.replace(/\s/g, ''))) {
      errors.phone = 'Enter a valid phone number (10-15 digits)';
    }

    if (!form.dob) {
      errors.dob = 'Date of birth is required';
    } else {
      const date = new Date(form.dob);
      const age = (Date.now() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
      if (age < 18) errors.dob = 'You must be at least 18 years old';
      if (age > 120) errors.dob = 'Enter a valid date of birth';
    }

    if (!form.gender) {
      errors.gender = 'Please select a gender';
    }

    if (!form.city.trim()) {
      errors.city = 'City is required';
    }

    if (!agreedToTerms) {
      errors.terms = 'You must agree to the terms';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (!validateForm()) return;
    dispatch({ type: 'COMPLETE_ONBOARDING', payload: form });
    dispatch({ type: 'SET_USER_STATUS', payload: 'premium' });
    navigate('/rewards');
  };

  const clearError = (field: string) => {
    if (submitted) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="px-6 lg:px-12 xl:px-20 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gray-900" />
          <span className="text-sm font-bold text-gray-900 tracking-tight">Rewards Club</span>
        </div>
      </header>

      <section className="px-6 lg:px-12 xl:px-20 py-8 md:py-12">
        <div className="max-w-md">
          {/* Welcome moment */}
          <FadeUp>
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-full mb-5">
              <svg className="w-3.5 h-3.5 text-[#1ED760]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-semibold text-white">Premium verified</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight leading-tight">
              Welcome to Rewards Club
            </h1>
            <p className="text-base text-gray-500 leading-relaxed max-w-sm">
              You're in. Premium members get discounts and event invites. We just need a few details to match you with the right stuff.
            </p>
          </div>
          </FadeUp>

          {/* Why we need this -- brief, honest */}
          <FadeUp delay={150}>
          <div className="flex items-start gap-3 mb-8 p-4 bg-white rounded-2xl shadow-sm">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-0.5">Why do we need this?</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Your email and phone receive voucher codes. City helps us show events near you. Date of birth and gender help brands offer relevant deals.
              </p>
            </div>
          </div>
          </FadeUp>

          {/* Form card */}
          <FadeUp delay={300}>
          <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">First name</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={e => { setForm({ ...form, firstName: e.target.value }); clearError('firstName'); }}
                    className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 ${
                      formErrors.firstName ? 'border-red-300 bg-red-50/50' : 'border-transparent'
                    }`}
                    placeholder="Priya"
                  />
                  {formErrors.firstName && <p className="text-xs text-red-500 mt-1.5 font-medium">{formErrors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Last name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={e => { setForm({ ...form, lastName: e.target.value }); clearError('lastName'); }}
                    className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 ${
                      formErrors.lastName ? 'border-red-300 bg-red-50/50' : 'border-transparent'
                    }`}
                    placeholder="Sharma"
                  />
                  {formErrors.lastName && <p className="text-xs text-red-500 mt-1.5 font-medium">{formErrors.lastName}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => { setForm({ ...form, email: e.target.value }); clearError('email'); }}
                  className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 ${
                    formErrors.email ? 'border-red-300 bg-red-50/50' : 'border-transparent'
                  }`}
                  placeholder="priya@email.com"
                />
                {formErrors.email && <p className="text-xs text-red-500 mt-1.5 font-medium">{formErrors.email}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => { setForm({ ...form, phone: e.target.value }); clearError('phone'); }}
                  className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 ${
                    formErrors.phone ? 'border-red-300 bg-red-50/50' : 'border-transparent'
                  }`}
                  placeholder="+91 98765 43210"
                />
                {formErrors.phone && <p className="text-xs text-red-500 mt-1.5 font-medium">{formErrors.phone}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Date of birth</label>
                  <input
                    type="date"
                    value={form.dob}
                    onChange={e => { setForm({ ...form, dob: e.target.value }); clearError('dob'); }}
                    className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 ${
                      formErrors.dob ? 'border-red-300 bg-red-50/50' : 'border-transparent'
                    }`}
                  />
                  {formErrors.dob && <p className="text-xs text-red-500 mt-1.5 font-medium">{formErrors.dob}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Gender</label>
                  <select
                    value={form.gender}
                    onChange={e => { setForm({ ...form, gender: e.target.value }); clearError('gender'); }}
                    className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 appearance-none ${
                      formErrors.gender ? 'border-red-300 bg-red-50/50' : 'border-transparent'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Prefer not to say</option>
                  </select>
                  {formErrors.gender && <p className="text-xs text-red-500 mt-1.5 font-medium">{formErrors.gender}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={e => { setForm({ ...form, city: e.target.value }); clearError('city'); }}
                  className={`w-full px-5 py-3.5 bg-gray-50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 ${
                    formErrors.city ? 'border-red-300 bg-red-50/50' : 'border-transparent'
                  }`}
                  placeholder="Mumbai"
                />
                {formErrors.city && <p className="text-xs text-red-500 mt-1.5 font-medium">{formErrors.city}</p>}
              </div>

              {/* Terms & Privacy consent -- inside the form card */}
              <div className="mt-3 pt-5 border-t border-gray-100">
                <label className={`flex items-start gap-3.5 cursor-pointer group`}>
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={e => { setAgreedToTerms(e.target.checked); clearError('terms'); }}
                    className="mt-0.5 w-5 h-5 rounded-md border-2 border-gray-200 text-gray-900 focus:ring-gray-900/10 cursor-pointer accent-gray-900 flex-shrink-0"
                  />
                  <span className={`text-xs leading-relaxed ${formErrors.terms ? 'text-red-500' : 'text-gray-400'}`}>
                    I agree to the{' '}
                    <a href="/terms" target="_blank" className="text-gray-900 font-semibold underline underline-offset-2 hover:text-gray-600 transition-colors">Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy" target="_blank" className="text-gray-900 font-semibold underline underline-offset-2 hover:text-gray-600 transition-colors">Privacy Policy</a>
                  </span>
                </label>
                {formErrors.terms && <p className="text-xs text-red-500 mt-2 font-medium">{formErrors.terms}</p>}
              </div>
            </div>

            {/* Submit -- inside the form card */}
            <button
              onClick={handleSubmit}
              className="mt-6 w-full px-8 py-4 bg-gray-900 text-white font-bold text-sm rounded-full shadow-lg shadow-gray-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              Get started
            </button>
          </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
