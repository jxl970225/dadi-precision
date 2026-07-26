import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Inquiry.css';

const initialForm = { name: '', phone: '', email: '', company: '', message: '' };

export default function Inquiry() {
  const { t } = useTranslation();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = t('inquiry.error.required');
    if (!form.email.trim()) {
      next.email = t('inquiry.error.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = t('inquiry.error.email');
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `官网留资 / Website Inquiry — ${form.name}`,
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm(initialForm);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="section inquiry-section" id="inquiry">
      <div className="container inquiry-content">
        <div className="section-header">
          <p className="section-eyebrow">{t('inquiry.eyebrow')}</p>
          <h2 className="section-title">{t('inquiry.title')}</h2>
          <p className="section-desc">{t('inquiry.desc')}</p>
        </div>

        <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
          <div className="inquiry-row">
            <div className="inquiry-field">
              <label htmlFor="inquiry-name">
                {t('inquiry.name')} <span className="required">*</span>
              </label>
              <input
                id="inquiry-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
            <div className="inquiry-field">
              <label htmlFor="inquiry-phone">{t('inquiry.phone')}</label>
              <input
                id="inquiry-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="inquiry-row">
            <div className="inquiry-field">
              <label htmlFor="inquiry-email">
                {t('inquiry.email')} <span className="required">*</span>
              </label>
              <input
                id="inquiry-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
            <div className="inquiry-field">
              <label htmlFor="inquiry-company">{t('inquiry.company')}</label>
              <input
                id="inquiry-company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="inquiry-field">
            <label htmlFor="inquiry-message">{t('inquiry.message')}</label>
            <textarea
              id="inquiry-message"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary inquiry-submit" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? t('inquiry.sending') : t('inquiry.submit')}
          </button>

          {status === 'success' && <p className="inquiry-status inquiry-status--ok">{t('inquiry.success')}</p>}
          {status === 'error' && <p className="inquiry-status inquiry-status--err">{t('inquiry.error.generic')}</p>}
        </form>
      </div>
    </section>
  );
}
