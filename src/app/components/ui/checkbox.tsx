import * as React from "react";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    const id = React.useId();
    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-2">
          <div className="relative flex items-center">
            <input
              id={id}
              type="checkbox"
              className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-300 checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              ref={ref}
              {...props}
            />
            <Check className="absolute left-0.5 top-0.5 h-4 w-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100" />
          </div>
          {label && (
            <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer leading-5">
              {label}
            </label>
          )}
        </div>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
