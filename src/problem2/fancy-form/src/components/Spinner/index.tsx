import React, { forwardRef } from "react";

import cn from "lib/cn";

type SpinnerProps = React.HTMLAttributes<HTMLDivElement>;

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-[3.25rem] h-[3.25rem] border-2 border-primary-500 border-t-primary-100 rounded-full animate-spin",
          className,
        )}
        {...props}
      />
    );
  },
);

Spinner.displayName = "Spinner";

export default Spinner;
