import * as React from "react";
import { Calendar as CalendarIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

export interface DatePickerProps {
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DatePicker({
  label,
  placeholder = "Select date",
  error,
  required,
  value,
  onChange,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    value ? new Date(value) : new Date()
  );
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      setCurrentMonth(date);
    } else {
      setSelectedDate(undefined);
    }
  }, [value]);

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date && onChange) {
      // Format as YYYY-MM-DD for internal use
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      
      // Create a synthetic event
      const syntheticEvent = {
        target: { value: formattedDate },
        currentTarget: { value: formattedDate },
      } as React.ChangeEvent<HTMLInputElement>;
      
      onChange(syntheticEvent);
    } else if (!date && onChange) {
      const syntheticEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
    setIsOpen(false);
  };

  const formatDisplayDate = (date: Date) => {
    return format(date, "dd.MM.yyyy");
  };

  const clearDate = () => {
    setSelectedDate(undefined);
    if (onChange) {
      const syntheticEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  // Generate year options (from 1900 to current year + 1)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 2 }, (_, i) => currentYear - i + 1);
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value);
    const newDate = new Date(currentMonth.getFullYear(), newMonth, 1);
    setCurrentMonth(newDate);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);
    const newDate = new Date(newYear, currentMonth.getMonth(), 1);
    setCurrentMonth(newDate);
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    setCurrentMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    setCurrentMonth(newDate);
  };

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      {label && (
        <label className="text-sm text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <div className="relative flex h-11 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <button
            type="button"
            className="flex-1 text-left text-sm font-normal focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={selectedDate ? "text-gray-900" : "text-gray-400"}>
              {selectedDate ? formatDisplayDate(selectedDate) : placeholder}
            </span>
          </button>
          <div className="flex items-center gap-1 ml-2">
            {selectedDate && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearDate();
                }}
                className="hover:bg-gray-100 rounded-full p-1 focus:outline-none"
              >
                <X className="h-3.5 w-3.5 text-gray-500" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <CalendarIcon className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="p-3">
              {/* Custom Header with Month and Year Dropdowns */}
              <div className="flex items-center justify-between mb-3 px-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md hover:bg-gray-100 focus:outline-none"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                <div className="flex items-center gap-2">
                  <select
                    value={currentMonth.getMonth()}
                    onChange={handleMonthChange}
                    className="text-sm font-medium border border-gray-300 rounded-md px-2 py-1 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  >
                    {months.map((monthName, index) => (
                      <option key={index} value={index}>
                        {monthName}
                      </option>
                    ))}
                  </select>
                  
                  <select
                    value={currentMonth.getFullYear()}
                    onChange={handleYearChange}
                    className="text-sm font-medium border border-gray-300 rounded-md px-2 py-1 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md hover:bg-gray-100 focus:outline-none"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Calendar */}
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleSelect}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "hidden",
                  caption_label: "text-sm font-medium",
                  nav: "hidden",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-100/50 [&:has([aria-selected])]:bg-gray-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-md inline-flex items-center justify-center cursor-pointer",
                  day_range_end: "day-range-end",
                  day_selected:
                    "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white",
                  day_today: "bg-gray-100 text-gray-900 font-semibold",
                  day_outside:
                    "day-outside text-gray-400 opacity-50 aria-selected:bg-gray-100/50 aria-selected:text-gray-500 aria-selected:opacity-30",
                  day_disabled: "text-gray-400 opacity-50",
                  day_hidden: "invisible",
                }}
              />
            </div>
          </div>
        )}
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}