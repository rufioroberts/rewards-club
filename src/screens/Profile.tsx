import { useState } from 'react';
import { WireframeShell } from '../components/WireframeShell';
import { useApp } from '../context/AppContext';
import { FadeUp } from '../components/Motion';

// Priya Sharma -- our persona throughout the wireframe
const defaultProfile = {
  firstName: 'Priya',
  lastName: 'Sharma',
  email: 'priya.sharma@gmail.com',
  phone: '+91 98765 43210',
  dob: '1996-03-14',
  gender: 'Female',
  city: 'Mumbai',
};

type FieldKey = 'firstName' | 'lastName' | 'email' | 'phone' | 'dob' | 'gender' | 'city';

export function Profile() {
  const { state } = useApp();
  const profile = state.profile || defaultProfile;

  const [editingField, setEditingField] = useState<FieldKey | null>(null);
  const [editValue, setEditValue] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [savedValues, setSavedValues] = useState<Record<string, string>>({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email || '',
    phone: profile.phone || '',
    dob: profile.dob || '',
    gender: profile.gender || '',
    city: profile.city || '',
  });

  const formatDob = (dob: string) => {
    try {
      const date = new Date(dob);
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return dob;
    }
  };

  const validateField = (key: FieldKey, value: string): string => {
    const trimmed = value.trim();
    switch (key) {
      case 'firstName':
      case 'lastName':
        if (!trimmed) return 'This field is required';
        if (trimmed.length < 2) return 'Must be at least 2 characters';
        if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return 'Only letters, spaces, hyphens and apostrophes';
        return '';
      case 'email':
        if (!trimmed) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Enter a valid email address';
        return '';
      case 'phone':
        if (!trimmed) return 'Phone number is required';
        if (!/^[+]?[\d\s-]{10,15}$/.test(trimmed.replace(/\s/g, ''))) return 'Enter a valid phone number (10-15 digits)';
        return '';
      case 'dob':
        if (!trimmed) return 'Date of birth is required';
        const date = new Date(trimmed);
        if (isNaN(date.getTime())) return 'Enter a valid date';
        const age = (Date.now() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
        if (age < 18) return 'You must be at least 18 years old';
        if (age > 120) return 'Enter a valid date of birth';
        return '';
      case 'gender':
        if (!trimmed) return 'Please select a gender';
        return '';
      case 'city':
        if (!trimmed) return 'City is required';
        return '';
      default:
        return '';
    }
  };

  const startEditing = (key: FieldKey) => {
    setEditingField(key);
    setEditValue(savedValues[key]);
    setFieldError('');
  };

  const cancelEditing = () => {
    setEditingField(null);
    setEditValue('');
    setFieldError('');
  };

  const saveField = () => {
    if (!editingField) return;
    const error = validateField(editingField, editValue);
    if (error) {
      setFieldError(error);
      return;
    }
    setSavedValues(prev => ({ ...prev, [editingField]: editValue.trim() }));
    setEditingField(null);
    setEditValue('');
    setFieldError('');
  };

  const fields: { key: FieldKey; label: string; type: string }[] = [
    { key: 'firstName', label: 'First name', type: 'text' },
    { key: 'lastName', label: 'Last name', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'phone', label: 'Phone', type: 'tel' },
    { key: 'dob', label: 'Date of birth', type: 'date' },
    { key: 'gender', label: 'Gender', type: 'select' },
    { key: 'city', label: 'City', type: 'text' },
  ];

  return (
    <WireframeShell>
      <section className="px-5 md:px-6 lg:px-12 xl:px-20 pt-8 md:pt-12 pb-12 md:pb-16">
        <div className="max-w-xl">
          <FadeUp>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 tracking-tight">Account</h1>
          <p className="text-sm text-gray-400 mb-10">Your details are used for voucher delivery and event registration.</p>
          </FadeUp>

          <FadeUp delay={100}>
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm overflow-hidden mb-5 md:mb-6">
            {/* Avatar + name header */}
            <div className="px-7 py-6 border-b border-gray-50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">{savedValues.firstName.charAt(0)}{savedValues.lastName.charAt(0)}</span>
              </div>
              <div>
                <div className="text-base font-bold text-gray-900">{savedValues.firstName} {savedValues.lastName}</div>
                <div className="text-xs text-gray-400">Member since May 2025</div>
              </div>
            </div>

            {fields.map((field, i) => (
              <div
                key={field.key}
                className={`px-7 py-5 ${i < fields.length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                {editingField === field.key ? (
                  /* Editing state */
                  <div>
                    <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] mb-2">{field.label}</div>
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        {field.type === 'select' ? (
                          <select
                            value={editValue}
                            onChange={e => { setEditValue(e.target.value); setFieldError(''); }}
                            className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 appearance-none ${
                              fieldError ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                            }`}
                          >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            value={editValue}
                            onChange={e => { setEditValue(e.target.value); setFieldError(''); }}
                            className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 ${
                              fieldError ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                            }`}
                            autoFocus
                          />
                        )}
                        {fieldError && (
                          <p className="text-xs text-red-500 mt-1.5 font-medium">{fieldError}</p>
                        )}
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={saveField}
                          className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="px-4 py-2 bg-gray-100 text-gray-500 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Display state */
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] mb-1">{field.label}</div>
                      <div className="text-sm text-gray-900 font-medium">
                        {field.key === 'dob' ? formatDob(savedValues[field.key]) : savedValues[field.key]}
                      </div>
                    </div>
                    <button
                      onClick={() => startEditing(field.key)}
                      className="text-xs text-gray-400 hover:text-gray-700 font-semibold transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          </FadeUp>

          <FadeUp delay={200}>
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-7 mb-5 md:mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] mb-1">Subscription</div>
                <div className="text-sm text-gray-900 font-bold">Spotify Premium Individual</div>
                <div className="text-xs text-gray-400 mt-0.5">Renews 14 Jun 2025</div>
              </div>
              <span className="px-4 py-1.5 bg-gray-900 text-white text-[11px] font-bold rounded-full">Active</span>
            </div>
          </div>
          </FadeUp>
        </div>
      </section>
    </WireframeShell>
  );
}
