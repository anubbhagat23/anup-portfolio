import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SearchResult } from './types';

const defaultEndpoint = (q: string) =>
  `https://jsonplaceholder.typicode.com/users?name_like=${encodeURIComponent(q)}`;

export const useAutoComplete = (opts?: {
  minLength?: number;
  debounceMs?: number;
  endpoint?: (query: string) => string;
}) => {
  const minLength = opts?.minLength ?? 2;
  const debounceMs = opts?.debounceMs ?? 250;
  const endpoint = opts?.endpoint ?? defaultEndpoint;

  const [query, setQuery] = useState('');
  const [items, setItems] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const abortRef = useRef<AbortController | null>(null);
  const cacheRef = useRef<Map<string, SearchResult[]>>(new Map());
  const debounceRef = useRef<number | null>(null);

  const fetchResults = useCallback(async (q: string) => {
    if (q.length < minLength) {
      setItems([]);
      setOpen(false);
      return;
    }

    const cached = cacheRef.current.get(q);
    if (cached) {
      setItems(cached);
      setOpen(true);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    try {
      const res = await fetch(endpoint(q), { signal: controller.signal });
      const data = (await res.json()) as Array<{ id: number; name: string; email?: string }>;

      const mapped: SearchResult[] = data.map((d) => ({
        id: String(d.id),
        label: d.name,
        description: d.email,
      }));

      cacheRef.current.set(q, mapped);
      setItems(mapped);
      setOpen(true);
    } catch (e) {
      if ((e as { name?: string }).name !== 'AbortError') {
        setItems([]);
        setOpen(false);
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint, minLength]);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => fetchResults(query), debounceMs);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [debounceMs, fetchResults, query]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!open) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, items.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  }, [items.length, open]);

  const resetActive = useCallback(() => setActiveIndex(-1), []);

  return useMemo(() => ({
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
  }), [activeIndex, items, loading, onKeyDown, open, query, resetActive]);
};
