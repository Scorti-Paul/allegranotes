export interface ButtonProps {
  text: string;
  Icon?: JSX.Element;
  type?: ButtonType;
  hasIcon?: boolean;
  onClick: (e, params = {}) => void;
  path: string;
  ref?: (e, params = {}) => void;
  children?: string;
  disabled?: boolean;
  loading?: boolean;
}

type ButtonType = "primary" | "secondary" | "link" | "primary-btn" | "primary-link" |  "primary-link-large" | "secondary-btn" | "secondary-link" | "accent-link";