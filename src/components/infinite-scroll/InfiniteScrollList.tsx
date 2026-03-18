import React, { useEffect, useRef } from 'react';
import './InfiniteScroll.css';
import { useInfiniteScroll } from './useInfiniteScroll';
import InfiniteScrollItem from './InfiniteScrollItem';

const InfiniteScrollList: React.FC = () => {
  const { items, loading, hasMore, fetchPage, observe } = useInfiniteScroll();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const cleanup = observe(sentinelRef.current);
    return () => cleanup?.();
  }, [observe]);

  return (
    <div className="infinite-container">
      <div className="infinite-list">
        {items.map((item) => (
          <InfiniteScrollItem key={item.id} item={item} />
        ))}
      </div>
      <div ref={sentinelRef} className="infinite-sentinel" />
      {loading && <div className="infinite-status">Loading…</div>}
      {!hasMore && <div className="infinite-status">No more items</div>}
    </div>
  );
};

export default InfiniteScrollList;
