import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isZh = i18n.language === 'zh';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => {
    i18n.changeLanguage(isZh ? 'en' : 'zh');
    setMenuOpen(false);
  };

  const applicationDomains = ['aerospace', 'auto', 'industrial', 'energy', 'marine', 'consumer'];
  const productDomains = ['glass', 'ceramic', 'chrome', 'stainless', 'carbon', 'brass', 'disc', 'olive'];

  const navItems = [
    { key: 'nav.home',         href: '/' },
    {
      key: 'nav.products',
      href: '/products',
      children: productDomains.map(id => ({
        key: `product.${id}.name`,
        href: `/products#product-${id}`,
      })),
    },
    {
      key: 'nav.applications',
      href: '/applications',
      children: applicationDomains.map(domain => ({
        key: `app.${domain}`,
        href: `/applications#app-${domain}`,
      })),
    },
    { key: 'nav.quality',      href: '/technology' },
    { key: 'nav.converter',    href: '/converter' },
    { key: 'nav.contact',      href: '/contact' },
  ];

  const isRouteLink = href => href === '/converter' || href === '/technology' || href === '/' || href === '/products' || href === '/contact' || href.startsWith('/applications');

  const isActive = href => {
    if (href === '/') return pathname === '/';
    const path = href.split('#')[0];
    return path !== '' && pathname === path;
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="container nav">
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

        <ul className="nav-links">
          {navItems.map(({ key, href, children }) => (
            <li key={key} className={children ? 'nav-item nav-item--dropdown' : 'nav-item'}>
              {isRouteLink(href) ? (
                <Link to={href} className={isActive(href) ? 'active' : ''}>{t(key)}</Link>
              ) : (
                <a href={href} className={isActive(href) ? 'active' : ''}>{t(key)}</a>
              )}
              {children && (
                <ul className="nav-dropdown">
                  {children.map(child => (
                    <li key={child.key}>
                      <Link to={child.href}>{t(child.key)}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button className="lang-toggle" onClick={toggleLang} aria-label="Switch language">
            {isZh ? 'EN' : '中文'}
          </button>
          <button
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            {navItems.map(({ key, href, children }) => (
              <li key={key}>
                {isRouteLink(href) ? (
                  <Link to={href} className={isActive(href) ? 'active' : ''} onClick={() => setMenuOpen(false)}>{t(key)}</Link>
                ) : (
                  <a href={href} className={isActive(href) ? 'active' : ''} onClick={() => setMenuOpen(false)}>{t(key)}</a>
                )}
                {children && (
                  <ul className="mobile-submenu">
                    {children.map(child => (
                      <li key={child.key}>
                        <Link to={child.href} onClick={() => setMenuOpen(false)}>{t(child.key)}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <button className="lang-toggle lang-toggle--mobile" onClick={toggleLang}>
            {isZh ? 'Switch to English' : '切换为中文'}
          </button>
        </div>
      )}
    </header>
  );
}
