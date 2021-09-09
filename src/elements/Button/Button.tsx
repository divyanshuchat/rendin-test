import { ButtonProps } from "../../interfaces/ButtonProps";

const Button = (props: ButtonProps) => {
  return (
    <button
      disabled={props?.disabled}
      className={`${props?.className} bg-rendin text-white px-6 py-2 rounded-md text-sm font-medium ${props?.isHalf ? 'w-auto': 'w-full'}`}
      onClick={props.onClick}
    >
      {props?.label}
    </button>
  );
};

export default Button;
