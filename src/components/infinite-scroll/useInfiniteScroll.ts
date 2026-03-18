import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ListItem, PagedResponse } from './types';

type Options = {
  pageSize?: number;
  maxItems?: number;
  endpoint?: (page: number, pageSize: number) => string;
};

const defaultEndpoint = (page: number, pageSize: number) =>
  `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`;

export const useInfiniteScroll = (opts: Options = {}) => {
  const pageSize = opts.pageSize ?? 20;
  const maxItems = opts.maxItems ?? 200;
  const endpoint = opts.endpoint ?? defaultEndpoint;

  const [items, setItems] = useState<ListItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const idsRef = useRef<Set<string>>(new Set());

  const fetchPage = useCallback(async () => {
    if (loading || !hasMore) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    try {
      const res = await fetch(endpoint(page, pageSize), { signal: controller.signal });
      const data = (await res.json()) as Array<{ id: number; title: string; body: string }>;

      const mapped: ListItem[] = data.map((d) => ({
        id: String(d.id),
        title: d.title,
        body: d.body,
      }));

      const response: PagedResponse = {
        items: mapped,
        nextPage: mapped.length < pageSize ? null : page + 1,
      };

      setItems((prev) => {
        const next = [...prev];
        for (const it of response.items) {
          if (!idsRef.current.has(it.id)) {
            idsRef.current.add(it.id);
            next.push(it);
          }
        }
        if (next.length > maxItems) {
          const trimmed = next.slice(next.length - maxItems);
          idsRef.current = new Set(trimmed.map((i) => i.id));
          return trimmed;
        }
        return next;
      });

      setHasMore(response.nextPage !== null);
      if (response.nextPage) setPage(response.nextPage);
    } catch (e) {
      if ((e as { name?: string }).name !== 'AbortError') {
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint, hasMore, loading, page, pageSize, maxItems]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const observe = useCallback((node: Element | null) => {
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) fetchPage();
      },
      { rootMargin: '200px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchPage]);

  return useMemo(
    () => ({ items, loading, hasMore, fetchPage, observe }),
    [items, loading, hasMore, fetchPage, observe]
  );
};
