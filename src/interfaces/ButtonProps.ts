export interface ButtonProps {
    label?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    isHalf?: boolean;
  }