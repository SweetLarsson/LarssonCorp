
import React, { useState, useRef, useEffect } from 'react';

// Common countries for the selector
const COUNTRIES = [
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Ghana', code: '+233', flag: '🇬🇭' },
  { name: 'South Africa', code: '+27', flag: '🇿🇦' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'Kenya', code: '+254', flag: '🇰🇪' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
  { name: 'China', code: '+86', flag: '🇨🇳' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷' },
];

interface BookingProps {
  theme?: 'dark' | 'light';
}

const Booking: React.FC<BookingProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'design',
    details: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStep, setPaymentStep] = useState(false);
  
  // Phone Selector State
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isCountryDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isCountryDropdownOpen]);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    // Limit to 10-11 digits depending on standard (generic grouping)
    const match = cleaned.match(/^(\d{0,4})(\d{0,3})(\d{0,4})$/);
    if (!match) return cleaned;
    
    return [match[1], match[2], match[3]].filter(group => !!group).join(' ');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setPaymentStep(true);
    }, 1500);
  };

  const handleOpayPayment = () => {
    alert("Redirecting to Opay Gateway...");
  };

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) || 
    c.code.includes(countrySearch)
  );

  return (
    <div className="max-w-4xl mx-auto px-10 md:px-16 py-20">
      <div className="text-center mb-16 reveal">
        <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold text-larsson-accent mb-6">Engagement</h2>
        <h3 className={`text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase ${isDark ? 'text-white' : 'text-larsson-black'}`}>Start Your Journey</h3>
        <p className={`font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed text-justify-custom ${isDark ? 'text-white/40' : 'text-larsson-black'}`}>
          Every visionary project begins with a strategic conversation. Secure your spot in our production cycle today.
        </p>
      </div>

      <div className={`border p-8 md:p-16 shadow-2xl reveal rounded-[2.5rem] backdrop-blur-3xl transition-colors duration-700 ${isDark ? 'bg-larsson-grey border-white/5' : 'bg-white border-black/5'}`}>
        {!paymentStep ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className={`text-[10px] uppercase tracking-[0.3em] font-bold ml-1 ${isDark ? 'text-white/30' : 'text-larsson-black'}`}>Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className={`w-full border rounded-2xl p-5 focus:border-larsson-accent outline-none transition-all font-light text-sm ${isDark ? 'bg-larsson-black/50 border-white/5 text-white' : 'bg-black/5 border-black/10 text-larsson-black'}`}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className={`text-[10px] uppercase tracking-[0.3em] font-bold ml-1 ${isDark ? 'text-white/30' : 'text-larsson-black'}`}>Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="hello@visionary.com"
                  className={`w-full border rounded-2xl p-5 focus:border-larsson-accent outline-none transition-all font-light text-sm ${isDark ? 'bg-larsson-black/50 border-white/5 text-white' : 'bg-black/5 border-black/10 text-larsson-black'}`}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Enhanced Phone Input Field */}
            <div className="space-y-3">
              <label className={`text-[10px] uppercase tracking-[0.3em] font-bold ml-1 ${isDark ? 'text-white/30' : 'text-larsson-black'}`}>Phone Number</label>
              <div className="relative flex gap-2">
                {/* Country Selector */}
                <div className="relative shrink-0" ref={countryDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                    className={`h-full border rounded-2xl px-4 flex items-center gap-2 transition-all outline-none focus:border-larsson-accent ${isDark ? 'bg-larsson-black/50 border-white/5 text-white' : 'bg-black/5 border-black/10 text-larsson-black'}`}
                  >
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span className="text-xs font-bold">{selectedCountry.code}</span>
                    <svg className={`w-3 h-3 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                  </button>

                  {isCountryDropdownOpen && (
                    <div className={`absolute top-full left-0 mt-2 w-64 max-h-72 overflow-hidden rounded-2xl border shadow-2xl z-50 flex flex-col ${isDark ? 'bg-larsson-darkGrey border-white/10' : 'bg-white border-black/10'}`}>
                      <div className="p-3 border-b border-inherit">
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Search country..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          className={`w-full p-2 text-[10px] font-bold uppercase tracking-wider rounded-lg outline-none ${isDark ? 'bg-white/5 text-white' : 'bg-black/5 text-black'}`}
                        />
                      </div>
                      <div className="overflow-y-auto scrollbar-hide py-2">
                        {filteredCountries.map((c, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(c);
                              setIsCountryDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{c.flag}</span>
                              <span className={`text-[10px] font-bold ${isDark ? 'text-white/70' : 'text-black/70'}`}>{c.name}</span>
                            </div>
                            <span className="text-[10px] font-black text-larsson-accent">{c.code}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actual Phone Input */}
                <input 
                  type="tel" 
                  required
                  placeholder="0000 000 0000"
                  className={`flex-1 border rounded-2xl p-5 focus:border-larsson-accent outline-none transition-all font-light text-sm ${isDark ? 'bg-larsson-black/50 border-white/5 text-white' : 'bg-black/5 border-black/10 text-larsson-black'}`}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className={`text-[10px] uppercase tracking-[0.3em] font-bold ml-1 ${isDark ? 'text-white/30' : 'text-larsson-black'}`}>Primary Interest</label>
              <select 
                className={`w-full border rounded-2xl p-5 focus:border-larsson-accent outline-none transition-all font-light text-sm appearance-none cursor-pointer ${isDark ? 'bg-larsson-black/50 border-white/5 text-white' : 'bg-black/5 border-black/10 text-larsson-black'}`}
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
              >
                <option value="design" className={isDark ? "bg-larsson-black" : "bg-white"}>Graphic Design Service</option>
                <option value="course" className={isDark ? "bg-larsson-black" : "bg-white"}>Design Course Enrollment</option>
                <option value="consulting" className={isDark ? "bg-larsson-black" : "bg-white"}>Media Consulting</option>
                <option value="event" className={isDark ? "bg-larsson-black" : "bg-white"}>Event Visual Strategy</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className={`text-[10px] uppercase tracking-[0.3em] font-bold ml-1 ${isDark ? 'text-white/30' : 'text-larsson-black'}`}>Brief Details</label>
              <textarea 
                rows={4}
                placeholder="How can we help you achieve distinction?"
                className={`w-full border rounded-2xl p-5 focus:border-larsson-accent outline-none transition-all font-light text-sm resize-none ${isDark ? 'bg-larsson-black/50 border-white/5 text-white' : 'bg-black/5 border-black/10 text-larsson-black'}`}
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
              />
            </div>

            <button 
              disabled={isSubmitting}
              className="w-full bg-larsson-accent text-white font-bold uppercase tracking-widest py-6 rounded-2xl transition-all hover:bg-white hover:text-larsson-black disabled:opacity-50 shadow-xl"
            >
              {isSubmitting ? 'Syncing vision...' : 'Proceed to Booking'}
            </button>
          </form>
        ) : (
          <div className="text-center py-8 animate-fade-in-down">
            <div className="w-20 h-20 bg-larsson-accent/10 text-larsson-accent rounded-full flex items-center justify-center mx-auto mb-8 border border-larsson-accent/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className={`text-3xl font-black mb-4 uppercase tracking-tighter ${isDark ? 'text-white' : 'text-larsson-black'}`}>Brief Received</h3>
            <p className={`font-light mb-12 text-sm leading-relaxed text-justify-custom px-4 ${isDark ? 'text-white/40' : 'text-larsson-black'}`}>Our strategy team has received your brief. Expect a follow-up via {formData.email} or {selectedCountry.code} {formData.phone} within 24 hours.</p>
            
            <button 
              onClick={handleOpayPayment}
              className={`flex items-center justify-center gap-4 w-full max-w-sm mx-auto font-bold py-5 rounded-2xl transition-all shadow-2xl uppercase tracking-widest text-xs ${isDark ? 'bg-white text-larsson-black hover:bg-larsson-accent hover:text-white' : 'bg-larsson-black text-white hover:bg-larsson-accent'}`}
            >
              <img src="https://opayweb.com/static/images/logo.png" alt="Opay" className="h-4" />
              Complete with Opay
            </button>
            
            <button 
              onClick={() => setPaymentStep(false)}
              className={`mt-8 text-[10px] uppercase tracking-widest font-black transition-all underline underline-offset-4 ${isDark ? 'text-white/20 hover:text-white' : 'text-larsson-black/20 hover:text-larsson-black'}`}
            >
              Back to Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
