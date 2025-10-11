import React, { useId } from 'react';

const Input = React.forwardRef(function Input(
  { label, type = 'text', className = '', error, suffix, ...props },
  ref,
) {
  const id = useId();
  const hasError = Boolean(error);
  const describedBy = hasError ? `${id}-error` : props['aria-describedby'];

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-1 font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={type}
          ref={ref}
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
            hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          } ${suffix ? 'pr-12' : ''}`}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {suffix && (
          <span className="pointer-events-auto absolute inset-y-0 right-3 flex items-center text-sm text-teal-500">
            {suffix}
          </span>
        )}
      </div>
      {hasError && (
        <p id={`${id}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
