import { useTranslation } from 'react-i18next';
import './Contact.css';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section className="section cta-section" id="contact">
      <div className="cta-glow" aria-hidden="true" />
      <div className="container cta-content">
        <div className="cta-header">
          <h2>{t('cta.title')}</h2>
          <p>{t('cta.desc')}</p>
        </div>
        <div className="contact-info">
          <a className="contact-item" href={`tel:${t('contact.phone.value')}`}>
            <span className="contact-icon">📞</span>
            <div>
              <strong>{t('contact.phone.label')}</strong>
              <span>{t('contact.phone.value')}</span>
            </div>
          </a>
          <a className="contact-item" href={`tel:${t('contact.phone2.value')}`}>
            <span className="contact-icon">📞</span>
            <div>
              <strong>{t('contact.phone2.label')}</strong>
              <span>{t('contact.phone2.value')}</span>
            </div>
          </a>
          <a className="contact-item" href={`mailto:${t('contact.email.value')}`}>
            <span className="contact-icon">✉</span>
            <div>
              <strong>{t('contact.email.label')}</strong>
              <span>{t('contact.email.value')}</span>
            </div>
          </a>
          <a className="contact-item" href={`mailto:${t('contact.email2.value')}`}>
            <span className="contact-icon">✉</span>
            <div>
              <strong>{t('contact.email2.label')}</strong>
              <span>{t('contact.email2.value')}</span>
            </div>
          </a>
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <div>
              <strong>{t('contact.address.label')}</strong>
              <span>{t('contact.address.value')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
