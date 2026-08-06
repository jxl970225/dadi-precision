import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../pages/ApplicationsPage.css';
import './ServicesPage.css';

const services = [
  { key: 'blind-shipping' },
  { key: 'packaging' },
  { key: 'manufacturing' },
  { key: 'quality-inspection' },
  { key: 'quality-documentation' },
  { key: 'inventory' },
  { key: 'engineering' },
  { key: 'testing-lab' },
];

const MANUFACTURING_STEPS = 9;

export default function ServicesPage() {
  const { t } = useTranslation();
  const { hash } = useLocation();
  const [activeKey, setActiveKey] = useState(services[0].key);

  useEffect(() => {
    const fromHash = hash?.replace('#service-', '');
    if (fromHash && services.some(s => s.key === fromHash)) {
      setActiveKey(fromHash);
    }
  }, [hash]);

  const active = services.find(s => s.key === activeKey) ?? services[0];

  return (
    <section className="section services-page" id="services">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">{t('services.eyebrow')}</p>
          <h2 className="section-title">{t('services.title')}</h2>
          <p className="section-desc">{t('services.desc')}</p>
        </div>

        <div className="apps-layout">
          <ul className="apps-list">
            {services.map(s => (
              <li key={s.key}>
                <button
                  type="button"
                  className={`apps-list-item ${s.key === activeKey ? 'active' : ''}`}
                  onClick={() => setActiveKey(s.key)}
                >
                  {t(`service.${s.key}.name`)}
                </button>
              </li>
            ))}
          </ul>

          <div className="app-card service-card" id={`service-${active.key}`}>
            <div className="service-card-body">
              <h3>{t(`service.${active.key}.name`)}</h3>
              {t(`service.${active.key}.intro`).split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              {active.key === 'manufacturing' && (
                <div className="service-process">
                  <h4 className="service-process-title">{t('service.manufacturing.process.title')}</h4>
                  <ol className="service-process-list">
                    {Array.from({ length: MANUFACTURING_STEPS }, (_, i) => i + 1).map(n => (
                      <li key={n} className="service-process-step">
                        <span className="service-process-step-name">
                          {t(`service.manufacturing.process.step${n}.name`)}
                        </span>
                        <span className="service-process-step-desc">
                          {t(`service.manufacturing.process.step${n}.desc`)}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <h4 className="service-card-subheading">{t('services.tagline')}</h4>
              <p>{t(`service.${active.key}.closing`)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
