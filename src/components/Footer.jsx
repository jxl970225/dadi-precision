import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link to="/" className="logo">
            <img
              src="/images/logo.png"
              alt={t('brand')}
              className="logo-img"
              onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'inline'; }}
            />
            <span className="logo-mark" style={{ display: 'none' }}>●</span>
            <span className="logo-text">{t('brand')}</span>
          </Link>
          <p>{t('footer.tagline')}</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>{t('footer.products')}</h4>
            <ul>
              {['chrome','stainless','carbon','brass','glass','ceramic'].map(id => (
                <li key={id}><Link to={`/products#product-${id}`}>{t(`product.${id}.name`)}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('footer.company')}</h4>
            <ul>
              <li><Link to="/technology">{t('nav.quality')}</Link></li>
              <li><Link to="/applications">{t('nav.applications')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2026 Dadi Precision Co., Ltd. {t('footer.rights')}</p>
          <button
            className="lang-toggle lang-toggle--sm"
            onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')}
          >
            {isZh ? 'EN' : '中文'}
          </button>
        </div>
      </div>
    </footer>
  );
}
