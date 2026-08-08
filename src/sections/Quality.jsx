import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Quality.css';

const certs = [
  { key: 'iso',      desc: 'quality.iso.desc' },
  { key: 'iatf16949',desc: 'quality.iatf16949.desc' },
  { key: 'iso14001', desc: 'quality.iso14001.desc' },
  { key: 'qci9',     desc: 'quality.qci9.desc' },
  { key: 'iatf',     desc: 'quality.iatf.desc' },
  { key: 'iso3290',  desc: 'quality.iso3290.desc' },
];

const metrics = [
  { value: '50+',  key: 'quality.metric0' },
  { value: 'Grade3', key: 'quality.metric1' },
  { value: '0.3～300mm', key: 'quality.metric2' },
  { value: '38+',  key: 'quality.metric3' },
];

const technicImgs = Array.from({ length: 8 }, (_, i) => `/images/technic/${i + 1}.jpg`);
const isoImgs     = Array.from({ length: 6 }, (_, i) => `/images/iso/${i + 1}.jpg`);

function GalleryPanel({ titleKey, descKey, imgs, cols, groupLabelKey }) {
  const { t } = useTranslation();
  const [lightbox, setLightbox] = useState(null);
  const groupLabel = t(groupLabelKey);

  return (
    <div className="gallery-section">
      <div className="gallery-header">
        <div>
          <h3 className="gallery-title">{t(titleKey)}</h3>
          <p className="gallery-desc">{t(descKey)}</p>
        </div>
      </div>

      <div className={`gallery-grid gallery-grid--${cols}`}>
        {imgs.map((src, i) => (
          <div key={i} className="gallery-item-wrap">
            <button
              className="gallery-item"
              onClick={() => setLightbox({ src, alt: `${groupLabel} ${i + 1}` })}
            >
              <img src={src} alt={`${groupLabel} ${i + 1}`} loading="lazy" />
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" aria-label={t('common.close')}>✕</button>
          <img src={lightbox.src} alt={lightbox.alt} onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

export default function Quality() {
  const { t } = useTranslation();

  return (
    <section className="section">
      <div className="container quality-layout">
        <div className="quality-text">
          <p className="section-eyebrow">{t('quality.eyebrow')}</p>
          <h2 className="section-title">{t('quality.title')}</h2>
          <p className="quality-desc">{t('quality.desc')}</p>
          <ul className="quality-list">
            {certs.map(c => (
              <li key={c.key}>
                <div className="quality-dot" />
                <div>
                  <strong>{t(`quality.${c.key}`)}</strong>
                  <p>{t(c.desc)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="quality-visual">
          <div className="quality-card">
            {metrics.map(m => (
              <div className="quality-metric" key={m.key}>
                <span className="metric-value">{m.value}</span>
                <span className="metric-label">{t(m.key)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <GalleryPanel
          titleKey="quality.technic.title"
          descKey="quality.technic.desc"
          imgs={technicImgs}
          cols={4}
          groupLabelKey="quality.technic.title"
        />
        <GalleryPanel
          titleKey="quality.iso.gallery.title"
          descKey="quality.iso.gallery.desc"
          imgs={isoImgs}
          cols={3}
          groupLabelKey="quality.iso.gallery.title"
        />
      </div>
    </section>
  );
}
