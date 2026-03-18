import React from 'react';
import './StarRating.css';
import type { StarRatingProps } from './types';
import { useStarRating } from './useStarRating';

const StarRating: React.FC<StarRatingProps> = (props) => {
  const {
    max = 5,
    labels,
    size = 'md',
    ariaLabel = 'Star rating',
  } = props;

  const {
    allowHalf,
    readOnly,
    disabled,
    displayValue,
    onStarEnter,
    onStarLeave,
    onStarClick,
    onKeyDown,
  } = useStarRating(props);

  const renderStar = (index: number) => {
    const full = index + 1 <= displayValue;
    const half = !full && allowHalf && index + 0.5 === displayValue;
    const label = labels?.[index] ?? `${index + 1} star${index === 0 ? '' : 's'}`;

    return (
      <button
        key={index}
        type="button"
        className={`star-btn ${full ? 'full' : ''} ${half ? 'half' : ''}`}
        onMouseEnter={() => onStarEnter(allowHalf ? index + 0.5 : index + 1)}
        onMouseMove={(e) => {
          if (!allowHalf) return;
          const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
          const isHalf = e.clientX - rect.left < rect.width / 2;
          onStarEnter(isHalf ? index + 0.5 : index + 1);
        }}
        onMouseLeave={onStarLeave}
        onClick={() => onStarClick(displayValue === index + 0.5 ? index + 0.5 : index + 1)}
        aria-label={label}
        aria-pressed={full || half}
        disabled={disabled}
      >
        <span className="star">★</span>
      </button>
    );
  };

  return (
    <div
      className={`star-rating ${size} ${readOnly ? 'readonly' : ''} ${disabled ? 'disabled' : ''}`}
      role="radiogroup"
      aria-label={ariaLabel}
      tabIndex={readOnly || disabled ? -1 : 0}
      onKeyDown={onKeyDown}
    >
      {Array.from({ length: max }, (_, i) => renderStar(i))}
    </div>
  );
};

export default StarRating;
