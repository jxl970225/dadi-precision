import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './RequestQuote.css';

const MATERIAL_KEYS = [
  'unknown', 'help_choose',
  '17-4ph', 'aluminum', 'bg42', 'brass', 'bronze', 'carbon-steel', 'carbon-steel-media',
  'chrome-steel', 'copper', 'gold', 'glass', 'hastelloy', 'inconel', 'k-monel', 'm50',
  'monel', 'niobium', 'nitinol-60', 'plastic', 'platinum', 'rex-20', 'rex-m4',
  'rock-bit-tool-steel', 'silicon-nitride', 'silver', 'stainless-steel', 'stainless-steel-media',
  'stellite', 'tantalum', 'tantalum-balls', 'titanium', 'trimrite', 'tool-steel',
  'tungsten-carbide', 'other',
];
const INDUSTRY_KEYS = [
  'unknown', 'aerospace', 'automotive', 'construction', 'consumer', 'cosmetics',
  'electronics', 'heavy-equipment', 'jewelry', 'medical', 'military', 'toys',
  'welding', 'other',
];
const UNIT_KEYS = ['pieces', 'kg'];

const initialForm = {
  name: '',
  company: '',
  email: '',
  phone: '',
  material: '',
  industry: '',
  size: '',
  grade: '',
  amount: '',
  unit: 'pieces',
  message: '',
};

export default function RequestQuote() {
  const { t } = useTranslation();
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    setFile(e.target.files?.[0] ?? null);
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
      const payload = new FormData();
      payload.append('subject', `询价请求 / Quote Request — ${form.name}`);
      payload.append('name', form.name);
      payload.append('email', form.email);
      payload.append('company', form.company);
      payload.append('phone', form.phone);
      payload.append('material', form.material ? t(`quote.material.${form.material}`) : '');
      payload.append('industry', form.industry ? t(`quote.industry.${form.industry}`) : '');
      payload.append('size', form.size);
      payload.append('grade', form.grade);
      payload.append('amount', `${form.amount} ${t(`quote.unit.${form.unit}`)}`);
      payload.append('message', form.message);
      if (file) payload.append('attachment', file);

      const res = await fetch('/api/contact', {
        method: 'POST',
        body: payload,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm(initialForm);
        setFile(null);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="section quote-section" id="quote">
      <div className="container quote-content">
        <div className="section-header">
          <p className="section-eyebrow">{t('quote.eyebrow')}</p>
          <h2 className="section-title">{t('quote.title')}</h2>
          <p className="section-desc">{t('quote.desc')}</p>
        </div>

        <form className="quote-form" onSubmit={handleSubmit} noValidate>
          <div className="quote-row">
            <div className="quote-field">
              <label htmlFor="quote-name">
                {t('inquiry.name')} <span className="required">*</span>
              </label>
              <input
                id="quote-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
            <div className="quote-field">
              <label htmlFor="quote-company">{t('inquiry.company')}</label>
              <input
                id="quote-company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="quote-row">
            <div className="quote-field">
              <label htmlFor="quote-email">
                {t('inquiry.email')} <span className="required">*</span>
              </label>
              <input
                id="quote-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
            <div className="quote-field">
              <label htmlFor="quote-phone">{t('inquiry.phone')}</label>
              <input
                id="quote-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="quote-row">
            <div className="quote-field">
              <label htmlFor="quote-material">{t('quote.material')}</label>
              <select id="quote-material" name="material" value={form.material} onChange={handleChange}>
                <option value="">{t('quote.select_placeholder')}</option>
                {MATERIAL_KEYS.map(k => (
                  <option key={k} value={k}>{t(`quote.material.${k}`)}</option>
                ))}
              </select>
            </div>
            <div className="quote-field">
              <label htmlFor="quote-industry">{t('quote.industry')}</label>
              <select id="quote-industry" name="industry" value={form.industry} onChange={handleChange}>
                <option value="">{t('quote.select_placeholder')}</option>
                {INDUSTRY_KEYS.map(k => (
                  <option key={k} value={k}>{t(`quote.industry.${k}`)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="quote-row">
            <div className="quote-field">
              <label htmlFor="quote-size">{t('quote.size')}</label>
              <input
                id="quote-size"
                name="size"
                type="text"
                placeholder={t('quote.size.placeholder')}
                value={form.size}
                onChange={handleChange}
              />
            </div>
            <div className="quote-field">
              <label htmlFor="quote-grade">{t('quote.grade')}</label>
              <input
                id="quote-grade"
                name="grade"
                type="text"
                placeholder={t('quote.grade.placeholder')}
                value={form.grade}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="quote-row">
            <div className="quote-field">
              <label htmlFor="quote-amount">{t('quote.amount')}</label>
              <div className="quote-amount-group">
                <input
                  id="quote-amount"
                  name="amount"
                  type="text"
                  value={form.amount}
                  onChange={handleChange}
                />
                <select name="unit" value={form.unit} onChange={handleChange} className="quote-unit-select">
                  {UNIT_KEYS.map(k => (
                    <option key={k} value={k}>{t(`quote.unit.${k}`)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="quote-field">
            <label>{t('quote.file')}</label>
            <input
              ref={fileInputRef}
              id="quote-file"
              name="attachment"
              type="file"
              accept="image/*,.pdf,.dwg,.dxf"
              onChange={handleFileChange}
              className="quote-file-input"
            />
            <button
              type="button"
              className="quote-file-trigger"
              onClick={() => fileInputRef.current?.click()}
            >
              {t('quote.file.choose')}
            </button>
            <span className="quote-file-name">
              {file ? file.name : t('quote.file.none')}
            </span>
          </div>

          <div className="quote-field">
            <label htmlFor="quote-message">{t('inquiry.message')}</label>
            <textarea
              id="quote-message"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary quote-submit" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? t('inquiry.sending') : t('quote.submit')}
          </button>

          {status === 'success' && <p className="inquiry-status inquiry-status--ok">{t('inquiry.success')}</p>}
          {status === 'error' && <p className="inquiry-status inquiry-status--err">{t('inquiry.error.generic')}</p>}
        </form>
      </div>
    </section>
  );
}
