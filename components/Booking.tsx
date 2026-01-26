
import React, { useState } from 'react';

const Booking: React.FC = () => {
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
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-16 reveal">
        <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold text-larsson-accent mb-6">Engagement</h2>
        <h3 className="text-4xl md:text-6xl font-display font-black mb-8 text-white tracking-tighter">Start Your Journey</h3>
        <p className="text-white/40 font-medium max-w-xl mx-auto text-sm">
          Every great vision needs a strategic partner. Secure your project slot today. Payments are handled securely via Opay.
        </p>
      </div>

      <div className="bg-larsson-grey border border-white/5 p-8 md:p-16 shadow-2xl reveal rounded-3xl backdrop-blur-3xl">
        {!paymentStep ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full bg-larsson-black/50 border border-white/5 rounded-xl p-4 focus:border-larsson-accent outline-none transition-all text-white font-medium text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 ml-1">Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="hello@visionary.com"
                  className="w-full bg-larsson-black/50 border border-white/5 rounded-xl p-4 focus:border-larsson-accent outline-none transition-all text-white font-medium text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 ml-1">Primary Interest</label>
              <select 
                className="w-full bg-larsson-black/50 border border-white/5 rounded-xl p-4 focus:border-larsson-accent outline-none transition-all text-white font-medium text-sm appearance-none cursor-pointer"
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
              >
                <option value="design" className="bg-larsson-black">Graphic Design Service</option>
                <option value="course" className="bg-larsson-black">Design Course Enrollment</option>
                <option value="consulting" className="bg-larsson-black">Media Consulting</option>
                <option value="event" className="bg-larsson-black">Event Visual Strategy</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 ml-1">Brief Details</label>
              <textarea 
                rows={4}
                placeholder="How can we help you achieve distinction?"
                className="w-full bg-larsson-black/50 border border-white/5 rounded-xl p-4 focus:border-larsson-accent outline-none transition-all text-white font-medium text-sm resize-none"
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
              />
            </div>

            <button 
              disabled={isSubmitting}
              className="w-full bg-larsson-accent text-white font-bold uppercase tracking-widest py-6 rounded-xl transition-all hover:bg-white hover:text-larsson-black disabled:opacity-50 shadow-xl"
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
            <h3 className="text-3xl font-display font-black mb-4 text-white uppercase tracking-tighter">Brief Received</h3>
            <p className="text-white/40 font-medium mb-12 text-sm">Our team will review your vision and contact you within 24 hours.</p>
            
            <button 
              onClick={handleOpayPayment}
              className="flex items-center justify-center gap-4 w-full max-w-sm mx-auto bg-white text-larsson-black font-bold py-5 rounded-xl transition-all hover:bg-larsson-accent hover:text-white shadow-2xl uppercase tracking-widest text-xs"
            >
              <img src="https://opayweb.com/static/images/logo.png" alt="Opay" className="h-4" />
              Complete with Opay
            </button>
            
            <button 
              onClick={() => setPaymentStep(false)}
              className="mt-8 text-[10px] uppercase tracking-widest font-bold text-white/20 hover:text-white transition-all underline underline-offset-4"
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
