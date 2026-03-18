import React from 'react';
import type { ListItem } from './types';

type Props = { item: ListItem };

const InfiniteScrollItem: React.FC<Props> = React.memo(({ item }) => {
  return (
    <div className="infinite-item">
      <div className="infinite-title">{item.title}</div>
      {item.body && <div className="infinite-body">{item.body}</div>}
    </div>
  );
});

export default InfiniteScrollItem;
