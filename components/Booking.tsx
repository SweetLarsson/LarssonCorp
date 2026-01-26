
import React, { useState } from 'react';

interface BookingProps {
  theme?: 'dark' | 'light';
}

const Booking: React.FC<BookingProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'design',
    details: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStep, setPaymentStep] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setPaymentStep(true);
    }, 1500);
  };

  const handleOpayPayment = () => {
    alert("Redirecting to Opay Gateway... (Simulation)");
  };

  return (
    <div className="max-w-4xl mx-auto px-10 md:px-16 py-20">
      <div className="text-center mb-16 reveal">
        <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold text-larsson-accent mb-6">Engagement</h2>
        <h3 className={`text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase ${isDark ? 'text-white' : 'text-larsson-black'}`}>Start Your Journey</h3>
        <p className={`font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed text-justify-custom ${isDark ? 'text-white/40' : 'text-larsson-black'}`}>
          Every great vision needs a strategic partner. Secure your project slot today. Payments are handled securely via Opay Online Gateway for total peace of mind.
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
              {isSubmitting ? 'Processing...' : 'Proceed to Booking'}
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
            <p className={`font-light mb-12 text-sm leading-relaxed text-justify-custom px-4 ${isDark ? 'text-white/40' : 'text-larsson-black'}`}>Our strategic team will review your project requirements and vision, and contact you via email within 24 business hours to finalize the engagement.</p>
            
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
