import * as React from "react";
import { X } from "lucide-react";

export interface ComboboxProps {
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  multiple?: boolean;
  selectedValues?: string[];
  onMultipleChange?: (values: string[]) => void;
}

export function Combobox({
  label,
  placeholder,
  error,
  required,
  options,
  value,
  onChange,
  multiple,
  selectedValues = [],
  onMultipleChange,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter options based on search and exclude already selected items
  const filteredOptions = React.useMemo(() => {
    if (!search) return [];

    const searchLower = search.toLowerCase();
    const notSelected = multiple ? !selectedValues.includes : () => true;

    // Separate results by match type
    const exactPrefixMatches: typeof options = [];
    const wordPrefixMatches: typeof options = [];
    const partialMatches: typeof options = [];

    options.forEach((option) => {
      if (multiple && selectedValues.includes(option.value)) {
        return; // Skip already selected
      }

      const labelLower = option.label.toLowerCase();

      // 1. Exact prefix match (highest priority)
      if (labelLower.startsWith(searchLower)) {
        exactPrefixMatches.push(option);
      }
      // 2. Word prefix match (any word starts with search)
      else if (labelLower.split(/\s+/).some(word => word.startsWith(searchLower))) {
        wordPrefixMatches.push(option);
      }
      // 3. Partial match anywhere in the label (lowest priority)
      else if (labelLower.includes(searchLower)) {
        partialMatches.push(option);
      }
    });

    // Combine results with priority ordering and limit to 8 results
    return [
      ...exactPrefixMatches,
      ...wordPrefixMatches,
      ...partialMatches,
    ].slice(0, 8);
  }, [search, options, multiple, selectedValues]);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      // Check for duplicates
      if (!selectedValues.includes(optionValue)) {
        onMultipleChange?.([...selectedValues, optionValue]);
      }
      // Clear search and close dropdown after selection
      setSearch("");
      setIsOpen(false);
      // Re-focus input for next selection
      inputRef.current?.focus();
    } else {
      onChange?.(optionValue);
      setSearch("");
      setIsOpen(false);
    }
  };

  const removeTag = (tagValue: string) => {
    if (multiple) {
      onMultipleChange?.(selectedValues.filter((v) => v !== tagValue));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
    // Show dropdown when user starts typing
    if (newValue.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      {label && (
        <label className="text-sm text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder || "Type to search..."}
          value={multiple ? search : (isOpen ? search : (selectedOption?.label || ""))}
          onChange={handleInputChange}
          onFocus={() => {
            if (search.length > 0) {
              setIsOpen(true);
            }
          }}
        />
        {isOpen && filteredOptions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className="px-3 py-2.5 text-sm cursor-pointer hover:bg-blue-50 transition-colors"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {multiple && selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {selectedValues.map((val) => {
            const opt = options.find((o) => o.value === val);
            return (
              <div
                key={val}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                <span>{opt?.label}</span>
                <button
                  type="button"
                  onClick={() => removeTag(val)}
                  className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}