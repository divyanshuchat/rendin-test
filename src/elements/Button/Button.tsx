import { ButtonProps } from "../../interfaces/ButtonProps";

const Button = (props: ButtonProps) => {
  return (
    <button
      disabled={props?.disabled}
      className={`${props?.className} relative bg-rendin text-white px-6 py-2 rounded-md text-sm font-medium ${
        props?.isHalf ? "w-auto" : "w-full"
      }`}
      onClick={props.onClick}
    >
      {props?.loading && <span className="animate-ping absolute left-1/2 inline-flex rounded-full mt-0.5 h-4 w-4 bg-white"></span>}
      {props?.label}
    </button>
  );
};

export default Button;
