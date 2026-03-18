export type SearchResult = {
  id: string;
  label: string;
  description?: string;
};

export type AutoCompleteProps = {
  placeholder?: string;
  minLength?: number;
  debounceMs?: number;
  endpoint?: (query: string) => string;
  onSelect?: (item: SearchResult) => void;
  ariaLabel?: string;
};
