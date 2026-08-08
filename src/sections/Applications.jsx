import { useTranslation } from 'react-i18next';
import './Applications.css';

// Image paths — place corresponding files in /public/images/apps/
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

export default function Applications() {
  const { t } = useTranslation();

  return (
    <section className="section section--dark" id="applications">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">{t('app.eyebrow')}</p>
          <h2 className="section-title">{t('app.title')}</h2>
        </div>
        <div className="app-grid">
          {apps.map(a => (
            <div className="app-card" id={`app-${a.key}`} key={a.key}>
              <div className="app-img-wrap">
                <img
                  src={a.img}
                  alt={a.alt}
                  loading="lazy"
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.classList.add('app-img-wrap--fallback');
                  }}
                />
              </div>
              <div className="app-card-body">
                <h3>{t(`app.${a.key}`)}</h3>
                <p>{t(`app.${a.key}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
