import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Products.css';

const products = [
  {
    id: 'glass',
    colorClass: 'ball-glass',
    img: '/images/products/glass.jpg',
    featured: true,
    specs: [
      { key: 'spec.diameter', value: '0.3 mm' },
      { key: 'spec.grade',    value: 'G3' },
    ],
  },
  {
    id: 'ceramic',
    colorClass: 'ball-ceramic',
    img: '/images/products/ceramic.jpg',
    specs: [
      { key: 'spec.diameter', value: 'spec.ceramic.diameter' },
      { key: 'spec.grade',    value: 'G5' },
    ],
  },
  {
    id: 'chrome',
    colorClass: 'ball-chrome',
    img: '/images/products/chrome.jpg',
    specs: [
      { key: 'spec.diameter', value: '0.3 mm' },
      { key: 'spec.grade',    value: 'G3' },
    ],
  },
  {
    id: 'stainless',
    colorClass: 'ball-stainless',
    img: '/images/products/stainless.jpg',
    specs: [
      { key: 'spec.diameter', value: '0.3 mm' },
      { key: 'spec.grade',    value: 'G3' },
    ],
  },
  {
    id: 'carbon',
    colorClass: 'ball-carbon',
    img: '/images/products/carbon.jpg',
    specs: [
      { key: 'spec.diameter', value: '0.5 mm' },
      { key: 'spec.grade',    value: 'G5' },
    ],
  },
  {
    id: 'brass',
    colorClass: 'ball-brass',
    img: '/images/products/brass.jpg',
    specs: [
      { key: 'spec.diameter', value: 'spec.custom.diameter' },
      { key: 'spec.grade',    value: 'G5' },
    ],
  },
  {
    id: 'disc',
    colorClass: 'ball-disc',
    img: '/images/products/disc.jpg',
    specs: [
      { key: 'spec.diameter', value: 'spec.custom.diameter' },
      { key: 'spec.usage',    value: 'spec.deburr.grade' },
    ],
  },
  {
    id: 'olive',
    colorClass: 'ball-olive',
    img: '/images/products/olive.jpg',
    specs: [
      { key: 'spec.diameter', value: 'spec.custom.diameter' },
      { key: 'spec.usage',    value: 'spec.deburr.grade' },
    ],
  },
];

export default function Products() {
  const { t } = useTranslation();
  const [active, setActive] = useState(null);

  return (
    <section className="section" id="products">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">{t('products.eyebrow')}</p>
          <h2 className="section-title">{t('products.title')}</h2>
          <p className="section-desc">{t('products.desc')}</p>
        </div>

        <div className="product-grid">
          {products.map(p => (
            <article
              key={p.id}
              id={`product-${p.id}`}
              className={`product-card ${p.featured ? 'product-card--featured' : ''}`}
              onClick={() => setActive(p)}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setActive(p); }}
            >
              {p.featured && (
                <div className="product-badge">{t('product.badge')}</div>
              )}
              <div className="product-media">
                <img
                  src={p.img}
                  alt={t(`product.${p.id}.name`)}
                  loading="lazy"
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.classList.add('product-media--fallback');
                  }}
                />
                <div className={`ball-icon ${p.colorClass}`} />
              </div>
              <div className="product-body">
                <h3>{t(`product.${p.id}.name`)}</h3>
                <p>{t(`product.${p.id}.desc`)}</p>
                <ul className="spec-list">
                  {p.specs.map(s => (
                    <li key={`${p.id}-${s.key}`}>
                      <span>{t(s.key)}</span>
                      <strong>{t(s.value)}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      {active && (
        <div className="product-modal-overlay" onClick={() => setActive(null)}>
          <div className="product-modal" onClick={e => e.stopPropagation()}>
            <button className="product-modal-close" aria-label={t('common.close')} onClick={() => setActive(null)}>✕</button>
            <div className="product-modal-media">
              <img
                src={active.img}
                alt={t(`product.${active.id}.name`)}
                onError={e => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.classList.add('product-media--fallback');
                }}
              />
              <div className={`ball-icon ${active.colorClass}`} />
            </div>
            <div className="product-modal-body">
              <h3>{t(`product.${active.id}.name`)}</h3>
              <p>{t(`product.${active.id}.desc`)}</p>
              <ul className="spec-list">
                {active.specs.map(s => (
                  <li key={`modal-${active.id}-${s.key}`}>
                    <span>{t(s.key)}</span>
                    <strong>{t(s.value)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
