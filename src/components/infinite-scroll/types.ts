export type ListItem = {
  id: string;
  title: string;
  body?: string;
};

export type PagedResponse = {
  items: ListItem[];
  nextPage: number | null;
};
