export interface ButtonProps {
    loading?: boolean;
    label?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    isHalf?: boolean;
  }