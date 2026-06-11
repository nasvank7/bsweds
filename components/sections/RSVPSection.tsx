'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { WeddingConfig } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';

interface Props { config: WeddingConfig }
interface FormData { name: string; phone: string; guests: string; attending: 'yes' | 'no' | ''; message: string }
type FieldError = Partial<Record<keyof FormData, string>>;

export default function RSVPSection({ config }: Props) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t, lang } = useLanguage();
  const ml = lang === 'ml';
  const [form, setForm] = useState<FormData>({ name: '', phone: '', guests: '1', attending: '', message: '' });
  const [errors, setErrors] = useState<FieldError>({});
  const [submitted, setSubmitted] = useState(false);

  const deadline = ml ? (config.rsvp.deadlineMalayalam || config.rsvp.deadline) : config.rsvp.deadline;

  const update = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): FieldError => {
    const errs: FieldError = {};
    if (!form.name.trim()) errs.name = t.rsvp.nameError;
    if (!form.phone.trim()) errs.phone = t.rsvp.phoneError;
    else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone)) errs.phone = t.rsvp.phoneInvalid;
    if (!form.guests || Number(form.guests) < 1) errs.guests = t.rsvp.guestsError;
    if (!form.attending) errs.attending = t.rsvp.attendingError;
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const msg = `*Wedding RSVP*\n\nName: ${form.name}\nPhone: ${form.phone}\nGuests: ${form.guests}\nAttending: ${form.attending === 'yes' ? 'Yes ✓' : 'No ✗'}\nMessage: ${form.message || 'None'}`;
    setSubmitted(true);
    setTimeout(() => window.open(`https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank'), 1000);
  };

  const inputStyle = { background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(139,74,42,0.2)', color: '#3C1020' };
  const fontClass = ml ? 'font-malayalam' : 'font-poppins';

  return (
    <section id="rsvp" className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #F8F0EC, #F2E8E3 50%, #EDE2DC)' }}>
      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <div ref={ref} className="text-center mb-12">
          <motion.p className={`text-xs tracking-[0.3em] uppercase mb-3 ${ml ? 'font-malayalam tracking-normal' : 'font-poppins'}`}
            style={{ color: 'rgba(139,74,42,0.75)' }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            {t.rsvp.label}
          </motion.p>
          <motion.h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${fontClass}`}
            style={{ color: '#3C1020' }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            {t.rsvp.title}
          </motion.h2>
          <motion.p className={`text-sm ${fontClass}`} style={{ color: 'rgba(60,16,32,0.55)' }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            {t.rsvp.deadline} {deadline}
          </motion.p>
          <motion.div className="h-0.5 w-24 mx-auto mt-6" style={{ background: 'linear-gradient(to right, transparent, #D4AF37, transparent)' }}
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ delay: 0.4 }} />
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="success" className="text-center py-16"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
              <motion.div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #C5A028)' }}
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FEF8F5" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </motion.div>
              <h3 className={`text-2xl font-bold mb-3 ${fontClass}`} style={{ color: '#D4AF37' }}>{t.rsvp.successTitle}</h3>
              <p className={`text-sm ${fontClass}`} style={{ color: 'rgba(60,16,32,0.6)' }}>{t.rsvp.successMsg}</p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit}
              className="rounded-3xl p-8 space-y-5"
              style={{ background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(139,74,42,0.18)', backdropFilter: 'blur(20px)' }}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}>
              {/* Name */}
              <div>
                <label className={`block text-xs tracking-wider uppercase mb-2 ${fontClass}`} style={{ color: 'rgba(139,74,42,0.75)' }}>{t.rsvp.nameLabel}</label>
                <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder={t.rsvp.namePlaceholder}
                  className={`w-full rounded-xl px-4 py-3 text-sm outline-none ${fontClass}`} style={inputStyle} />
                {errors.name && <p className={`text-red-400 text-xs mt-1 ${fontClass}`}>{errors.name}</p>}
              </div>
              {/* Phone */}
              <div>
                <label className={`block text-xs tracking-wider uppercase mb-2 ${fontClass}`} style={{ color: 'rgba(139,74,42,0.75)' }}>{t.rsvp.phoneLabel}</label>
                <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder={t.rsvp.phonePlaceholder}
                  className={`w-full rounded-xl px-4 py-3 text-sm outline-none font-poppins`} style={inputStyle} />
                {errors.phone && <p className={`text-red-400 text-xs mt-1 ${fontClass}`}>{errors.phone}</p>}
              </div>
              {/* Guests + Attending */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs tracking-wider uppercase mb-2 ${fontClass}`} style={{ color: 'rgba(139,74,42,0.75)' }}>{t.rsvp.guestsLabel}</label>
                  <input type="number" min="1" max="10" value={form.guests} onChange={(e) => update('guests', e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none font-poppins" style={inputStyle} />
                  {errors.guests && <p className={`text-red-400 text-xs mt-1 ${fontClass}`}>{errors.guests}</p>}
                </div>
                <div>
                  <label className={`block text-xs tracking-wider uppercase mb-2 ${fontClass}`} style={{ color: 'rgba(139,74,42,0.75)' }}>{t.rsvp.attendingLabel}</label>
                  <div className="flex gap-2 h-[46px]">
                    {(['yes', 'no'] as const).map((val) => (
                      <button key={val} type="button" onClick={() => update('attending', val)}
                        className={`flex-1 rounded-xl text-sm font-semibold transition-all ${fontClass}`}
                        style={{
                          background: form.attending === val ? (val === 'yes' ? 'linear-gradient(135deg, #8B4A2A, #7A3040)' : 'rgba(239,68,68,0.15)') : 'rgba(255,255,255,0.5)',
                          border: form.attending === val ? (val === 'yes' ? '1px solid #8B4A2A' : '1px solid rgba(239,68,68,0.4)') : '1px solid rgba(139,74,42,0.2)',
                          color: form.attending === val ? (val === 'yes' ? '#3C1020' : '#dc2626') : 'rgba(60,16,32,0.6)',
                        }}>
                        {val === 'yes' ? t.rsvp.yes : t.rsvp.no}
                      </button>
                    ))}
                  </div>
                  {errors.attending && <p className={`text-red-400 text-xs mt-1 ${fontClass}`}>{errors.attending}</p>}
                </div>
              </div>
              {/* Message */}
              <div>
                <label className={`block text-xs tracking-wider uppercase mb-2 ${fontClass}`} style={{ color: 'rgba(139,74,42,0.75)' }}>{t.rsvp.messageLabel}</label>
                <textarea rows={3} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder={t.rsvp.messagePlaceholder}
                  className={`w-full rounded-xl px-4 py-3 text-sm outline-none resize-none ${fontClass}`} style={{ ...inputStyle, border: '1px solid rgba(212,175,55,0.2)' }} />
              </div>
              {/* Submit */}
              <motion.button type="submit"
                className={`w-full py-4 rounded-full text-sm font-bold relative overflow-hidden ${ml ? 'font-malayalam' : 'font-poppins tracking-widest uppercase'}`}
                style={{ background: 'linear-gradient(135deg, #8B4A2A, #7A3040)', color: '#FEF8F5', boxShadow: '0 8px 32px rgba(60,16,32,0.2)' }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {t.rsvp.submit}
                <motion.div className="absolute inset-0 -skew-x-12"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
                  initial={{ x: '-100%' }} animate={{ x: '200%' }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }} />
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
