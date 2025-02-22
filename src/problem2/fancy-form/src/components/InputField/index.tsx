import  {
  ComponentPropsWithRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
} from "react";

import { BoldCloseCircleIcon, InfoCircleIcon } from "components/icons";

import cn from "lib/cn";

interface InputFieldProps extends ComponentPropsWithRef<"input"> {
  containerClassName?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  errorMessage?: string;
  label?: string;
  withDelete?: boolean;
  onDelete?: () => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      containerClassName,
      className,
      errorMessage,
      withDelete,
      leftIcon,
      rightIcon,
      label,
      onDelete,
      ...otherProps
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    const handleClickDelete = () => {
      onDelete?.();
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.value = "";
          inputRef.current.focus();
        }
      }, 100);
    };

    return (
      <div className={cn("rounded-2lg flex flex-col ", containerClassName)}>
        {!!label && <div className="text-grey7-200 text-sm mb-2">{label}</div>}
        <div className="relative">
          {!!leftIcon && (
            <div className="absolute left-3.5 inset-y-0 flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={inputRef}
            {...otherProps}
            className={cn(
              "transition-colors rounded-2lg bg-slate-100 text-grey7-900 focus:ring-[0.1875rem] focus:ring-primary-400/30",
              "focus:border-primary-400 border  border-primary-700  placeholder-grey-7-400 focus:outline-none px-3.5 py-3",
              errorMessage &&
                "border-red-500 focus:border-red-500 ring-red-500/30 focus:ring-red-500/30",
              leftIcon && "pl-11",
              rightIcon && "pr-11",
              className,
            )}
          />
          {!!rightIcon && (
            <div className="absolute right-3.5 inset-y-0 flex items-center">
              {rightIcon}
            </div>
          )}
          {withDelete && (
            <button
              type="button"
              onClick={handleClickDelete}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <BoldCloseCircleIcon className="text-grey7-400 w-5 h-5" />
            </button>
          )}
        </div>

        {!!errorMessage && (
          <div className="flex mt-2 items-center">
            <InfoCircleIcon className="w-4.5 h-4.5 text-red-500 shrink-0 mr-2" />
            <div className="text-red-500 text-sm">{errorMessage}</div>
          </div>
        )}
      </div>
    );
  },
);

export default InputField;
