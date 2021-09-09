import { InputProps } from "../../interfaces/InputProps";

const Input = (props: InputProps) => {
  return (
    <div>
      <label className="sr-only">
        {props?.label}
      </label>
      <input
        id={props?.label}
        name={props?.label}
        type={props?.type}
        required={props?.required}
        value={props?.value}
        className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${props?.className} focus:outline-none focus:ring-rendin focus:border-rendin focus:z-10 sm:text-sm`}
        placeholder={props?.placeHolder}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
