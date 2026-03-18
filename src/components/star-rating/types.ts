export type StarRatingSize = 'sm' | 'md' | 'lg';

export type StarRatingProps = {
  max?: number;
  value?: number;
  defaultValue?: number;
  allowHalf?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  size?: StarRatingSize;
  labels?: string[];
  onChange?: (value: number) => void;
  ariaLabel?: string;
};
