export interface InputProps {
  label?: string;
  type?: string;
  required?: boolean;
  placeHolder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
}
