import React, { useState, useRef, useEffect } from "react";

const roles = [
  { value: "", label: "Select Role" },
  { value: "user", label: "User" },
  { value: "tour_guide", label: "Tour Guide" },
  // add more roles as needed
];

export default function CustomDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get label of selected value
  const selectedLabel = roles.find((r) => r.value === value)?.label || "Select Role";

  return (
    <div
      ref={ref}
      className="relative w-full"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full cursor-pointer rounded-lg px-4 py-2 text-gray-200 bg-white/10 backdrop-blur-md border border-gray-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selectedLabel}</span>
        <svg
          className={`w-5 h-5 ml-2 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white backdrop-blur-md border border-gray-300/30 shadow-lg focus:outline-none"
          role="listbox"
          tabIndex={-1}
        >
          {roles.map(({ value: val, label }) => (
            <li
              key={val}
              role="option"
              aria-selected={val === value}
              onClick={() => {
                onChange(val);
                setOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onChange(val);
                  setOpen(false);
                }
              }}
              tabIndex={0}
              className={`cursor-pointer select-none px-4 py-2 text-black hover:bg-indigo-600 ${
                val === value ? "bg-indigo-700 font-semibold" : ""
              }`}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
