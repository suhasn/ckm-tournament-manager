import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full form-group">
        {label && (
          <label className="form-label">
            {label}
            {props.required && <span className="text-[#f56d2f] ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`input ${error ? 'input-error' : ''} ${className}`}
          {...props}
        />
        {error && <p className="form-error">{error}</p>}
        {helperText && !error && <p className="text-sm text-slate-500">{helperText}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
