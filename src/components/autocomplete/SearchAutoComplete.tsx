import React, { useCallback, useEffect, useRef } from 'react';
import './SearchAutoComplete.css';
import type { AutoCompleteProps, SearchResult } from './types';
import { useAutoComplete } from './useAutoComplete';

const SearchAutoComplete: React.FC<AutoCompleteProps> = ({
  placeholder = 'Search…',
  minLength = 2,
  debounceMs = 250,
  endpoint,
  onSelect,
  ariaLabel = 'Search',
}) => {
  const {
    query,
    setQuery,
    items,
    open,
    setOpen,
    loading,
    activeIndex,
    setActiveIndex,
    onKeyDown,
    resetActive,
  } = useAutoComplete({ minLength, debounceMs, endpoint });

  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => resetActive(), [items, resetActive]);

  const handleSelect = useCallback((item: SearchResult) => {
    setQuery(item.label);
    setOpen(false);
    onSelect?.(item);
  }, [onSelect, setOpen, setQuery]);

  return (
    <div className="ac-container">
      <input
        className="ac-input"
        value={query}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(items.length > 0)}
        onKeyDown={(e) => {
          onKeyDown(e);
          if (e.key === 'Enter' && activeIndex >= 0 && items[activeIndex]) {
            e.preventDefault();
            handleSelect(items[activeIndex]);
          }
        }}
      />
      {open && (
        <div className="ac-dropdown">
          {loading && <div className="ac-status">Loading…</div>}
          {!loading && items.length === 0 && <div className="ac-status">No results</div>}
          <ul className="ac-list" ref={listRef} role="listbox">
            {items.map((item, i) => (
              <li
                key={item.id}
                className={`ac-item ${i === activeIndex ? 'active' : ''}`}
                role="option"
                aria-selected={i === activeIndex}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(item)}
              >
                <div className="ac-label">{item.label}</div>
                {item.description && <div className="ac-desc">{item.description}</div>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchAutoComplete;
