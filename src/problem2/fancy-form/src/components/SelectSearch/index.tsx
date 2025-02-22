import InputField from "components/InputField";
import { useOutsideClick } from "hooks";
import cn from "lib/cn";
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";

export type TOption = {
  label: ReactNode;
  value: string;
};

interface SelectSearchProps {
  options: TOption[];
  selected?: string;
  placeholder?: string;
  keyword: string;
  className: string;
  onSelect: (opt: TOption) => void;
  onDelete: () => void;
  onSearch: (value: string) => void;
}

export const SelectSearch = forwardRef<HTMLInputElement, SelectSearchProps>(
  (
    {
      onSearch,
      onSelect,
      onDelete,
      className,
      placeholder,
      keyword,
      options,
      selected,
    },
    ref,
  ) => {
    const [openOption, setOpenOption] = useState(false);
    const refOptions = useRef<HTMLDivElement>(null);

    useOutsideClick(refOptions, () => setOpenOption(false));

    const handleFocus = () => {
      setOpenOption(true);
    };

    const handleDelete = () => {
      onDelete();
    };

    const handleSearch = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
        setOpenOption(true);
      },
      [onSearch],
    );

    const handleSelect = useCallback(
      (opt: TOption) => {
        onSelect(opt);
        setOpenOption(false);
      },
      [onSelect],
    );

    return (
      <div className={cn("relative flex", className)}>
        <InputField
          className="w-full"
          containerClassName="w-full"
          placeholder={placeholder}
          onDelete={handleDelete}
          value={selected || keyword}
          disabled={!!selected}
          ref={ref}
          onFocus={handleFocus}
          onChange={handleSearch}
          withDelete={!!selected}
        />
        {openOption && !!options.length && (
          <div
            className="flex rounded border border-grey7-200 flex-col gap-y-1 absolute w-full z-50 top-14 bg-white  max-h-[10rem] overflow-auto"
            ref={refOptions}
          >
            {options.map((opt, idx) => (
              <div
                className="py-2 px-2 hover:text-white hover:bg-primary-400 cursor-pointer transition-colors"
                key={idx}
                onClick={() => handleSelect(opt)}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);
