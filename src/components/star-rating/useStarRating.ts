import { useCallback, useMemo, useState } from 'react';
import type { StarRatingProps } from './types';

export const useStarRating = (props: StarRatingProps) => {
  const {
    max = 5,
    value,
    defaultValue = 0,
    allowHalf = false,
    readOnly = false,
    disabled = false,
    clearable = true,
    onChange,
  } = props;

  const [internal, setInternal] = useState<number>(defaultValue);
  const [hover, setHover] = useState<number | null>(null);
  const isControlled = value !== undefined;
  const current = isControlled ? value! : internal;
  const displayValue = hover ?? current;

  const setValue = useCallback((next: number) => {
    if (readOnly || disabled) return;
    const clamped = Math.max(0, Math.min(max, next));
    if (!isControlled) setInternal(clamped);
    onChange?.(clamped);
  }, [disabled, isControlled, max, onChange, readOnly]);

  const onStarEnter = useCallback((next: number) => {
    if (readOnly || disabled) return;
    setHover(next);
  }, [disabled, readOnly]);

  const onStarLeave = useCallback(() => setHover(null), []);

  const onStarClick = useCallback((next: number) => {
    if (readOnly || disabled) return;
    if (clearable && next === current) {
      setValue(0);
    } else {
      setValue(next);
    }
  }, [clearable, current, disabled, readOnly, setValue]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (readOnly || disabled) return;
    const step = allowHalf ? 0.5 : 1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setValue(current + step);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setValue(current - step);
    }
    if (e.key === 'Home') {
      e.preventDefault();
      setValue(0);
    }
    if (e.key === 'End') {
      e.preventDefault();
      setValue(max);
    }
  }, [allowHalf, current, disabled, max, readOnly, setValue]);

  return useMemo(() => ({
    max,
    allowHalf,
    readOnly,
    disabled,
    displayValue,
    current,
    onStarEnter,
    onStarLeave,
    onStarClick,
    onKeyDown,
  }), [allowHalf, current, disabled, displayValue, max, onKeyDown, onStarClick, onStarEnter, onStarLeave, readOnly]);
};
