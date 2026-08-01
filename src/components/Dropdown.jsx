import { useEffect, useRef, useState } from 'react';
import './Dropdown.css';

export default function Dropdown({ id, value, onChange, placeholder, options }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = e => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const selected = options.find(o => o.value === value);

  return (
    <div className="dropdown" ref={rootRef}>
      <button
        type="button"
        id={id}
        className="dropdown-trigger"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selected ? '' : 'dropdown-placeholder'}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="dropdown-arrow" aria-hidden="true">▾</span>
      </button>

      {open && (
        <ul className="dropdown-menu" role="listbox">
          <li
            role="option"
            aria-selected={value === ''}
            className={`dropdown-option ${value === '' ? 'dropdown-option--active' : ''}`}
            onClick={() => { onChange(''); setOpen(false); }}
          >
            {placeholder}
          </li>
          {options.map(o => (
            <li
              key={o.value}
              role="option"
              aria-selected={value === o.value}
              className={`dropdown-option ${value === o.value ? 'dropdown-option--active' : ''}`}
              onClick={() => { onChange(o.value); setOpen(false); }}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
