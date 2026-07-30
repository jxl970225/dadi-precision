import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Hero.css';

const stats = [
  { value: '50+',      key: 'hero.stat0.label' },
  { value: 'Grade 3', key: 'hero.stat1.label' },
  { value: '0.3～300mm', key: 'hero.stat2.label' },
  { value: '38+',       key: 'hero.stat3.label' },
];

export default function Hero() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
        <div className="hero-grid" />
      </div>

      <div className="container hero-layout">
        <div className="hero-content">
          <p className="hero-eyebrow">{t('hero.eyebrow')}</p>
          <h1 className="hero-title">
            {isZh ? (
              <>
                {t('hero.title1')}<br />
                <span className="gradient-text">
                  {t('hero.title2').split('，')[0]}<br />
                  {t('hero.title2').split('，')[1]}
                </span>
              </>
            ) : (
              <>
                {t('hero.title1')}<br />
                <span className="gradient-text">{t('hero.title2')}</span>
              </>
            )}
          </h1>
          <p className="hero-desc">{t('hero.desc')}</p>
        </div>

        <div className="hero-visual-col">
          <div className="hero-visual" aria-hidden="true">
            <div className="logo-showcase">
              <div className="logo-ring logo-ring--outer" />
              <div className="logo-ring logo-ring--inner" />
              <div className="logo-circle">
                <img src="/images/logo.png" alt={t('brand')} className="hero-logo-img" />
                <div className="logo-overlay" />
              </div>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/#quote" className="btn btn-outline">{t('hero.cta2')}</Link>
            <Link to="/contact#inquiry" className="btn btn-outline">{t('hero.cta3')}</Link>
          </div>
          <div className="hero-stats">
            {stats.map(s => (
              <div className="stat" key={s.key}>
                <span className="stat-number">{s.value}</span>
                <span className="stat-label">{t(s.key)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
