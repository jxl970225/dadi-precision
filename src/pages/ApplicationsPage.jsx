import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../sections/Applications.css';
import './ApplicationsPage.css';

const apps = [
  {
    key: 'aerospace',
    img: '/images/apps/aerospace.jpg',
    alt: 'Rocket launch — aerospace steel ball applications',
  },
  {
    key: 'auto',
    img: '/images/apps/auto.jpg',
    alt: 'Automotive cutaway — steel balls in drive systems',
  },
  {
    key: 'industrial',
    img: '/images/apps/industrial.jpg',
    alt: 'Construction excavator — heavy industrial machinery',
  },
  {
    key: 'energy',
    img: '/images/apps/energy.jpg',
    alt: 'Offshore wind farm — energy equipment bearings',
  },
  {
    key: 'marine',
    img: '/images/apps/marine.jpg',
    alt: 'Tanker ship — marine and shipping industry',
  },
  {
    key: 'consumer',
    img: '/images/apps/consumer.jpg',
    alt: 'Ball valve — consumer and plumbing products',
  },
  {
    key: 'cosmetics',
    img: '/images/apps/cosmetics.jpg',
    alt: 'Spray pump components — cosmetics packaging applications',
  },
];

export default function ApplicationsPage() {
  const { t } = useTranslation();
  const { hash } = useLocation();
  const [activeKey, setActiveKey] = useState(apps[0].key);

  useEffect(() => {
    const fromHash = hash?.replace('#app-', '');
    if (fromHash && apps.some(a => a.key === fromHash)) {
      setActiveKey(fromHash);
    }
  }, [hash]);

  const active = apps.find(a => a.key === activeKey) ?? apps[0];

  return (
    <section className="section section--dark applications-page" id="applications">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">{t('app.eyebrow')}</p>
          <h2 className="section-title">{t('app.title')}</h2>
        </div>

        <div className="apps-layout">
          <ul className="apps-list">
            {apps.map(a => (
              <li key={a.key}>
                <button
                  type="button"
                  className={`apps-list-item ${a.key === activeKey ? 'active' : ''}`}
                  onClick={() => setActiveKey(a.key)}
                >
                  {t(`app.${a.key}`)}
                </button>
              </li>
            ))}
          </ul>

          <div className="app-card" id={`app-${active.key}`}>
            <div className="app-img-wrap">
              <img
                src={active.img}
                alt={active.alt}
                loading="lazy"
                onError={e => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.classList.add('app-img-wrap--fallback');
                }}
              />
            </div>
            <div className="app-card-body">
              <h3>{t(`app.${active.key}`)}</h3>
              <p>{t(`app.${active.key}.desc`)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
